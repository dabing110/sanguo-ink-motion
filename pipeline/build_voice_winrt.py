#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""男声配音（Windows OneCore · Microsoft Kangkang）+ 字幕烧录（通用版）
=====================================================================

背景：edge-tts 自 2026-10-12 起 WSS 握手全版本 403（升到 7.2.8 仍 403，是节点侧拒绝）；
本机 SAPI(pyttsx3) 又只有 Microsoft Huihui 女声，无法满足「男配音」。
于是走 Windows.Media.SpeechSynthesis（OneCore 语音）→ 其中 **Kangkang 是中文男声**
（注册表里 gender=0 即男；HuihuiM / YaoyaoM 是女）。

产出与 build_voice_sapi.py 完全一致：line_N.wav(+mp3) / voice.wav / sub.ass / sched.json / 终版烧录。
字幕样式沿用马超（04-锦马超）：KaiTi 58，&H50B8DCEE 米白底框（注意 ASS 是 BGR 序）。

坑（继承 build_voice_sapi.py，别改回去）
------------------------------------------
- 同一进程里多次合成会被沙箱杀（COM/WinRT 复用问题）→ 每句单独起子进程，用 --worker 模式。
- Python 3.13 删了 audioop → 混音用 numpy。
- OneCore 直出**自带 44 字节 RIFF/WAVE 头**（RIFF→fmt(18字节)→data，16k/mono/s16le），
  **不是**裸 PCM！直接 `-f s16le` 会把头 44 字节当成采样 → 每句最前面多一个
  约 0.5 满幅的垃圾脉冲，正好落在「幕首+0.20s」= 每个分镜链接处「嗒」一声
  （2026-10-14 用户听出，修复见 fix_voice_click.py）。必须先剥头再转码。
- 每句另做去直流 + 6ms 淡入 + 10ms 淡出，杜绝硬边沿咔哒。
- 尾部静音要裁，否则挤占下一幕预算。
- 句起点固定幕首 +0.20s，绝不提前侵入上一幕；预算 = (t1-t0) - 0.45。

用法
----
  python build_voice_winrt.py --lines lines_huatuo.json \
      --video ../17-华佗/华佗_生平动画.mp4 \
      --outdir ../17-华佗/配音与字幕 \
      --final ../17-华佗/华佗_配音字幕版.mp4

  --rate "+8%"    # SSML prosody 语速，默认 +0%；太长可加 +10%~+15%
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import wave

import numpy as np

FF = os.environ.get("FFMPEG_BIN") or shutil.which("ffmpeg") or "ffmpeg.exe"
PY = sys.executable
SR = 44100

# 中文男声（OneCore）。备选女声：
#   MSTTS_V110_zhCN_HuihuiM / MSTTS_V110_zhCN_YaoyaoM
DEFAULT_VOICE = r"HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech_OneCore\Voices\Tokens\MSTTS_V110_zhCN_KangkangM"
LANG = "zh-CN"

# Kangkang 直出格式（实测 pcm_s16le / 16000 Hz / mono）
RAW_SR = 16000

ASS_STYLE = (
    "Style: 字幕,KaiTi,58,&H00141414,&H00141414,&H50B8DCEE,&H00000000,"
    "1,0,0,0,100,100,1,0,3,4,0,2,60,60,26,1"
)


# ---------------------------------------------------------------- 合成（worker 模式）
def strip_wav_header(data):
    """剥掉 OneCore 流自带的 RIFF/WAVE 头（44 字节，fmt 段 18 字节版）。

    不剥会被当成裸 PCM → 每句头部多一个 ~0.5 满幅垃圾脉冲（2026-10-14 实测）。
    流结构：'RIFF'<size>'WAVE''fmt '(18B fmt)'data'<size><pcm>，data 段即纯 PCM。
    """
    if data[:4] != b"RIFF":
        return data                      # 已是裸 PCM，原样返回
    i = data.find(b"data")
    if i < 0 or i > 1024:
        return data                      # 异常流不动，交给转码层处理
    return data[i + 8:]


async def _worker_async(voice_id, text, raw_path, rate):
    from winrt.windows.media.speechsynthesis import SpeechSynthesizer
    from winrt.windows.storage.streams import Buffer, InputStreamOptions

    s = SpeechSynthesizer()
    for v in SpeechSynthesizer.all_voices:
        if v.id == voice_id:
            s.voice = v
            break

    esc = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    ssml = (
        '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="%s">'
        '<voice name="%s"><prosody rate="%s">%s</prosody></voice></speak>'
    ) % (LANG, voice_id, rate, esc)

    st = await s.synthesize_ssml_to_stream_async(ssml)
    buf = Buffer(st.size)
    ib = await st.read_async(buf, buf.capacity, InputStreamOptions.READ_AHEAD)
    data = strip_wav_header(bytes(memoryview(ib)))
    with open(raw_path, "wb") as f:
        f.write(data)
    return len(data)


def synth_one(text, raw_path, voice_id, rate):
    """单独进程合成一句（规避同进程多次 COM/WinRT 调用被杀）。"""
    subprocess.run(
        [PY, os.path.abspath(__file__), "--worker",
         "--voice", voice_id, "--text", text, "--raw", raw_path, "--rate", rate],
        check=True, timeout=180,
    )


# ---------------------------------------------------------------- 音频处理
def raw_to_wav(raw, wav, raw_sr=RAW_SR):
    """裸 PCM → 44.1k 双声道 wav。"""
    subprocess.run(
        [FF, "-y", "-loglevel", "error",
         "-f", "s16le", "-ar", str(raw_sr), "-ac", "1", "-i", raw,
         "-ar", str(SR), "-ac", "2", wav],
        check=True,
    )


def load_wav(p):
    with wave.open(p, "rb") as w:
        n, ch, fr = w.getnframes(), w.getnchannels(), w.getframerate()
        raw = w.readframes(n)
    x = np.frombuffer(raw, dtype=np.int16).astype(np.int32)
    mono = (x[0::2] + x[1::2]) // 2 if ch == 2 else x
    return mono.astype(np.int16), fr


def trim_tail(samples, fr, thr=300, pad=0.12):
    mag = np.abs(samples.astype(np.int32))
    nz = np.where(mag > thr)[0]
    if len(nz):
        samples = samples[: min(len(samples), nz[-1] + int(pad * fr))]
    return samples


def resample(samples, fr, target=SR):
    if fr == target:
        return samples
    n = int(len(samples) * target / fr)
    idx = np.linspace(0, len(samples) - 1, n)
    return np.interp(idx, np.arange(len(samples)), samples.astype(np.float64)).astype(np.int16)


def to_stereo(samples):
    st = np.zeros((len(samples), 2), dtype=np.int16)
    st[:, 0] = samples
    st[:, 1] = samples
    return st


def polish(samples, sr=SR):
    """去直流 + 头部 6ms 淡入 + 尾部 10ms 淡出，杜绝硬边沿咔哒。"""
    if not len(samples):
        return samples
    x = samples.astype(np.float64)
    x -= x.mean()                                   # 去直流（实测每句 DC≈200/32768）
    n_in, n_out = int(0.006 * sr), int(0.010 * sr)
    if len(x) > n_in + n_out:
        x[:n_in] *= 0.5 - 0.5 * np.cos(np.linspace(0, np.pi, n_in))
        x[-n_out:] *= 0.5 - 0.5 * np.cos(np.linspace(np.pi, 0, n_out))
    return np.clip(x, -32768, 32767).astype(np.int16)


def write_wav(p, arr, sr=SR):
    with wave.open(p, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(sr)
        w.writeframes(arr.tobytes())


def ts(t):
    h = int(t // 3600)
    m = int(t % 3600 // 60)
    s = t % 60
    return f"{h}:{m:02d}:{s:05.2f}"


# ---------------------------------------------------------------- 主流程
def main():
    ap = argparse.ArgumentParser(description="WinRT 男声（Kangkang）配音 + 字幕烧录")
    ap.add_argument("--lines", help="台词表 JSON（同 build_voice.py 格式）")
    ap.add_argument("--video", help="无声成片")
    ap.add_argument("--outdir")
    ap.add_argument("--final", help="终版输出路径")
    ap.add_argument("--rate", default="+0%", help='SSML 语速，如 "+10%" / "-5%"')
    ap.add_argument("--voice", default=DEFAULT_VOICE, help="OneCore voice token")
    ap.add_argument("--raw-sr", type=int, default=RAW_SR)
    ap.add_argument("--no-burn", action="store_true", help="只出音轨和字幕，不烧录")
    # worker 内部参数
    ap.add_argument("--worker", action="store_true")
    ap.add_argument("--text")
    ap.add_argument("--raw")
    a = ap.parse_args()

    if a.worker:
        import asyncio
        n = asyncio.run(_worker_async(a.voice, a.text, a.raw, a.rate))
        print(f"  worker ok {n} bytes", flush=True)
        return

    for k, v in (("--lines", a.lines), ("--video", a.video),
                 ("--outdir", a.outdir)):
        if not v:
            ap.error(f"缺少 {k}")

    cfg = json.load(open(a.lines, encoding="utf-8"))
    video = os.path.abspath(a.video)
    outdir = os.path.abspath(a.outdir)
    os.makedirs(outdir, exist_ok=True)
    final = os.path.abspath(a.final) if a.final else None

    total = float(cfg.get("total") or 0)
    if total <= 0:
        r = subprocess.run([FF, "-i", video], capture_output=True, text=True,
                           encoding="utf-8", errors="ignore")
        m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", r.stderr or "")
        total = int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))

    vname = a.voice.rsplit("\\", 1)[-1]
    print(f"片长 {total:.2f}s · {vname}（rate {a.rate}）· {len(cfg['lines'])} 句", flush=True)

    track = np.zeros((int(total * SR), 2), dtype=np.int16)
    sched, subs = [], []
    prev_end = 0

    def _stretch(seg, target_len):
        """用 ffmpeg atempo 把单句压到目标时长（变速不变调），消除相邻句重叠。"""
        if abs(len(seg) - target_len) <= int(0.03 * SR):
            return seg
        tempo = len(seg) / float(target_len)
        tempo = min(max(tempo, 0.5), 2.0)
        ti = os.path.join(outdir, "_stretch_in.wav")
        to = os.path.join(outdir, "_stretch_out.wav")
        write_wav(ti, to_stereo(seg))
        subprocess.run([FF, "-y", "-loglevel", "error", "-i", ti,
                        "-af", f"atempo={tempo:.4f}", to], check=True)
        s2, _ = load_wav(to)
        # 不删除中间文件：沙箱按"同一轮会话累计删除次数"计阈值，
        # 频繁 os.remove 会触发 SAFE_DELETE_BULK_CONFIRM_REQUIRED 中断批处理。
        return s2
    lines = [l for l in cfg["lines"] if l.get("text")]

    for i, ln in enumerate(lines):
        t0, t1 = float(ln["t0"]), float(ln["t1"])
        budget = (t1 - t0) - 0.45
        raw = os.path.join(outdir, f"line_{i}_raw.pcm")
        wav = os.path.join(outdir, f"line_{i}.wav")
        mp3 = os.path.join(outdir, f"line_{i}.mp3")

        synth_one(ln["text"], raw, a.voice, a.rate)
        raw_to_wav(raw, wav, a.raw_sr)
        seg, fr = load_wav(wav)
        seg = trim_tail(seg, fr)
        seg = resample(seg, fr)
        seg = polish(seg)

        # —— 非重叠顺序排布（修复相邻句叠加造成的"重音"）——
        desired = int((t0 + 0.20) * SR)
        start = max(desired, prev_end)
        next_t0 = lines[i + 1]["t0"] if i + 1 < len(lines) else total
        allowed_end = min(int(next_t0 * SR) - int(0.10 * SR), len(track))
        max_dur = max(allowed_end - start, int(0.5 * SR))
        if len(seg) > max_dur:
            seg = _stretch(seg, max_dur)
        seg = to_stereo(seg)

        write_wav(wav, seg)
        subprocess.run([FF, "-y", "-loglevel", "error", "-i", wav,
                        "-c:a", "libmp3lame", "-b:a", "192k", mp3], check=True)

        end = min(start + len(seg), len(track))
        track[start:end] = seg[: end - start]   # 覆盖写轨，杜绝叠加
        d = len(seg) / SR
        prev_end = end

        sched.append(dict(id=ln.get("id", f"L{i}"), text=ln["text"], t0=t0, t1=t1,
                          start=start / SR, dur=d, rate=f"winrt{a.rate}",
                          end_cap=ln.get("end_cap")))
        flag = "" if d <= budget else "  ⚠️ 超预算"
        print(f"  {ln.get('id', 'L' + str(i)):>12} {d:5.2f}s / 预算 {budget:4.2f}s  @{start / SR:6.2f}s{flag}", flush=True)

    peak = np.abs(track).max()
    if peak > 32000:
        track = (track.astype(np.float64) * (32000 / peak)).astype(np.int16)
    vp = os.path.join(outdir, "voice.wav")
    write_wav(vp, track)
    print(f"配音轨 -> {vp} ({len(track) / SR:.2f}s)", flush=True)

    for s in sched:
        e = min(s["start"] + s["dur"] + 0.15, s["t1"])
        if s["end_cap"] is not None:
            e = min(e, float(s["end_cap"]))
        subs.append(f"Dialogue: 0,{ts(s['start'])},{ts(e)},字幕,,0,0,0,,{s['text']}")

    ass = """[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
""" + ASS_STYLE + """

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
""" + "\n".join(subs) + "\n"

    apath = os.path.join(outdir, "sub.ass")
    with open(apath, "w", encoding="utf-8-sig") as f:
        f.write(ass)
    json.dump(sched, open(os.path.join(outdir, "sched.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print(f"字幕 -> {apath}", flush=True)

    # 清理裸 PCM —— 已停用（沙箱按轮次累计删除计数，批量删除会被拦截中断）。
    # 裸 PCM 体积极小，保留不影响交付。

    if a.no_burn or not final:
        print("（--no-burn：跳过烧录）", flush=True)
        return

    g = 0.0
    peak = np.abs(track).max()
    if peak < 20000:
        g = round(20 * np.log10(28000 / max(peak, 1)), 1)
    af = f"volume={g}dB" if g > 0 else "anull"
    subprocess.run([FF, "-y", "-loglevel", "error", "-i", video, "-i", vp,
                    "-vf", "subtitles=sub.ass", "-af", af,
                    "-c:v", "libx264", "-crf", "18", "-preset", "medium",
                    "-c:a", "aac", "-b:a", "192k", "-shortest",
                    "-movflags", "+faststart", final],
                   cwd=outdir, check=True)
    print(f"终版 -> {final}（增益 {g}dB）", flush=True)


if __name__ == "__main__":
    main()
