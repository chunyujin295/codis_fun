---
title: Qt-解决MSVC下编码警告&中文输入乱码
date: '2024-8-19 13:07'
tag:
  - Qt
category:
  - Qt
cover: 'https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202408041153746.png'
abbrlink: f7d3dfd8
---

## 

如果MSVC编译时，

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240813162138097.png" alt="image-20240813162138097" style="zoom:80%;" />

或者

![image-20240819130658443](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240819130658443.png)

在pro文件最下面加入：

```properties
msvc {
    QMAKE_CFLAGS += /utf-8
    QMAKE_CXXFLAGS += /utf-8
}
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240813162216747.png" alt="image-20240813162216747" style="zoom:80%;" />

然后“重新构建”（一定要进行这步）即可