---
title: 一个例子简单学习gcc、makefile、程序执行过程
date: '2023-9-7 12:00'
tag: Linux
category: Linux
cover: 'https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202309071215675.jpg'
abbrlink: dbf58e01
---

test.h

```c
#pragma once

#include<stdio.h>

//函数的声明
extern void show();
```

test.c

```c
#include "test.h"

void show()
{
  printf("hello");
}
```

main.c

```c
#include "test.h"

int main()
{
	show();
  
	return 0;
}
```



形成main.c的可执行程序hello：

```shell
gcc -o hello main.c test.c
```

> 注意：
>
> 1. -o选项后面紧跟着的名称为可执行程序的名称，-o + ”可执行程序名称“可以出现在依赖对象的前面，也可以在后面。比如`gcc main.c test.c -o hello`也是可以的
> 2. gcc指令用于编译形成.c文件的可执行程序。g++指令用于编译形成.cpp或者.c文件的可执行程序。g++向下兼容，但是gcc只能编译.c文件。g++的大部分指令与gcc一致



这里可能会产生疑问：test.h里包含了show方法的声明，为什么不依赖这个头文件呢

因为头文件在预处理阶段已经在main.c 和test.c 里面展开了



makefile写法：
```shell
#makefile
hello:main.c test.c 
	gcc main.c test.c -o hello #此处开头一定是缩进
	
.PHONY:clean
clean:
	rm -f hello
```



> 1. makefile文件是自顶向下执行的，只执行第一个行程目标文件的依赖方法
> 2. 在makefile中，hello是目标文件，第一行的main.c 和test.c 为目标文件的依赖文件（依赖对象），`hello:main.c test.c `为二者的依赖关系，`gcc main.c test.c -o hello`为依赖方法
> 3. 倒数第二行中，`clean:`也为一个依赖关系，依赖关系是可以没有依赖对象的，这个就没有。`.PHONY`为makefile里的一个关键字，作用是使后面的方法“总是被执行”
>    1. 每个文件都有三个时间：ACM时间
>       1. A(ACCESS)：访问时间（读取时间）。在文件的操作中，读取是最频繁的（文件夹也属于文件），在Linux内核2.6、2.7之前，文件的每次访问都会刷新ACCESS时间，因此每次会消耗大量资源来复写文件ACCESS时间，效率极低。在更新之后，文件访问次数每次累计到一定值才会更新ACCESS时间为最后一次访问时间。
>       2. C(CHANGE)：改动时间。文件内容被修改的最后一次时间。
>       3. M(MODIFY)：更改时间。文件属性被修改的最后一次时间。文件大小、名称、权限等等都属于文件属性，所以文件内容的修改有时候也会影响文件属性，比如文件内容增多文件大小变大。
>       4. 三个时间在系统下的显示顺序是A、M、C，指令`stat 文件`查看文件信息：
>       
>          <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202309071221082.png" alt="截屏2023-09-07 12.20.28" style="zoom:50%;" />
>    2. 一定是源文件先存在，然后通过编译，形成可执行程序，因此源文件M时间一定早于可执行程序M时间。如果源文件M时间早于可执行程序M时间，此时再进行编译，是不会产生新的可执行程序覆盖原可执行程序的，因为认为源文件没有改动，没必要重新生成可执行程序。当源文件更改之后，M时间会更新，肯定比原可执行程序新，此时再次进行编译，系统比对两者M时间之后发现源文件更新，因此会生成新的可执行程序覆盖原可执行程序。
>    3. “总是被执行”的意义就在于，无论依赖对象的M时间是否早于目标文件，都会执行依赖方法。因此`.PHONY:clean`作用就是无论可执行程序hello的新旧、是否存在，总是会执行`rm -f hello`来删除掉hello
> 4. 指令`make`来执行makefile里的生成可执行程序的依赖方法。指令`make clean`来执行makefile里面删除hello的方法



c、cpp程序执行过程：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202309071236125.png" alt="截屏2023-09-07 12.35.10" style="zoom: 33%;" />

.c .h **预处理**（头文件展开等） 形成.i  

> gcc指令为`gcc -E test.h test.c`，可以加-o选项指定生成的名称，默认名称跟.c文件的名称一样，下同

**编译**形成 .s汇编文件

> gcc指令为`gcc -S test.i`

**汇编**形成 .o二进制文件（目标文件）

> gcc指令为`gcc -c test.s`
>
> 此处“目标文件”含义和上面makefile中的“目标文件”含义不同，makefile中的含义是目标要形成的文件，而此处的名字就叫做”目标文件“

（与库文件）**链接**形成 -out可执行程序

> gcc指令为`gcc test.s`，默认生成文件名称为a.out，可以加-o选项指定名称，名称可不加.out后缀

> 文件后缀的记忆方法：iso 
>
> gcc指令的记忆方法：ESc，c是小写

注意，gcc指令是的含义是”进行到这一步为止“，因此每步的gcc指令并不依赖上一步的生成的文件

比如可以直接令.c文件进行到汇编结束，生成.o文件`gcc -c test.c`

或者直接.c文件生成可执行程序`gcc test.c`



在一般的编译器下，会保留生成.o目标文件，然后将目标文件统一链接形成可执行文件

几个.c源文件就会生成几个.o目标文件

如果想要在makefile中，先形成.o目标文件，然后再链接形成可执行文件，写法为：

```shell
hello:test.o main.o
	gcc test.o main.o -o hello
test.o:test.c
	gcc -c test.c
main.o:main.c
	gcc -c main.c
	
.PHONY:clean
clean:
	rm -f *.o hello
```

> 1. makefile自顶向下执行，在执行第一条的时候，找不到依赖的.o文件，会向下执行和寻找
> 2. clean此处使用了通配符*，删除当前目录下所有.o结尾的文件



更多内容查看[“Makefile初学指南”](https://chunyujin.top/chunyujin/81144cba)