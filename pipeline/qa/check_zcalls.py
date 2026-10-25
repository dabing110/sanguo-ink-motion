#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""体检：① Z.xxx( 调用的第一个实参必须是 c（漏传 ctx 会抛 c.save is not a function）；
② 引用的道具必须在 SCENE_LIBS 指定的库里有定义（否则 undefined is not a function）。
用法: python check_zcalls.py wy   |   python check_zcalls.py cj
"""
import os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SCENES = os.path.join(ROOT, 'scenes')

LIBS = {
    'wy': ['z_common.js', 'w_common.js', 'wy_common.js'],
    'cj': ['z_common.js', 'w_common.js', 'cj_common.js'],
    'xn': ['z_common.js', 'w_common.js', 'xn_common.js'],
    'ht': ['z_common.js', 'w_common.js', 'ht_common.js'],
    'u':  ['z_common.js', 'w_common.js', 'u_common.js'],
    'zf': ['z_common.js', 'w_common.js', 'zf_common.js'],
    'dh': ['z_common.js', 'dh_common.js'],
}

DEF = re.compile(r'^Z\.([A-Za-z0-9_]+)\s*=', re.M)
CALL = re.compile(r'\bZ\.([A-Za-z0-9_]+)\s*\(')
# 这些不吃 ctx：Z.paper 返回缓存画布，本就不传 c
NO_CTX = {'paper'}


def main():
    prefix = sys.argv[1] if len(sys.argv) > 1 else 'wy'
    libs = LIBS.get(prefix, LIBS['wy'])
    defined = set()
    for lb in libs:
        p = os.path.join(SCENES, lb)
        if not os.path.exists(p):
            print('  [warn] lib missing:', lb)
            continue
        for m in DEF.finditer(open(p, encoding='utf-8').read()):
            defined.add(m.group(1))

    files = [f for f in sorted(os.listdir(SCENES))
             if f.startswith(prefix) and f.endswith('.js') and f not in libs]
    bad_ctx, bad_def = [], []
    for f in files:
        src = open(os.path.join(SCENES, f), encoding='utf-8').read()
        for m in CALL.finditer(src):
            name = m.group(1)
            # 取调用括号内的第一个顶层实参
            j = m.end()
            depth, i, n = 1, j, len(src)
            q = None
            while i < n and depth > 0:
                ch = src[i]
                if q:
                    if ch == '\\':
                        i += 2
                        continue
                    if ch == q:
                        q = None
                    i += 1
                    continue
                if ch in '\'"`':
                    q = ch
                elif ch in '([{':
                    depth += 1
                elif ch in ')]}':
                    depth -= 1
                i += 1
            body = src[j:i - 1].strip()
            first = re.split(r',(?![^()\[\]{}]*[)\]}])', body)[0].strip() if body else ''
            # 允许：c / c2 / g / cc 这类上下文变量；其余视为可疑（Z.paper 例外）
            if name in NO_CTX:
                continue
            if first and not re.fullmatch(r'c\d*|g\b|cc\b|ctx\b', first):
                bad_ctx.append((f, src.count('\n', 0, m.start()) + 1, name, first[:40]))
            if name not in defined:
                bad_def.append((f, src.count('\n', 0, m.start()) + 1, name))

    print('=== 道具定义库:', ', '.join(libs), '（%d 个道具）' % len(defined))
    print('=== ① 第一个实参是否是 ctx ===')
    if not bad_ctx:
        print('OK')
    for f, ln, name, first in bad_ctx:
        print('  %s:%d  Z.%s( 首参 = %r' % (f, ln, name, first))
    print('=== ② 道具是否已在库里定义 ===')
    if not bad_def:
        print('OK')
    seen = set()
    for f, ln, name in bad_def:
        if (f, name) in seen:
            continue
        seen.add((f, name))
        print('  %s:%d  Z.%s 未定义' % (f, ln, name))
    return 1 if (bad_ctx or bad_def) else 0


if __name__ == '__main__':
    sys.exit(main())
