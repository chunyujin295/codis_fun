---
title: md的YAML头中title不能包含特殊字符
date: '2024-11-20 1:18'
tag:
  - Hexo
  - Typora
  - YAML
category:
  - Skill
  - Hexo
abbrlink: b9f5758e
---

![image-20241120011200401](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241120011200401.png)

是指在md文件开头这段代码，其实就是YAML头信息，里面包含了md文件的信息，博客构建是就是通过读取YAML头来获取md文件的名称、标签、分类等属性，并组织到不同的路径下。

> YAML的介绍和使用请看这[用Markdown写论文｜03 YAML信息 - 知乎](https://zhuanlan.zhihu.com/p/412303359)

需要注意的是，title一栏不支持一些特殊的字符，会无法读取(原因猜测可能是因为有些特殊字符具有特殊的标识含义)，比如不能存在英文方括号。