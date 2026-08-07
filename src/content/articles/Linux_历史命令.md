---
title: Linux_历史命令
date: '2022-12-12 14:10'
tag: Linux
category: Linux
abbrlink: 6694219c
---
### Linux会保存用户的历史指令

历史指令保存在用户目录下的.bash_history文件(历史记录文件)中，并且每条指令都用时间戳的形式记录了执行时刻

当用户通过shell进入Linux系统时，Linux系统会先将.bash_history中的保存的之前的历史指令读取到历史记录缓存区中，在用户正常退出shell之前，执行的所有指令也会先记录在缓存区中，当用户正常退出shell(exit或者control+d)时，shell进程会自动将历史记录缓存区中的所有历史记录写入到.bash_history中

![image-20221209114140665](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221209114140665.png)

#### 查看历史缓冲区

```shell
history #查看历史记录缓存区中保存的历史指令
```

> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/QQ%E6%88%AA%E5%9B%BE20221209112431.png" alt="QQ截图20221209112431"  />
>
> 从最开始到现在为止
>
> ![](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/QQ%E6%88%AA%E5%9B%BE20221209112449.png)

##### 通过键盘上下键快捷查看历史缓冲区

![QQ录屏20221209120917](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/QQ%E5%BD%95%E5%B1%8F20221209120917.gif)

##### 定量查看历史缓冲区的历史指令

```shell
history <数字> #查看缓冲区中最近的n条历史指令
```

![image-20221209172316597](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221209172316597.png)

#### 手动写入.bash_history

如果执行了几条指令，比如执行两次`ls`和`ll`，查看一下历史缓存区

![image-20221209115827151](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221209115827151.png)

再查看.bash_history，发现没有记录在里面，因为历史记录保存在了历史缓存区，当退出shell的时候才会自动从缓存区写入.bash_history

![](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221209115907240.png)

```shell
history -w #手动将历史缓存写入用户目录下的.bash_history
```

正常情况下，只有在 Shell 正常退出时，才会将缓冲区内容保存到.bash_history。如果想主动保存缓冲区的历史记录，执行 `-w` 选项即可

![image-20221209120133565](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221209120133565.png)

#### 清除历史缓冲区

```shell
history -c #清除历史缓冲区
```

历史缓冲区写入.bash_history其实就是用新内容覆盖掉原有内容，所以清除历史缓冲区就是清除本次登录用户时的所有操作的记录，不会删除之前的历史记录

#### 重复执行缓冲区历史指令

```shell
!<数字> #重复执行缓冲区中的第n条历史指令
```

![image-20221209173229978](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221209173229978.png)

~~~shell
!-<数字> #重复执行缓冲区中倒数第n行历史指令
~~~

![image-20221209174342766](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221209174342766.png)

~~~shell
!! #重复执行上一条命令
~~~

![image-20221209174410518](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221209174410518.png)

#### 搜索历史命令

```shell
快捷键：ctrl + r	# 输入残缺指令，搜索对应完整历史指令
```

![Dec-12-2022 13-56-09](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202212121356384.gif)