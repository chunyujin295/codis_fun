---
title: neovim配置的卸载
date: '2025-5-31 17:00'
tag:
  - neovim
category:
  - Skill
  - (˘•ω•˘)
  - neovim
  - 配置及使用
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/PixPin_2025-05-31_17-14-15.png
abbrlink: b5d0b033
---

如果你想清空所有的neovim配置，比如我此前安装了lazyvim配置，但是现在想要清除掉，获取最原始的neovim，并安装ayamir-nvim的配置，你应该查看此教程。

当然，如果你对原有配置想要备份一下，可以改一下名或者直接使用文件备份

# 删除所有配置

如果你想删除所有的配置，那么：

删除以下内容：

- `~/.config/nvim`（在 Linux 或 MacOS 上）
- `~\AppData\local\nvim`（在 Windows 上）

当然，如何你将nvim安装在了其他地方，你需要自己去删除

为了确保还可以删除以下文件夹：

- `~/.local/share/nvim`（在 Linux 或 MacOS 上）
- `~\AppData\local\nvim-data`（在 Windows 上）

同样，如果你修改了配置文件的保存位置，也应该去对应位置删除

> 可以参考[《修改nvim安装位置以及Windows下修改配置文件保存位置的方式》](https://chunyujin.top/chunyujin/1036c7b0)

# 删除指定配置

但是如果仔细观察，可以发现，其实一台机器上可以同时存在多套配置

例如，根据 [lazy vim 自述文件页面](https://github.com/folke/lazy.nvim)，要卸载 lazy.nvim，需要删除以下文件和目录：

- **data数据**: `~/.local/share/nvim/lazy`
- **state状态**: `~/.local/state/nvim/lazy`
- **lockfile锁定文件**: `~/.config/nvim/lazy-lock.json`

至于关于共存配置的问题，后续我还会再研究，然后在此记录