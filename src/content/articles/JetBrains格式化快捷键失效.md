---
title: JetBrains格式化快捷键失效
date: '2024-10-29 14:22'
tag:
  - JetBrains
category:
  - Skill
  - IDE
  - JetBrains
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029141651977.png
abbrlink: d0053c4b
sticky:
---

今天使用CLion的时候发现代码格式化的快捷键ctrl + alt + L 失效了，很奇怪，一开始以为是因为远程连接Linux开发的时候会失去这个功能，但是想了想，代码自动提示都有，这种格式化的功能应该也是具有的，所以查看了一下快捷键是否冲突。

使用工具[OpenArk - Opensource Anti Rootkit](https://openark.blackint3.com/)

[Windows查看进程中的快捷键是否冲突](https://chunyujin.top/chunyujin/e43a59fb)

发现QQ的锁定快捷键与其冲突：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029141458391.png" alt="image-20241029141458391" />

将快捷键删除即可