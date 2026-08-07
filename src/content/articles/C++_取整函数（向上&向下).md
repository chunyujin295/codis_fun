---
title: C++_取整函数
date: '2022-11-6 11:37'
tag:
  - C++
category:
  - 编程日志
  - C&C++
abbrlink: d3194531
---



### C++取整函数

##### 都包含在头文件cmath中

#include<cmath>



##### 向上取整：ceil()

画图很好理解

无论是整数还是负数，向上取整就是向上(x轴正方向)找距离最近的整数

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202211061133486.jpeg" alt="IMG_0725" style="zoom:50%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202211061133405.jpeg" alt="IMG_0726" style="zoom:50%;" />

> ceil(1.3)
>
> 结果是2
>
> ceil(-1.2)
>
> 结果是-1



##### 向下取整：floor()

又叫 “地板算法”

无论是整数还是负数，向上取整就是向下(x轴负方向)找距离最近的整数

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202211061136576.jpeg" alt="IMG_0723" style="zoom:50%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202211061136193.jpeg" alt="IMG_0724" style="zoom:50%;" />

> ceil(1.3)
>
> 结果是1
>
> ceil(-1.2)
>
> 结果是-2

