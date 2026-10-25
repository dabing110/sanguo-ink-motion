#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把五部新片的旁白填进 lines_*.json 模板。"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.abspath(os.path.join(HERE, '..', 'data'))   # 仓库布局：pipeline/fill_lines.py，台词轴在 data/lines_*.json

TEXT = {
    "xunyu": {
        "x1_zifang": "荀彧，字文若，颍川人。",
        "x2_fengtian": "迎天子都许，以令诸侯。",
        "x3_chizhong": "每征伐在外，常居中持重。",
        "x4_yidu": "官渡一书，谏止退兵。",
        "x5_juxian": "前后所举，皆命世大才。",
        "x6_buyi": "谏九锡之议，曰不宜如此。",
        "x7_konghe": "馈食空器，以忧而薨。",
        "x8_sanrixiang": "荀令留香，谥曰敬侯。",
    },
    "chengong": {
        "c1_zhongmu": "中牟释曹，弃官相从。",
        "c2_mingshi": "说邈迎操，领兖州牧。",
        "c3_puyang": "叛操迎布，据濮阳火起。",
        "c4_xiance": "佐布画策，下邳相拒。",
        "c5_guancheng": "操决泗沂，水灌下邳。",
        "c6_danzuo": "白门楼上，但坐此人。",
        "c7_buhuangu": "请出就戮，引颈不还顾。",
        "c8_shenhou": "操养其母，嫁其女。",
    },
    "tianfeng": {
        "f1_jizhou": "田丰，钜鹿人，天姿瑰杰。",
        "f2_jibuke": "劝绍袭许，绍以子病辞。",
        "f3_kenjian": "谏宜久持，绍怒械系之。",
        "f4_yuzhong": "囹圄之中，静待官渡。",
        "f5_guandu": "乌巢火起，绍军大溃。",
        "f6_fuzhang": "逢纪进谮，抚掌大笑。",
        "f7_sizhi": "绍惭其言，遂害田丰。",
        "f8_qianqiu": "不用吾言，果为所笑。",
    },
    "miheng": {
        "n1_fuping": "祢衡，平原般人，少有才辩。",
        "n2_kuangbing": "称狂不往，傲视许都。",
        "n3_gushi": "操录鼓史，欲以贱辱之。",
        "n4_yuyang": "渔阳掺挝，声节殊妙。",
        "n5_fanru": "徐脱衣褐，颜色不怍。",
        "n6_yingwu": "揽笔作赋，文无加点。",
        "n7_mazuo": "出言不逊，骂座而死。",
        "n8_yingwuzhou": "葬于江渚，名鹦鹉洲。",
    },
    "pangde": {
        "p1_naan": "庞德，南安狟道人。",
        "p2_zhanyuan": "为军锋，亲斩郭援。",
        "p3_baima": "常乘白马，射羽中额。",
        "p4_gewei": "随众降魏，拜立义将。",
        "p5_dizhan": "避水上堤，箭不虚发。",
        "p6_beifu": "水盛船覆，立而不跪。",
        "p7_guogui": "宁为国家鬼，不为贼将。",
        "p8_zhuanghou": "太祖流涕，谥曰壮侯。",
    },
}

for film, d in TEXT.items():
    p = os.path.join(DATA, f"lines_{film}.json")
    cfg = json.load(open(p, encoding="utf-8"))
    for ln in cfg["lines"]:
        ln["text"] = d[ln["id"]]
    json.dump(cfg, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"{film}: 已填 {len(cfg['lines'])} 句")
