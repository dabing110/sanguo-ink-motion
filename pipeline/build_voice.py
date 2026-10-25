#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
通用配音 + 字幕生成（流水线标准环节）
=====================================

从《老将黄忠》那版硬编码脚本泛化而来：接任意成片 + 一份「分幕台词表」，
产出配音轨与 ASS 字幕，可选一步烧录成终版。

流程
----
1. 生成台词表模板（新片先跑这个）
     python build_voice.py --template-from eras_machao.js --out lines_machao.json
     python build_voice.py --uniform 16 --total 75 --out lines_sanguo.json   # 均分幕（霓虹片）
   → 得到待填 JSON，把每幕的 text 填上（文言短句 9–14 字最稳）

2. 合成配音 + 字幕
     python build_voice.py --lines lines_machao.json --video 成片.mp4 --outdir _voice

3. 一步烧录成终版（推荐）
     python build_voice.py --lines lines_machao.json --video 成片.mp4 \
            --outdir _voice --burn --final 成片_配音字幕版.mp4

台词表格式
----------
{
  "film": "machao",
  "voice": "zh-CN-YunjianNeural",
  "style": "ink",                     // ink=水墨楷体米白底 / neon=霓虹雅黑深底
  "lines": [
    {"id": "m1", "t0": 0.0, "t1": 3.2, "text": "马超，字孟起，扶风人。"},
    {"id": "m8", "t0": 21.6, "t1": 25.4, "text": "…", "end_cap": 23.55}   // end_cap 让字幕提前收
  ]
}

踩过的坑（都在代码里处理掉了，别改回去）
----------------------------------------
- edge-tts 输出末尾带 ~0.7s 静音填充：不裁掉会把语速逼到 +42% 仍超时 → read_wav 里按能量裁尾
- ASS BorderStyle=3 的底框颜色取 **OutlineColour**，不是 BackColour
- ASS 颜色是 **BGR** 序，不是 RGB：搞反会出「黑底黑字」或蓝条
- 句起点固定在幕首 +0.20s，绝不提前侵入上一幕
- 配音直出 mean 约 −28dB 偏低 → auto_gain 自动补到 −21dB
"""

import argparse
import asyncio
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import wave

import numpy as np

FF = os.environ.get("FFMPEG_BIN") or shutil.which("ffmpeg") or "ffmpeg.exe"
SR = 44100

# 音色：男声武将用云健，文戏可用云希/晓晓；女声 zh-CN-XiaoxiaoNeural
DEFAULT_VOICE = "zh-CN-YunjianNeural"

# 字幕样式预设（ASS 颜色为 BGR 序！）
STYLES = {
    # 水墨：楷体墨字 + 半透明宣纸米白底条，底部居中
    "ink": {
        "playres": (1920, 1080),
        "style": "Style: 字幕,KaiTi,58,&H00141414,&H00141414,&H50B8DCEE,&H00000000,"
                 "1,0,0,0,100,100,1,0,3,4,0,2,60,60,26,1",
    },
    # 霓虹：雅黑粗体亮字 + 深底条，字幕带放画面中部空档（render.js 实测：title 基线
    # y=1420/1590、sub 1655、bars 1720/1816、角标 1858 —— 底部 y1300 以下全是既有文字；
    # 年份 y=250、右上数据 y350-520。MarginV=700 → 字幕落 y≈1140-1220 空白插画带）
    "neon": {
        "playres": (1080, 1920),
        "style": "Style: 字幕,Microsoft YaHei,64,&H00FFF6E8,&H00FFF6E8,&HB0000000,&H00000000,"
                 "1,0,0,0,100,100,1,0,3,5,0,2,60,60,700,1",
    },
}


# --------------------------------------------------------------------------
# 工具
# --------------------------------------------------------------------------
def dur_of(path):
    r = subprocess.run([FF, "-i", path], capture_output=True, text=True,
                       encoding="utf-8", errors="ignore")
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", r.stderr or "")
    if not m:
        raise RuntimeError(f"读不出时长：{path}")
    return int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))


def has_audio(path):
    r = subprocess.run([FF, "-i", path], capture_output=True, text=True,
                       encoding="utf-8", errors="ignore")
    return "Audio:" in (r.stderr or "")


def synth(text, voice, rate, path):
    import edge_tts

    async def go():
        c = edge_tts.Communicate(text, voice, rate=rate)
        await c.save(path)

    asyncio.run(go())


def to_wav(src, dst):
    subprocess.run([FF, "-y", "-loglevel", "error", "-i", src, "-ar", str(SR), "-ac", "2", dst],
                   check=True, capture_output=True)


def read_wav(p):
    """读 wav 并裁掉尾部的静音填充（edge-tts 会带 ~0.7s）。"""
    with wave.open(p, "rb") as w:
        assert w.getframerate() == SR and w.getnchannels() == 2
        d = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)
    d = d.reshape(-1, 2)
    mag = np.abs(d).max(axis=1)
    nz = np.where(mag > 400)[0]
    if len(nz):
        d = d[: nz[-1] + int(0.12 * SR)]      # 尾部留 0.12s 自然收尾
    return d


def mean_volume(path):
    r = subprocess.run([FF, "-i", path, "-map", "0:a", "-af", "volumedetect",
                        "-f", "null", "-"], capture_output=True, text=True,
                       encoding="utf-8", errors="ignore")
    m = re.search(r"mean_volume: ([-\d.]+) dB", r.stderr or "")
    return float(m.group(1)) if m else None


def auto_gain(path, target=-21.0, floor=-26.0, cap=12.0):
    """配音直出偏低，自动补增益到目标响度。返回实际增益 dB。"""
    mv = mean_volume(path)
    if mv is None:
        return 0.0
    if mv >= floor:
        return 0.0
    g = min(target - mv, cap)
    return round(max(g, 0.0), 1)


def ts(t):
    h = int(t // 3600)
    m = int(t % 3600 // 60)
    s = t % 60
    return f"{h}:{m:02d}:{s:05.2f}"


# --------------------------------------------------------------------------
# 台词表模板
# --------------------------------------------------------------------------
def template_from_eras(path):
    src = open(path, encoding="utf-8").read()
    items = re.findall(r"\{\s*id:\s*'([^']+)'.*?dur:\s*([\d.]+)", src, re.S)
    if not items:
        raise RuntimeError(f"没从 {path} 解析到分幕（需要 id: 'xxx' 与 dur: n）")
    lines, t = [], 0.0
    for sid, dur in items:
        d = float(dur)
        lines.append({"id": sid, "t0": round(t, 3), "t1": round(t + d, 3), "text": ""})
        t += d
    return {"film": os.path.splitext(os.path.basename(path))[0].replace("eras_", ""),
            "voice": DEFAULT_VOICE, "style": "ink",
            "total": round(t, 3), "lines": lines}


def template_uniform(n, total):
    each = total / n
    lines = [{"id": f"s{i+1:02d}", "t0": round(i * each, 3), "t1": round((i + 1) * each, 3),
              "text": ""} for i in range(n)]
    return {"film": "unnamed", "voice": DEFAULT_VOICE, "style": "neon",
            "total": round(total, 3), "lines": lines}


# --------------------------------------------------------------------------
# 主流程
# --------------------------------------------------------------------------
def build(cfg, video, outdir, burn=False, final=None, gain=None):
    # 烧录时 cwd 会切到字幕目录，视频/终版必须先转绝对路径（否则 ffmpeg 找不到输入）
    video = os.path.abspath(video)
    if final:
        final = os.path.abspath(final)
    os.makedirs(outdir, exist_ok=True)
    voice = cfg.get("voice", DEFAULT_VOICE)
    style = STYLES.get(cfg.get("style", "ink"), STYLES["ink"])
    px, py = style["playres"]
    total = cfg.get("total") or dur_of(video)

    lines = [l for l in cfg["lines"] if l.get("text")]
    if not lines:
        print("台词表里没有填任何 text，退出。")
        return 1
    print(f"片长 {total:.2f}s · 音色 {voice} · 样式 {cfg.get('style','ink')} · {len(lines)} 句", flush=True)

    # 1) 逐句合成 + 自适应语速
    track = np.zeros((int(total * SR), 2), dtype=np.int16)
    sched = []
    for i, ln in enumerate(lines):
        t0, t1 = float(ln["t0"]), float(ln["t1"])
        budget = (t1 - t0) - 0.45                       # 幕尾留呼吸
        mp3 = os.path.join(outdir, f"line_{i}.mp3")
        wav = os.path.join(outdir, f"line_{i}.wav")
        rate = "+0%"
        seg = None
        for attempt in range(7):
            synth(ln["text"], voice, rate, mp3)
            to_wav(mp3, wav)
            seg = read_wav(wav)
            d = len(seg) / SR                           # 用裁剪后的净时长判定
            if d <= budget:
                break
            rate = f"+{6 * (attempt + 1)}%"
        start = int((t0 + 0.20) * SR)                   # 固定幕首起，不侵入上一幕
        end = min(start + len(seg), len(track))
        track[start:end] += seg[: end - start]
        sched.append(dict(id=ln.get("id", f"L{i}"), text=ln["text"], t0=t0, t1=t1,
                          start=start / SR, dur=len(seg) / SR, rate=rate,
                          end_cap=ln.get("end_cap")))
        print(f"  {ln.get('id', f'L{i}'):>4} {len(seg)/SR:5.2f}s / 预算 {budget:4.2f}s  "
              f"rate {rate}  @{start/SR:6.2f}s", flush=True)

    # 2) limiter 防爆音
    peak = np.abs(track).max()
    if peak > 32000:
        track = (track.astype(np.float64) * (32000 / peak)).astype(np.int16)
    vp = os.path.abspath(os.path.join(outdir, "voice.wav"))
    with wave.open(vp, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(track.tobytes())
    print(f"配音轨 -> {vp} ({len(track)/SR:.2f}s)", flush=True)

    # 3) ASS 字幕
    st = []
    for s in sched:
        e = min(s["start"] + s["dur"] + 0.15, s["t1"])
        if s["end_cap"] is not None:                    # 与画面既有文字冲突时提前收
            e = min(e, float(s["end_cap"]))
        st.append(f"Dialogue: 0,{ts(s['start'])},{ts(e)},字幕,,0,0,0,,{s['text']}")
    ass = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {px}
PlayResY: {py}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
{style['style']}

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
""" + "\n".join(st) + "\n"
    ap = os.path.abspath(os.path.join(outdir, "sub.ass"))
    with open(ap, "w", encoding="utf-8-sig") as f:
        f.write(ass)
    json.dump(sched, open(os.path.join(outdir, "sched.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print(f"字幕 -> {ap}", flush=True)

    # 4) 烧录
    if burn:
        if not final:
            base, ext = os.path.splitext(video)
            final = base + "_配音字幕版" + ext
        g = gain if gain is not None else auto_gain(vp)
        af = f"volume={g}dB" if g > 0 else "anull"
        subprocess.run([FF, "-y", "-loglevel", "error", "-i", video, "-i", vp,
                        "-vf", "subtitles=sub.ass", "-af", af,
                        "-c:v", "libx264", "-crf", "18", "-preset", "medium",
                        "-c:a", "aac", "-b:a", "192k", "-shortest",
                        "-movflags", "+faststart", final],
                       cwd=outdir, check=True)
        print(f"终版 -> {final}（增益 {g}dB）", flush=True)
    return 0


def main():
    ap = argparse.ArgumentParser(description="通用配音 + 字幕生成（流水线标准环节）")
    ap.add_argument("--lines", help="台词表 JSON")
    ap.add_argument("--video", help="成片（提供 total / 烧录用）")
    ap.add_argument("--outdir", default="_voice")
    ap.add_argument("--burn", action="store_true", help="烧录字幕并混音")
    ap.add_argument("--final", help="终版输出路径（--burn 时有效）")
    ap.add_argument("--gain", type=float, help="手动指定增益 dB，不给则自动测")
    ap.add_argument("--template-from", help="从 eras_*.js 解析分幕，生成台词表模板")
    ap.add_argument("--uniform", type=int, help="均分幕数（霓虹片用），配 --total")
    ap.add_argument("--total", type=float, help="总时长（配合 --uniform）")
    ap.add_argument("--out", help="模板输出路径")
    a = ap.parse_args()

    # 模式 A：生成台词表模板
    if a.template_from or (a.uniform and a.total):
        cfg = (template_from_eras(a.template_from) if a.template_from
               else template_uniform(a.uniform, a.total))
        out = a.out or f"lines_{cfg['film']}.json"
        json.dump(cfg, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        print(f"台词表模板 -> {out}（{len(cfg['lines'])} 幕，请把每幕的 text 填上）")
        for l in cfg["lines"]:
            print(f"  {l['id']:>6}  {l['t0']:6.2f}–{l['t1']:6.2f}s   ← 填 {l['t1']-l['t0']:.2f}s 内说得完的短句")
        return 0

    # 模式 B：合成
    if not a.lines or not a.video:
        ap.error("合成模式需要 --lines 与 --video")
    cfg = json.load(open(a.lines, encoding="utf-8"))
    return build(cfg, a.video, a.outdir, burn=a.burn, final=a.final, gain=a.gain)


if __name__ == "__main__":
    sys.exit(main())
