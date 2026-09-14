---
title: Windows下C盘爆满，可以试试转移chrome浏览器缓存位置
date: '2026-09-14 08:56'
tag:
  - Windows C盘爆满
  - Chrmoe占用C盘
category:
  - Skill
  - Windows
cover: false
abbrlink: 
---

迁移缓存文件夹到D盘

1. 关闭所有打开的 Chrome 窗口。
2. 将 C 盘下的 `Cache` 文件夹（路径为 `C:\Users\你的用户名\AppData\Local\Google\Chrome\User Data\Default\Cache`）剪切移动到 D 盘的某个位置（如 `D:\ChromeCache\Cache`）。
3. 使用管理员身份运行命令提示符（CMD），通过符号链接命令将两者绑定：
   `mklink /d "C:\Users\你的用户名\AppData\Local\Google\Chrome\User Data\Default\Cache" "D:\ChromeCache\Cache"` [[1](https://cloud.tencent.com/developer/article/2515655)]