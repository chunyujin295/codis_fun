---
title: 简单高级播放器-mpv
date: '2025-4-17 00:06'
tag:
  - Anime资源
  - mpv播放器
category:
  - Skill
  - anime-mpv
cover: 'https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/mpv-stats.jpg'
abbrlink: 6e6ef1ed
---

> 教程主要来源： https://vcb-s.com/archives/7594

mpv 是著名开源项目 MPlayer 的分支，因其对最新软硬件平台、视频标准以及各种高画质选项的支持而广受好评，也是目前非 Windows 平台上高画质播放器的不二选择。

由于 mpv 本身没有图形界面，各种设置需要通过手动编写配置文件来完成，使很多不熟悉命令行的普通用户望而却步。本文的主要目的就是为普通用户提供一个 mpv 播放器的上手指南，手把手教你如何把 mpv 用起来。

相比在图形界面中用鼠标勾勾点点，手写配置文件的方式固然不太符合普通用户的习惯，但是“一旦接受了这种设定”，你会逐渐体会到命令行的便利与灵活。

如果你确实需要一个图形界面的 mpv 播放器前端，我们推荐：
– Windows 用户使用 [mpv.net](https://github.com/mpvnet-player/mpv.net)，可以通过[微软商店](https://www.microsoft.com/store/productId/9N64SQZTB3LM)或 [GitHub](https://github.com/mpvnet-player/mpv.net/releases) 获取；
– macOS 用户使用 [IINA](https://iina.io/)，可以直接从[官方网站下载](https://iina.io/download/)。

即使你选择使用以上两款图形界面的 mpv 前端，在配置时仍然可以参考本教程的内容。

# 安装

进入对应官网或者GitHub网站下载release包即可，安装到指定位置

# mpv.net教程

大同小异，详细操作在官方文档都有说明

## **常用快捷键**

`→` 前进 5 秒
`←` 后退 5 秒
`↑` 前进 1 分钟
`↓` 后退 1 分钟
`PageUp` 跳转到下一章节
`PageDown` 跳转到前一章节
`Space` 播放/暂停
`9` 降低音量
`0` 提高音量
`j` 切换字幕
`#` 切换音轨
`m` 开启/关闭静音
`v` 显示/隐藏字幕
`f` 切换全屏/窗口显示
`s` 截图

此外，快捷键 `i` 可以显示当前正在播放的文件的媒体信息以及解码、渲染的相关数据（如下图）。使用 `Shift + i` 则可以让这些信息保持显示或清除，显示时点击数字键 `1`、`2`、`3` 等等可以分别显示信息的第一、二、三……页。

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/mpv-stats.jpg" alt="img" /></center></div>

在完成本文的配置后，你可以打开一个码率较高的视频，按下 Shift + i 观察第一页显示的 Dropped Frames 以及 Mistimed 和 Delayed 这几项计数，如果播放一段时间后这几个数字都保持稳定没有增加，则基本可以确定视频播放没有什么问题了。

## 配置文件

在mpv.net的安装路径下，即`mpvnet.exe`的同级目录下创建目录`portable_config`，里面新建配置文件`mpv.conf`，这是遵循mpv协议的播放器的配置文件，当然，mpv.net软件也可以设置自己的配置文件，不过这应该是前端相关的，与视频流播放设置无关，详细见mpv.net的官方文档

```shell
profile=high-quality 
# 高质量渲染，适用于独立显卡或者较好的显卡 ↑
cscale=catmull_rom 
# 目前（0.37.0-0.38.0 版本）官方的高质量渲染预设会让色度平面的拉伸也使用 ewa_lanczossharp
# 比较浪费资源，所以我们再加一行 ↑
deband=yes 
# 色带是非常常见的视频压缩瑕疵。默认启用去色带是利大于弊的 ↑
icc-profile-auto=yes
# 色彩管理开启 ↑
blend-subtitles=video 
# 设置将字幕渲染到视频源分辨率并随视频一起缩放并进行色彩管理，这样可以保证字幕的分辨率与画面始终一致（避免“画面模糊字幕高清”的情况）
# 并保证字幕中“屏幕字”的颜色与画面一致 ↑
video-sync=display-resample
interpolation=yes
tscale=oversample
# 很多时候，我们的显示器刷新率不是片源帧率的整数倍（例如显示器刷新率通常为 60 Hz 而动画通常为 23.976 fps
# 此时在默认设置下会因每一帧实际在屏幕上的呈现时间不均等而造成卡顿感（俗称 3:2 pull down judder）。
# 因此，建议启用 interpolation 来消除这个问题（此功能非常类似于 madVR 中的 smooth motion） ↑
sub-auto=fuzzy
# 中文字幕组经常会在外挂字幕的文件名中用 chs/cht/sc/tc/gb/big5 等标记来区分简体或繁体字幕。
# 这些“非标准”的写法不会被 mpv 识别为语言标记
# 因此 mpv 默认不会自动加载这些字幕文件。如果想让 mpv 能自动识别并加载这些外挂字幕的话 ↑
```

