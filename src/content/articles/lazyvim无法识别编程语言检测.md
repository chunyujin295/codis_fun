---
title: lazyvim无法识别编程语言检测
date: '2025-5-31 17:00'
tag:
  - neovim
category:
  - Skill
  - (˘•ω•˘)
  - neovim
  - 问题解决
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/PixPin_2025-05-31_17-14-15.png
abbrlink: 57e65ccd
---
![image-20250210030622683](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250210030622683.png)

[执行 lua 时出错无法加载解析器：uv_dlopen：cpp.so 不是有效的 Win32 应用程序。·问题 #1985 ·nvim-treesitter/nvim-treesitter --- Error executing lua Failed to load parser: uv_dlopen: cpp.so is not a valid Win32 application. · Issue #1985 · nvim-treesitter/nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter/issues/1985)

![image-20250210030642442](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250210030642442.png)

[Windows 支持 ·nvim-treesitter/nvim-treesitter 维基 --- Windows support · nvim-treesitter/nvim-treesitter Wiki](https://github.com/nvim-treesitter/nvim-treesitter/wiki/Windows-support)

里面给出了通过配置lua来解决问题的方法

但是有一个致命的问题就是我不懂lua语言，因此不知道配置文件应该怎么配置，所以当务之急就是学习lua语言