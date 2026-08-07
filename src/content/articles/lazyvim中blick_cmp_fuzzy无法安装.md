---
title: lazyvim中blick_cmp_fuzzy无法安装
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
abbrlink: 6b20be27
---
<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250210012646986.png" alt="image-20250210012646986" style="zoom:80%;" />

问题讨论：[bug: module 'blink_cmp_fuzzy' not found · Issue #5483 · LazyVim/LazyVim](https://github.com/LazyVim/LazyVim/issues/5483)

这里给出了解决方案：blink_cmp_fuzzy的安装依赖于curl

安装教程：[Curl命令详解-CSDN博客](https://blog.csdn.net/hadues/article/details/101788327)

里面教程图片给错了，curl官网[curl - Download](https://curl.se/download.html)找下载的时候，应该往下拉，找二进制包进行安装，不要安装最顶部的源码包，里面没有可执行程序。

或者直接进这个[curl for Windows](https://curl.se/windows/)

之后bin目录添加到环境变量即可。

检查安装是否成功

```bash
curl --version
```

值得注意的是，power shell对其支持不太好，cmd模式下才生效：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250210013747348.png" alt="image-20250210013747348" style="zoom:80%;" />

[ Blink | LazyVim](https://www.lazyvim.org/extras/coding/blink)

之后我在官网上找到了Blink的启用方法，输入`: LazyExtras`来启用这些额外命令

![image-20250210015514875](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250210015514875.png)

你会进入到启动额外插件的界面，界面提示你按下x键就可以启用下面的未启用的插件，我发现blick相关插件没有启动，另外在上面GitHub讨论上说了cmp相关也需要安装。

于是我就将这些加进去了，并且也加了一些其他的插件。然后回到lazy中update了。之后重启nvim，再update。

最后`:LazyHealth`一下，检查lazyvim的健康。

发现插件装多了确实卡。。。

但是总之算是知道了lazyvim的插件使用流程了，直接去官网查看各种插件，然后回头想用的时候直接`:LazyExtras`下新增，或者进lazy的update进行新增，该安装就去install安装。想配置就按官网去写.lua