---
title: Linux下gdb使用gdb命令时显示找不到文件
date: '2023-9-24 16:00'
tag:
  - CentOS
  - Linux
category:
  - Skill
  - Linux
abbrlink: 174f5f3e
sticky:
---

# Linux下gdb使用gdb命令时显示找不到文件

```shell
报错信息如下：
No symbol table is loaded.  Use the "file" command.
```

原因：在编译时没有使用对应选项生成可调试文件

解决方法：在编译时，在依赖文件前加入 -g选项

更改前makefile的部分内容：

```shell
process: process.c
		gcc -o process process.c
```

更改后：

```shell
process: process.c
		gcc -g process.c -o process
```



> 注意事项，关于 gcc 命令后面文件的顺序问题
>
> 1. -o 选项没有明确要求依赖文件和目标文件的前后顺序，因为在第一行中已经指出了依赖文件和目标文件。所以-o、目标文件、依赖文件三者何种顺序都可以
> 2. -g 选项唯一要求就是后面紧跟依赖文件，其他无要求