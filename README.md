# sanguo-ink-motion · 三国演义水墨动画流水线

用**代码**画水墨动画、批量生产《三国演义》人物传的完整开源工程：确定性帧引擎 + 41 部人物剧本 + 逐帧渲染 + TTS 配音烧字幕 + 发布门禁，全部本地完成，不依赖任何云服务。

```
徐晃 · 环首长刀          张昭 · 手板谏争          吕蒙 · 白衣渡江          陆逊 · 一把茅
```

## 这是什么

| 层 | 内容 | 说明 |
|---|---|---|
| 引擎 | `engine/engine.js` + `engine/eras_*.js` + `engine/scenes/*.js` | 确定性帧引擎（同一时刻 t 必得同一帧，可复现、可回归）；40 个段落表 + 249 个场景文件 + `Z.*` 水墨笔法库 |
| 流水线 | `pipeline/` | 逐帧渲染（Playwright→ffmpeg）、TTS 配音与字幕烧录（双通道）、发布门禁与待发箱打包、台词回填、静态检查 |
| 数据 | `data/` | 38 部台词轴 `lines_*.json`（时间轴 + 文案，配音与字幕共源） |
| 发布 | `publish/` | 本地上传台（41 部，复制标题/描述/话题/路径、已发进度跟踪）+ 发布元数据 |
| 方法 | `docs/` | 选题研究、水墨经验回流、霓虹通史方法 |

**独立工程**：不依赖任何 AI 绘画服务、不依赖云端 API、不依赖 WorkBuddy skill。外部依赖只有 Python + Playwright（Chromium）+ ffmpeg + Node（可选）。

## 快速开始

### 1. 环境

```bash
# Python 依赖
pip install playwright pillow numpy edge-tts
python -m playwright install chromium

# ffmpeg：装好加入 PATH 即可；或用环境变量指定
export FFMPEG_BIN=/path/to/ffmpeg
```

### 2. 本地看片（零依赖预览）

```bash
cd engine
python -m http.server 8080
# 浏览器打开 http://127.0.0.1:8080/index.html?film=xuhuang
```

`?film=<名>` 选段落表（默认 `eras.js`）；不加参数直接看默认片。页面里按 `R` 可从任意时刻重渲（用于 QA 抽帧）。

### 3. 渲染一部片

```bash
# 整段渲（短片段）
python pipeline/render.py --film xuhuang --out xuhuang.mp4

# 长片分段渲（推荐，绕开 Chromium 内存累积）
python pipeline/render.py --film xuhuang --from 0 --to 8.2666667 --out xuhuang_c0.mp4
python pipeline/render.py --film xuhuang --from 8.2666667 --to 16.5333333 --out xuhuang_c1.mp4
python pipeline/render.py --film xuhuang --from 16.5333333 --to 24.8 --out xuhuang_c2.mp4

# 合并（流复制，不重编码）
printf "file 'xuhuang_c0.mp4'\nfile 'xuhuang_c1.mp4'\nfile 'xuhuang_c2.mp4'\n" > xuhuang_list.txt
ffmpeg -f concat -safe 0 -i xuhuang_list.txt -c copy -movflags +faststart xuhuang.mp4
```

### 4. 配音 + 烧字幕（双门闸）

```bash
# 通道 A：edge-tts（在线 TTS，音色更好）
python pipeline/build_voice.py --lines data/lines_xuhuang.json --video xuhuang.mp4 --outdir _voice

# 通道 B：系统 TTS（Windows SAPI，完全离线）
python pipeline/build_voice_winrt.py --lines data/lines_xuhuang.json --video xuhuang.mp4 --outdir _voice
```

产出：配音后成片 + `sub.ass` 烧录字幕 + 时间轴报告。**语速红线：每句所需 tempo ≤1.30（+30%）**，脚本会自适应轻微拉伸/压缩并在超标时报错——文案阶段就要控制（旁白每句约 9–14 字、语速按 5.5 字/秒估算）。

### 5. 发布门禁 + 待发箱

```bash
python pipeline/prepare_channels.py --key xuhuang --meta publish/发布元数据.json --force
```

自动执行：参数体检（24.80s / 1920×1080 / 60fps / H.264+AAC）、音轨探测、字幕登记、抽封面帧、打待发箱目录（成片 + 封面 + 发布文案 + manifest）。

## 新增一部片（五步）

```bash
# ① 写剧本：八幕 + 每幕一句旁白（id 对应 eras 里的幕 id）
# ② 写造型与场景：scenes/<前缀>_common.js（造型 Z.xxx）+ scenes/<前缀>1_xxx.js … 8_xxx.js
# ③ 写段落表：engine/eras_<名>.js（八幕时长、镜头、SCENE_LIBS 声明）
# ④ 回填台词轴
python pipeline/fill_lines.py            # 编辑文件顶部 TEXT 字典即可
# ⑤ 静态检查 → 渲染 → 配音 → 门禁（同上 3/4/5）
python pipeline/qa/check_zdefs.py <前缀>  # Z 函数定义/调用一致性
python pipeline/qa/check_ellipse.py <前缀>  # Canvas ellipse() 7 参数检查
```

场景契约：`scenes/<名>.js` 以 `SCENES['<scene_id>'] = { draw(c, lt, t) }` 注册，`engine.js` 每帧调 `e.draw(c, lt, t, IMG, prev)`；`scenes/index.js` 按 `e.id` 匹配，缺场景记 `__bootErrors` 且引擎拒绝启动（fail-fast，不会渲出静默黑帧）。

## 已知坑（都踩过）

| 坑 | 解法 |
|---|---|
| Chromium 继承系统代理，连 `127.0.0.1` 本地服务都被拒，页面永远 boot 不完 | Playwright launch 加 `--no-proxy-server`（机器上开着任何代理软件都会中招） |
| Windows 下 Python 子进程的 PATH 搜索不可靠，ffmpeg `FileNotFoundError` | `FFMPEG_BIN` 环境变量或 PATH 里放绝对路径 |
| 整段渲 1488 帧 Chromium 内存累积爆掉 | 分 3 段各 496 帧渲，再 concat 流复制合并 |
| 目录/文件名含中文，`http.server` 下资源 404 | 入口与素材全 ASCII；中文只进画面与文案 |
| 语速超标（tempo >1.30）配音变尖利 | 文案阶段按 5.5 字/秒估算；每句 ≤14 字 |
| `index.html` 不带参数打开报一堆 404 | 默认 `eras.js` 是「艺术史速通」gallery 片（15 个时代 + 2026），其 `scenes/01_cave.js` 等艺术史 demo 场景**未随本仓库附带**（属「穿越名画」支线）。看三国片请用 `?film=<名>`（如 `index.html?film=xuhuang`），41 部任选 |
| 字体 404 被 `U.loadCmaps` 记 console.error，render.py 当失败退出 | `engine/lib/fonts/` 已收齐 `fonts.js` FONT_FACES 表全部 48 个字体（约 16MB，均 OFL/开源许可）；若自行删减小字体，记得同步删 FONT_FACES 条目 |

## 目录

```
sanguo-ink-motion/
├── engine/
│   ├── engine.js            # 帧引擎（节拍网格、段落调度、renderFrame API）
│   ├── index.html           # 本地预览入口（?film=<名>）
│   ├── clip.html / clip.js  # 参数化片段入口（口播管线动画段）
│   ├── eras.js              # 默认段落表
│   ├── eras_<名>.js ×40     # 41 部片（含甄后敦煌重渲版）
│   ├── transitions.js       # 幕间转场
│   ├── lib/                 # 工具库：brush(干笔) paint(平涂) rig(人物) fonts(霞鹜文楷) 等 18 个
│   │   └── fonts/           # LXGWWenKai-500.woff（SIL OFL，见 fonts/LICENSES.md）
│   └── scenes/              # 249 个：40 组「前缀×8幕 + common」+ 共享库
├── pipeline/
│   ├── render.py            # 逐帧渲染（Playwright → image2pipe → ffmpeg）
│   ├── build_voice.py       # 配音字幕（edge-tts 通道）
│   ├── build_voice_winrt.py # 配音字幕（系统 TTS 通道，离线）
│   ├── prepare_channels.py  # 发布门禁 + 待发箱打包
│   ├── fill_lines.py        # 台词回填工具
│   └── qa/                  # 静态检查 ×4
├── data/                    # lines_*.json ×38（台词轴：id/t0/t1/text）
├── publish/
│   ├── 上传台.html           # 本地上传台（自包含单文件，复制路径/文案、已发跟踪）
│   └── 发布元数据.json       # 41 部元数据（标题/描述/话题/封面时刻/门禁状态）
└── docs/                    # 方法论四篇
```

## 41 部人物（截至 2026-10）

吕布 · 貂蝉 · 关羽 · 张飞 · 刘备 · 诸葛亮 · 曹操 · 周瑜 · 司马懿 · 孙权 · 常山赵子龙 · 老将黄忠 · 锦马超 · 典韦 · 许褚 · 姜维 · 太史慈 · 于禁 · 荀彧 · 陈宫 · 田丰 · 祢衡 · 庞德 · 魏延 · 法正 · 满宠 · 许靖 · 蔡文姬 · 王异 · 甄后 · 甄后·敦煌 · 辛宪英 · 左慈 · 于吉 · 管辂 · 华佗 · 徐晃 · 张昭 · 吕蒙 · 陆逊 · 三国：一口气讲完

> 以 `publish/发布元数据.json` 的 `films` 为权威清单。

## 许可

- 代码：MIT（版权 © 2026 dabing110）
- 台词与场景代码：原创
- 《三国演义》原著：公共领域
- 字体：LXGW WenKai，SIL OFL 1.1（见 `engine/lib/fonts/LICENSES.md`）
- **TTS 服务条款提示**：`build_voice.py` 使用 edge-tts（调用微软 Edge 在线 TTS 服务），使用前请自行确认微软服务条款对你的场景可用；完全离线场景请用 `build_voice_winrt.py`（系统 TTS）。

## 致谢

水墨笔法库的「干笔 + 平涂 + 描边」混合画法，来自对《三国演义》连环画与现代水墨动画的长期观察；工程结构受「确定性渲染」思想影响（同 t 必同帧，QA 才能回归）。
