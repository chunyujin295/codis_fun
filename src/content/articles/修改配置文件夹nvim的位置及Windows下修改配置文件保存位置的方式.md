---
title: 修改配置文件夹nvim的位置及Windows下修改配置文件保存位置的方式
date: '2025-5-31 17:00'
tag:
  - neovim
category:
  - Skill
  - (˘•ω•˘)
  - neovim
  - 配置及使用
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/PixPin_2025-05-31_17-14-15.png
abbrlink: 1036c7b0
---
nvim位置可以改，nvimdata位置也可以改

甚至Windows的各种应用的缓存位置也可以改

这样就不怕C盘爆满了

[XDG Base Directory 规范 && 修改Neovim的默认配置文件路径 && 设备同时共享多个Nvim配置 - wenli7363 - 博客园](https://www.cnblogs.com/jye159X/p/18304273)

[XDG_CONFIG_HOME环境变量介绍 - Kimi.ai](https://kimi.moonshot.cn/chat/cumbousc75rept641q6g)

> 需要注意的是，这个环境变量也会被其他软件使用，例如Nushell配置文件也是依据该环境变量而保存的，所以建议给这个环境变量路径设置为一个比较通用的文件夹名称，例如叫config

![image-20250212233310607](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250212233310607.png)

![image-20250212233323012](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250212233323012.png)

![image-20250212233340111](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250212233340111.png)

后来别忘了把用户/AppData/Local下的lazygit也放到你设置的环境变量的路径下，这样之前的配置信息才能找到，我估计也是lazyvim配置了lazygit的配置文件路径：

![image-20250213004442821](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250213004442821.png)

目前基本上能正常使用，就是不知道`XDG_CONFIG_HOME`这个环境变量会不会被其他的应用也使用，到时候出了问题，也需要将对应软件的缓存文件迁移到这里来



----

同样，nvim-data文件也能迁移，按照最上面的教程，配置一个`XDG_DATA_HOME`路径就行

![image-20250213004906741](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250213004906741.png)

然后把nvim-data文件夹迁移过来或者直接删掉也行

![image-20250213005257587](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250213005257587.png)