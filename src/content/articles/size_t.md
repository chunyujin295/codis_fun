---
title: size_t
date: '2022-12-2 15:35'
tag:
  - C++
category:
  - 编程日志
  - C&C++
abbrlink: 8883767d
---



size_t在各种头文件中都有定义

> <stddef.h>, <stdio.h>, <stdlib.h>, <string.h>, <time.h>, <wchar.h>



size_t类型表示C中==任何对象能达到的最大长度==，它是无符号整数数据类型

size_t并不是一个具体的大小的数据，而是要看系统，系统的对象长度最大为多少，size_t的大小就是多少。所以size_t类型方便在于系统之间移植使用。

比如在32位系统上，size_t类型就是 unsgned int 类型的typedf（即别名），也就是32位无符号整数；在64位系统上，size_t类型被定义为unsigned long long的typedef。

通常在用做下标或者长度变量时建议使用size_t，因为它始终是无符号的数。