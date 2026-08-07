---
title: lazyvim进入可视模式&添加注释
date: '2025-5-31 17:00'
tag:
  - neovim
category:
  - Skill
  - (˘•ω•˘)
  - neovim
  - 配置及使用
  - lazyvim
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/PixPin_2025-05-31_17-14-15.png
abbrlink: 7d138d2e
---

# 进入可视模式

`<leader>v`查看可视模式快捷键：

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250210112914602.png" alt="image-20250210112914602" style="zoom:80%;" /></center></div>

小写v进入字符可视模式，可以使用方向键选择操作的字符

大写V进入行可视模式，可以使用上下选择操作的行

ctrl+v进入块可视模式，在这种模式下，你可以选择一个矩形区域的文本，适合进行批量编辑。

进入可视模式后，你可以执行各种操作，如复制（`y`）、剪切（`d`）、粘贴（`p`）等。

> 进入可视模式不需要使用`<leader>`，比如直接大写V就能进入行可视模式（这是vim的功能，neovim就是对这个的继承）

# 注释

按下g查看相关快捷键：

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250210115038077.png" alt="image-20250210115038077" style="zoom:80%;" /></center></div>

c是注释，再按下查看注释相关快捷键：

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250210130106425.png" alt="image-20250210130106425" style="zoom:80%;" /></center></div>

## 通常使用方法

普通模式下快捷键`gcc`为当前行添加注释

也可以进入可视模式，比如`V`进入块可视模式，然后选中几行，`gc`全部注释

取消注释使用相同的命令

注释字符会根据当前文件编程语言自动生成匹配