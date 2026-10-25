#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""静态检查：每部片用到的 Z.xxx( 是否都在其 SCENE_LIBS 里定义。"""
import os, re, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
SCENES = os.path.join(ROOT, "scenes")

# 每部片 -> 场景文件前缀
FILMS = {
    "xunyu": "x",
    "chengong": "c",
    "tianfeng": "f",
    "miheng": "n",
    "pangde": "p",
}

def scene_libs(film):
    """从 eras_<film>.js 读 SCENE_LIBS。"""
    src = open(os.path.join(ROOT, f"eras_{film}.js"), encoding="utf-8").read()
    m = re.search(r"SCENE_LIBS\s*=\s*\[([^\]]+)\]", src)
    libs = re.findall(r"['\"]([^'\"]+)['\"]", m.group(1))
    # 永远加载 h_common（eras 里已列），但保险起见补上
    return libs

def defined_in(lib_files):
    defs = set()
    for lf in lib_files:
        p = os.path.join(SCENES, os.path.basename(lf))
        if not os.path.exists(p):
            continue
        txt = open(p, encoding="utf-8").read()
        for m in re.finditer(r"Z\.([a-zA-Z0-9_]+)\s*=", txt):
            defs.add(m.group(1))
    return defs

def calls_in(scene_files):
    calls = set()
    for sf in scene_files:
        txt = open(sf, encoding="utf-8").read()
        for m in re.finditer(r"Z\.([a-zA-Z0-9_]+)\s*\(", txt):
            calls.add(m.group(1))
    return calls

for film, prefix in FILMS.items():
    libs = scene_libs(film)
    defs = defined_in(libs)
    # 额外把同前缀 common 也视为可用（如 x_common），防止漏判
    defs |= defined_in([f"{prefix}_common.js"])
    scenes = sorted(glob.glob(os.path.join(SCENES, f"{prefix}[0-9]*_*.js")))
    calls = calls_in(scenes)
    missing = sorted(c for c in calls if c not in defs)
    print(f"=== {film} ===  libs={libs}")
    if missing:
        # 定位到具体文件:行
        for c in missing:
            locs = []
            for sf in scenes:
                for i, line in enumerate(open(sf, encoding="utf-8"), 1):
                    if re.search(rf"Z\.{c}\s*\(", line):
                        locs.append(f"{os.path.basename(sf)}:{i}")
            print(f"  缺失 Z.{c}: {locs}")
    else:
        print("  ✓ 所有 Z.xxx( 均已定义")
