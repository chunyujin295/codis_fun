---
title: lazyvim中fzf添加精确搜索-失败了
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
abbrlink: ab146e5a
---

fzf本身支持通过添加选项的方式精确搜索，但是fzf被集成进lazyvim之后没办法通过添加选项的方式来启动精确搜索了，但是可以通过配置快捷键来解决这个问题。

进入到lazyvim的配置目录nvim中

> windows下在`C:/用户/用户名/AppData/Local/nvim`，Linux在`~/.config/nvim`

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208212053166.png" alt="image-20250208212053166"  /><br>nvim目录树结构</center></div>

`init.lua`是neovim加载的最初始的文件，neovim是自动加载机制，lua文件夹下的所有.lua文件都会被识别和运行到。为了项目结构的优良性，我们在config文件夹新建`fzf.lua`用来增加fzf的精确搜索快捷键设置：

(这个配置有问题，但是大概就是这么个配置流程)

```lua
local fzf = require("fzf-lua")

vim.keymap.set("n", "<leader>fp", function()
  fzf.fzf({ exact = true })
end, { desc = "精确搜索" })
```

然后在init.lua引用该模块

```lua
-- config是指lua下的config文件夹，下的fzf.lua
-- 如果lua下没有文件夹，只有一级，那么就直接是require("fzf")
require(config.fzf)
```

> neovim的lua配置与使用流程后期会出一个新的教程，目前上面的配置过程参考的[姜绍彬的博客](https://shaobin-jiang.github.io/blog/posts/neovim-beginner-guide/04/)