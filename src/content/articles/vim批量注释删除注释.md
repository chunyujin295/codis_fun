---
title: vim批量注释/删除注释
date: '2023-9-24 17:20'
tag:
  - CentOS
  - Linux
category:
  - Skill
  - Linux
abbrlink: ebc9f1b9
sticky:
---

# vim批量注释/删除注释

注释：

1. control + v 进入 V-BLOCK模式（可视化块模式）

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202309241717010.png" alt="1" style="zoom: 33%;" />

2. 使用上下（k、j）移动选定要注释的行【左右（h、l）则是选择列】

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202309241717087.png" alt="2" style="zoom: 33%;" />

3. shift + i （大写i）进入插入模式

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202309241717530.png" alt="3" style="zoom:33%;" />

4. 输入注释符 // 或 #

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202309241718984.png" alt="4" style="zoom:33%;" />

5. 连续按两次ESC，完成

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202309241718806.png" alt="5" style="zoom:33%;" />

删除注释：

1. control + v 进入 V-BLOCK模式（可视化块模式）

2. 使用上下（k、j）移动选定要注释的行，如果注释为 //，则使用左右（h、l）选择两列

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202309241718058.png" alt="6" style="zoom:33%;" />

3. d，删除注释

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202309241718849.png" alt="7" style="zoom:33%;" />