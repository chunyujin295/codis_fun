---
title: 宏实现#pragma once&#ifndef
date: '2023-1-3 13:59'
tag:
  - C++
  - C
category:
  - 编程日志
  - C&C++
abbrlink: 5f33e850
---

为了避免同一个头文件被包含(include)多次，C/C++中有两种宏实现的方式：一种是#pragma once方式

一种是#ifndef的方式

有些编译器只支持其中的一种。

在能够支持这两种方式的编译器是，两者并没有太大的区别，但是两者仍然有一些细微的区别。

[#pragma once用法](https://blog.csdn.net/qq_43907537/article/details/107938459?ops_request_misc=&request_id=&biz_id=102&utm_term=?ops_request_misc=&request_id=&biz_id=102&utm_term=&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-2-107938459.nonecase&spm=1018.2226.3001.4187#pragma%20once&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-2-107938459.nonecase)

[#ifndef, #define, #endif 理解](https://blog.csdn.net/qq_35027690/article/details/125865367)