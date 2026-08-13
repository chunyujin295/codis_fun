#!/usr/bin/env python3
"""从站点源码提取字符集，生成 LXGW WenKai 字体的 woff2 子集。

用法：
    python3 scripts/subset-font.py

依赖 fonttools + brotli（pip install --break-system-packages fonttools brotli）。
当新增文章用到了当前子集之外的汉字时，重新运行本脚本即可更新字体。
"""
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_FONT = os.path.join(ROOT, "src", "font", "LXGWWenKai-Medium.ttf")
OUT_FONT = os.path.join(ROOT, "public", "fonts", "LXGWWenKai-Medium.woff2")

SCAN_DIRS = ["src/content", "src/pages", "src/components", "src/layouts", "src/lib", "src/styles"]
EXTENSIONS = {".md", ".astro", ".ts", ".css", ".mjs", ".json"}


def collect_chars() -> set[str]:
    chars: set[str] = set()
    for rel in SCAN_DIRS:
        base = os.path.join(ROOT, rel)
        for dp, _dn, fns in os.walk(base):
            for fn in fns:
                if os.path.splitext(fn)[1] not in EXTENSIONS:
                    continue
                path = os.path.join(dp, fn)
                try:
                    text = open(path, encoding="utf-8").read()
                except OSError:
                    continue
                chars.update(text)
    # 可打印 ASCII 兜底
    for c in range(0x20, 0x7F):
        chars.add(chr(c))
    return chars


def gb2312_level1() -> set[str]:
    """GB2312 一级常用汉字（区位 16-55，共 3755 字）。"""
    chars: set[str] = set()
    for q in range(16, 56):
        for w in range(1, 95):
            try:
                chars.add(bytes([0xA0 + q, 0xA0 + w]).decode("gb2312"))
            except UnicodeDecodeError:
                continue
    return chars


def main() -> int:
    if not os.path.exists(SRC_FONT):
        print(f"源字体不存在: {SRC_FONT}", file=sys.stderr)
        return 1

    chars = collect_chars() | gb2312_level1()
    text_file = "/tmp/subset-font-chars.txt"
    with open(text_file, "w", encoding="utf-8") as f:
        f.write("".join(sorted(chars)))

    os.makedirs(os.path.dirname(OUT_FONT), exist_ok=True)
    cmd = [
        "pyftsubset", SRC_FONT,
        f"--text-file={text_file}",
        f"--output-file={OUT_FONT}",
        "--flavor=woff2",
        "--layout-features=*",
        "--no-hinting",
    ]
    print(f"子集化 {len(chars)} 个字符 -> {OUT_FONT}")
    try:
        subprocess.run(cmd, check=True)
    except FileNotFoundError:
        print("未找到 pyftsubset，请先安装: pip install --break-system-packages fonttools brotli", file=sys.stderr)
        return 1

    size = os.path.getsize(OUT_FONT)
    print(f"完成: {size / 1024:.0f} KiB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
