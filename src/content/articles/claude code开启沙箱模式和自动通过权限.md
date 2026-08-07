---
title: claude code开启沙箱模式和自动通过权限
date: '2026-5-13 20:59'
tag:
  - Claude Code
category:
  - Learning
  - Ai Agent
abbrlink: 8d67a396
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260513205745991.png
---

> [Claude Code Sandbox 搞懂:安全+告别弹窗_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV13VdyBmEgb/?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click&vd_source=727b430d8f6893d33c7696f5b7921dcd)

1.开启自动执行模式，忽略许可（这样就不用claude code执行命令的时候总是让你yes了

Windows用户，vscode安装了claude code插件，`ctrl + ,`打开设置页面，搜索`bypassPermissions`或者`Permissions`，按照图片内进行设置：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260505214315969.png" alt="image-20260505214315969" style="zoom:80%;" />

2.开启沙箱模式，修改项目中的.claude文件夹下的配置（你也可以修改claude code的全局的配置，但是我更建议你根据项目设置，这样允许更多情况选择），`settings.local.json`文件增加下面内容：

![image-20260505132304708](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20260505132304708.png)

3.重启claude（关闭所有打开了claude code的窗口）（不过claude code也可能是热重载），然后看看能否选择这个模式了：

![image-20260513204914722](https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260513204914722.png)