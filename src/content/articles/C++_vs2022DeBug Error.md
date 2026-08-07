---
title: C++_vs2022DeBug Error
date: '2022-9-26 20:28'
tag:
  - C++
category:
  - 编程日志
  - C&C++
abbrlink: 3bb17c40
---



![img](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/MIV5KC1_8NWP%7DDPB%7BUV%60QPC.png)

这是由于从堆中释放空间内存之后，没有申请开辟，却又对那块空间执行了操作（包括再次释放