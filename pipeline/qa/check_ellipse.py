#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""批量体检：① node --check 语法；② Canvas ellipse() 必须是 7 参数（6 个顶层逗号）。
用法: python check_ellipse.py wy   （参数＝文件名前缀，如 wy / xn / ht）"""
import os, re, subprocess, sys, glob, shutil

# node 可执行文件：环境变量 NODE_BIN → PATH 搜索 → 常见本机路径兜底
NODE = os.environ.get("NODE_BIN") or shutil.which("node") or r"node.exe"
ROOT = os.path.dirname(os.path.abspath(__file__))
SCENES = os.path.abspath(os.path.join(ROOT, '..', '..', 'engine', 'scenes'))


def top_level_commas(s):
    """返回括号串内顶层逗号的位置（跳过嵌套括号/引号）。"""
    depth, out, i, n = 0, [], 0, len(s)
    q = None
    while i < n:
        ch = s[i]
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
            i += 1
            continue
        if ch in '([{':
            depth += 1
        elif ch in ')]}':
            depth -= 1
        elif ch == ',' and depth == 1:
            out.append(i)
        i += 1
    return out


def scan(path):
    """返回 [(lineno, nargs)] —— nargs != 7 的 ellipse 调用。"""
    src = open(path, encoding='utf-8').read()
    bad = []
    for m in re.finditer(r'\.ellipse\s*\(', src):
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
        body = src[j:i - 1]
        commas = len(top_level_commas('(' + body + ')'))
        if commas + 1 != 7:
            bad.append((src.count('\n', 0, m.start()) + 1, commas + 1))
    return bad


def main():
    prefix = sys.argv[1] if len(sys.argv) > 1 else 'wy'
    files = [os.path.join(SCENES, f) for f in sorted(os.listdir(SCENES))
             if f.startswith(prefix) and f.endswith('.js')]
    if not files:
        print('no files for prefix %r' % prefix)
        return 1
    bad_syntax, bad_args = [], []
    for f in files:
        r = subprocess.run([NODE, '--check', f], capture_output=True, text=True)
        if r.returncode:
            bad_syntax.append((os.path.basename(f), r.stderr.strip().splitlines()[:4]))
        for ln, na in scan(f):
            bad_args.append((os.path.basename(f), ln, na))
    print('=== node --check ===')
    print('OK (%d files)' % len(files) if not bad_syntax else 'FAIL:')
    for name, err in bad_syntax:
        print(' ', name)
        for e in err:
            print('    ', e)
    print('=== ellipse() 7 参数 ===')
    if not bad_args:
        print('OK (0 bad calls)')
    for name, ln, na in bad_args:
        print('  %s:%d  -> %d args (need 7)' % (name, ln, na))
    return 1 if (bad_syntax or bad_args) else 0


if __name__ == '__main__':
    sys.exit(main())
