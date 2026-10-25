#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
视频号待发箱打包工具
====================

为什么只做到"半自动"
--------------------
微信视频号从未对第三方开放发布 API（公众号图文有开放接口，视频号没有）。
官方原生能力只有：PC 端「视频号助手」上传时勾选【定时发表】（未来 7 天内任意时间）。
市面上所有"视频号自动发布"工具，底层都是模拟登录 / 浏览器自动化，违反
《微信视频号运营规范》，轻则限流下架、重则封号。

所以本工具把"能自动化的部分"全部做掉：
    抽封面帧 → 合成 9:16 封面 → 拷贝成片 → 生成可复制的标题/描述/话题 → 写 manifest.json
只剩"上传"一步需要人工（约 30 秒），上传时勾【定时发表】即可实现定时全自动。

用法
----
    python prepare_channels.py --key sanguo
    python prepare_channels.py --all
    python prepare_channels.py --key zhaoyun --cover-time 8.0 --force

产物
----
    _视频号待发箱/<日期>-<片名>/
        <片名>.mp4        成片副本
        封面.jpg          1080x1440（9:16）成品封面，含标题与「AI 生成」角标
        发布文案.md        标题/描述/话题 + 视频号助手上传步骤，可直接复制
        manifest.json     结构化信息，供后续脚本或人工核对

依赖：ffmpeg、Pillow、numpy（本机受管 venv 均已具备）
"""

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime

from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ffmpeg 可执行文件：依次尝试 环境变量 FFMPEG_BIN → PATH 搜索 → 常见本机路径兜底
FFMPEG = os.environ.get("FFMPEG_BIN") or shutil.which("ffmpeg") or r"ffmpeg.exe"
FONT_DIR = r"C:\Windows\Fonts"
FONT_BOLD = os.path.join(FONT_DIR, "msyhbd.ttc")   # 微软雅黑 Bold
FONT_KAI = os.path.join(FONT_DIR, "simkai.ttf")    # 楷体（水墨片更配）

COVER_W, COVER_H = 1080, 1440          # 视频号封面建议 9:16
MAX_SIZE_MB = 1024                     # 视频号单文件上限（保守取 1GB）
MAX_DUR_SEC = 3600                     # 60 分钟


# --------------------------------------------------------------------------
# 基础工具
# --------------------------------------------------------------------------
def probe(path):
    """本机没有 ffprobe，用 ffmpeg -i 的输出抓分辨率/时长。"""
    r = subprocess.run([FFMPEG, "-i", path], capture_output=True, text=True,
                       encoding="utf-8", errors="ignore")
    txt = r.stderr or ""
    w = h = None
    dur = None
    audio = "Audio:" in txt
    for line in txt.splitlines():
        s = line.strip()
        if s.startswith("Stream") and "Video:" in s:
            for seg in s.split(","):
                seg = seg.strip()
                if "x" in seg and seg.split("x")[0].strip().isdigit():
                    try:
                        w, h = [int(x) for x in seg.split(" ")[0].split("x")]
                    except ValueError:
                        pass
                    break
        if s.startswith("Duration:"):
            try:
                hh, mm, ss = s.split("Duration:")[1].split(",")[0].strip().split(":")
                dur = int(hh) * 3600 + int(mm) * 60 + float(ss)
            except (ValueError, IndexError):
                pass
    return {"w": w, "h": h, "dur": dur, "audio": audio}


def grab_frame(video, t, out):
    """抽单帧。本机 ffmpeg 抽单帧必须加 -update 1，否则会写成序列。"""
    subprocess.run([FFMPEG, "-y", "-loglevel", "error", "-ss", f"{t:.3f}",
                    "-i", video, "-frames:v", "1", "-update", "1", out],
                   capture_output=True)
    return os.path.exists(out)


def load_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default()


def fit_font(draw, text, font_path, size, max_w):
    """字号自适应：太长就缩小，保证不出框。"""
    while size > 24:
        f = load_font(font_path, size)
        if draw.textlength(text, font=f) <= max_w:
            return f
        size -= 2
    return load_font(font_path, size)


def text_with_shadow(draw, xy, text, font, fill, shadow, off=3):
    x, y = xy
    draw.text((x + off, y + off), text, font=font, fill=shadow)
    draw.text((x, y), text, font=font, fill=fill)


# --------------------------------------------------------------------------
# 封面合成
# --------------------------------------------------------------------------
def make_cover(frame_path, out_path, title, sub, kai=False):
    im = Image.open(frame_path).convert("RGB")
    iw, ih = im.size

    # 背景：原帧拉伸铺满 + 高斯模糊 + 压暗，避免上下/左右留黑边
    bg = im.resize((COVER_W, COVER_H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(36))
    bg = bg.point(lambda p: int(p * 0.72))

    # 前景：等比 fit 居中，画面内容一个像素都不裁
    scale = min(COVER_W / iw, COVER_H / ih)
    nw, nh = max(1, int(iw * scale)), max(1, int(ih * scale))
    fg = im.resize((nw, nh), Image.LANCZOS)
    canvas = bg.copy()
    canvas.paste(fg, ((COVER_W - nw) // 2, (COVER_H - nh) // 2))

    # 底部渐变黑幕，保证标题压得住
    try:
        import numpy as np
        band = 560
        arr = np.zeros((COVER_H, COVER_W), dtype=np.uint8)
        arr[COVER_H - band:, :] = np.linspace(0, 225, band).astype(np.uint8)[:, None]
        ov = Image.new("RGBA", (COVER_W, COVER_H), (0, 0, 0, 0))
        ov.putalpha(Image.fromarray(arr))
        canvas = Image.alpha_composite(canvas.convert("RGBA"), ov).convert("RGB")
    except ImportError:
        d0 = ImageDraw.Draw(canvas)
        for i in range(140):
            y = COVER_H - 560 + i * 4
            d0.rectangle([0, y, COVER_W, y + 4], fill=(0, 0, 0))
        canvas = canvas

    d = ImageDraw.Draw(canvas)
    font_main = FONT_KAI if kai else FONT_BOLD

    # 主标题（底部居中）
    pad = 80
    max_w = COVER_W - pad * 2
    f1 = fit_font(d, title, font_main, 82, max_w)
    w1 = d.textlength(title, font=f1)
    y1 = COVER_H - 300
    text_with_shadow(d, ((COVER_W - w1) / 2, y1), title, f1,
                     "#FFF6E8", (0, 0, 0), off=4)

    # 副标题
    f2 = fit_font(d, sub, FONT_BOLD, 38, max_w)
    w2 = d.textlength(sub, font=f2)
    text_with_shadow(d, ((COVER_W - w2) / 2, y1 + 108), sub, f2,
                     "#FFD9A0", (0, 0, 0), off=2)

    # 「AI 生成」角标（AI 内容标识合规，与 AI日报 封面一致）
    f3 = load_font(FONT_BOLD, 26)
    tag = "AI 生成"
    tw = d.textlength(tag, font=f3)
    bx0, by0 = COVER_W - 40 - tw - 26, 40
    d.rounded_rectangle([bx0, by0, bx0 + tw + 26, by0 + 46], radius=10,
                        fill=(255, 255, 255, 210))
    d.text((bx0 + 13, by0 + 8), tag, font=f3, fill=(26, 26, 26))

    canvas.save(out_path, "JPEG", quality=92)
    return out_path


# --------------------------------------------------------------------------
# 打包
# --------------------------------------------------------------------------
def build(cfg, key, src_root, out_root, cover_time=None, force=False):
    meta = cfg["films"][key]
    src = os.path.join(src_root, meta["video"].replace("/", os.sep))
    if not os.path.exists(src):
        print(f"  [跳过] {key}: 找不到成片 {src}")
        return None

    info = probe(src)
    size_mb = os.path.getsize(src) / 1024 / 1024
    stamp = datetime.now().strftime("%Y-%m-%d")
    folder = os.path.join(out_root, f"{stamp}-{meta['name']}".replace(":", "、"))
    if os.path.isdir(folder) and not force:
        print(f"  [跳过] {key}: 待发箱已存在（加 --force 覆盖） → {folder}")
        return folder
    os.makedirs(folder, exist_ok=True)

    # 1) 成片
    vname = f"{meta['name']}.mp4".replace(":", "、")
    dst_video = os.path.join(folder, vname)
    shutil.copy2(src, dst_video)

    # 2) 封面
    t = cover_time if cover_time is not None else meta["cover_time"]
    tmp = os.path.join(tempfile.gettempdir(), f"_cov_{key}.png")
    if not grab_frame(src, t, tmp):
        print(f"  [警告] {key}: 抽帧失败，改用 1.0s")
        t = 1.0
        grab_frame(src, t, tmp)
    cover = make_cover(tmp, os.path.join(folder, "封面.jpg"),
                       meta["title"], meta["sub"], kai=(key in ("zhaoyun", "huangzhong")))
    if os.path.exists(tmp):
        os.remove(tmp)

    # 3) 规范门禁：流水线标准要求每部片都有「配音 + 字幕」
    # voice: narration=有旁白 / bgm_only=只有背景音乐 / none=无声
    voice_kind = meta.get("voice", "none")
    voice_ok = voice_kind == "narration"
    sub_rel = meta.get("subtitle")
    sub_ok = bool(sub_rel) and os.path.exists(os.path.join(src_root, sub_rel.replace("/", os.sep)))
    gate = []
    if voice_kind == "bgm_only":
        gate.append("只有 BGM 没有旁白 —— 新片规范要求先跑 发布工具/build_voice.py 加旁白")
    elif voice_kind == "none":
        gate.append("完全没有配音轨 —— 新片规范要求先跑 发布工具/build_voice.py 生成旁白")
    elif voice_ok and not info["audio"]:
        gate.append("元数据声明有旁白，但成片里探测不到音轨（成片与元数据不一致）")
    if not sub_ok:
        gate.append("无字幕文件 —— 新片规范要求 build_voice.py 产出的 sub.ass（并在元数据 subtitle 字段登记路径）")

    # 4) 规格校验
    warn = []
    if size_mb > MAX_SIZE_MB:
        warn.append(f"文件 {size_mb:.1f}MB 超过 1GB 上限，需压缩")
    if info["dur"] and info["dur"] > MAX_DUR_SEC:
        warn.append(f"时长 {info['dur']:.0f}s 超过 60 分钟上限")
    if info["w"] and info["h"]:
        if min(info["w"], info["h"]) < 720:
            warn.append(f"分辨率 {info['w']}x{info['h']} 低于 720p")
        if info["w"] > info["h"]:
            warn.append("横屏片，视频号竖屏展示会上下留黑边（封面已做模糊填充，正片建议套竖版模板）")

    # 4) 发布文案
    orient = "竖屏" if info["w"] and info["h"] and info["h"] > info["w"] else "横屏"
    spec = f"{info['w']}x{info['h']} · {orient} · {info['dur']:.2f}s · {size_mb:.1f}MB"
    if gate:
        md_gate = "\n> ⚠ **不符合当前流水线规范**：\n" + "".join(f"> - {g}\n" for g in gate) + "\n"
    else:
        md_gate = "> ✅ 配音 + 字幕齐全，符合流水线规范\n"
    tags = " ".join(meta["tags"])
    md = f"""# {meta['title']}

> 待发箱打包时间：{datetime.now().strftime('%Y-%m-%d %H:%M')}　　规格：{spec}
> 封面帧取自 {t:.2f}s（{meta.get('cover_note', '')}）
{md_gate}

## 标题（复制这段）

{meta['title']}

## 描述 / 正文（复制这段）

{meta['desc']}

{tags}

## 上传步骤（视频号助手 PC 端，约 30 秒）

1. 浏览器打开 <https://channels.weixin.qq.com/> ，微信扫码登录
2. 【内容管理】→【发表视频】→ 上传本目录下的 `{vname}`
3. 封面选【自定义上传】→ 用本目录下的 `封面.jpg`（1080×1440 已做好）
4. 把上面的标题、描述、话题分别粘贴进对应输入框
5. 点【发表】旁边的下拉 →【定时发表】→ 选未来 7 天内的时间
   （这一步就是官方原生能力，设好之后到点自动发，无需值守）
6. 若要改期：视频号助手【内容管理】→ 找到"等待发表"→ 取消发表 → 回到草稿箱重设

## 注意事项

- 描述里已注明 AI 生成身份，封面右下角有「AI 生成」角标，符合平台标识要求
- 每部片之间不要密集发布，同一账号短时间内连续发多条容易触发风控
"""
    if warn:
        md += "\n## 规格提醒\n\n" + "\n".join(f"- ⚠ {w}" for w in warn) + "\n"
    with open(os.path.join(folder, "发布文案.md"), "w", encoding="utf-8") as f:
        f.write(md)

    # 5) manifest
    manifest = {
        "key": key,
        "name": meta["name"],
        "title": meta["title"],
        "sub": meta["sub"],
        "desc": meta["desc"],
        "tags": meta["tags"],
        "video": vname,
        "cover": "封面.jpg",
        "cover_time": t,
        "spec": {"w": info["w"], "h": info["h"], "dur": info["dur"],
                 "size_mb": round(size_mb, 2), "orientation": orient},
        "warnings": warn,
        "gate": {"voice": voice_ok, "subtitle": sub_ok, "issues": gate,
                 "passed": not gate},
        "source": meta["video"],
        "created": datetime.now().isoformat(timespec="seconds"),
        "status": "pending_upload",
        "publish_hint": "视频号无开放发布 API；人工上传后勾【定时发表】实现定时全自动",
    }
    with open(os.path.join(folder, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"  [完成] {key} → {folder}")
    print(f"         {vname} | 封面.jpg | 发布文案.md | manifest.json")
    for w in warn:
        print(f"         ⚠ {w}")
    if gate:
        print("         ┌─ 规范门禁未通过 ─────────────")
        for g in gate:
            print(f"         │ ✗ {g}")
        print("         └──────────────────────────────")
    else:
        print("         ✓ 配音 + 字幕齐全")
    return folder


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    root = os.path.dirname(here)
    ap = argparse.ArgumentParser(description="视频号待发箱打包工具")
    ap.add_argument("--key", help="片 key，见 发布元数据.json")
    ap.add_argument("--all", action="store_true", help="打包全部")
    ap.add_argument("--meta", default=os.path.join(root, "publish", "发布元数据.json"))
    ap.add_argument("--src", default=root, help="工程根目录")
    ap.add_argument("--out", default=os.path.join(root, "_视频号待发箱"))
    ap.add_argument("--cover-time", type=float, help="覆盖元数据里的封面时刻")
    ap.add_argument("--force", action="store_true", help="覆盖已存在的待发包")
    a = ap.parse_args()

    if not a.key and not a.all:
        ap.error("需要 --key <key> 或 --all")

    cfg = json.load(open(a.meta, encoding="utf-8"))
    keys = list(cfg["films"].keys()) if a.all else [a.key]
    for k in keys:
        if k not in cfg["films"]:
            print(f"  [错误] 元数据里没有 {k}；可用：{list(cfg['films'])}")
            continue
        build(cfg, k, a.src, a.out, cover_time=a.cover_time, force=a.force)


if __name__ == "__main__":
    sys.exit(main())
