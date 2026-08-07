---
title: C++_delete和free
date: '2022-10-10 19:06'
tag:
  - C++
category:
  - 编程日志
  - C&C++
abbrlink: 92cc59a4
---



C++中堆区开辟和释放动态内存多用 new 和delete

~~~cpp
int *x=new int(3);
int *y=new int[10];
delete x;
delete []y;
~~~

C中多用 malloc 和 free

```c
int *x=(int *)malloc(sizeof(int));
int *y=(int *)malloc(sizeof(int)*10);
free(x);
free(y);
```

以上两段代码，除了new的时候可以进行初始化之外，作用都是一样的