---
title: 回车vs换行
date: '2023-9-7 17:00'
tag:
  - Linux
category:
  - 编程日志
  - Linux
abbrlink: 70e96f28
---

# 回车vs换行

回车和换行都只是一个单纯的动作

回车：光标移动到当前行的最开始 \r

换行：光标保持当前位置，仅向下平移一行 \n

> 回车：
>
> ![Sep-07-2023 16-55-14](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202309071656179.gif)
>
> 换行：
>
> ![Sep-07-2023 16-55-51](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202309071656462.gif)



我们平时说的“回车”或者“换行”，以及C语言中的换行符“\n”，其实是 回车+换行   \r+\n

就是先回车后换行：先移动到当前行的最开始，再移动到下一行

或者先换行后回车：先移动到下一行，再移动到最开始

> ![Sep-07-2023 16-58-34](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202309071658062.gif)



C语言中\n会清空缓冲区
