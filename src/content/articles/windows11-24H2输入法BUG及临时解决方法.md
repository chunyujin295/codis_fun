---
title: windows11-24H2输入法BUG及临时解决方法
date: '2024-12-17 9:56'
tag:
  - Windows更新
  - windows输入法
category:
  - Skill
  - Windows
abbrlink: 8728f196
---

Windows11更新24H2后出现输入法BUG

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/1734246762369.jpg" alt="1734246762369" style="zoom:67%;" />

现象：当微软输入法选择“为每个窗口使用不同的输入法”之后，使用alt+tab切换窗口，输入法总是为默认的，而不是窗口上一次处于的输入法状态。

比如如果默认输入法是中文，目前处于微信界面，且输入法为英文，那么使用alt+tab切换到另一个软件，再切换回来，输入法并不是英文，而是变为了默认的中文。【目前仅在微软输入法上发现了BUG，其他输入法未知】

解决方法：目前只能是使用一个权宜之计，没办法完全解决，只能等待新版本的更新，<mark>所以说大家不要轻易更新电脑系统啊！！</mark>

打开兼容性微软拼音的兼容性选项

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241215150323147.png" alt="image-20241215150323147" style="zoom:67%;" />

补充，微软原版本的输入法是win10的，因此无法使用win11的外观，不过还是可以通过win11的设置使得一些功能生效或关闭，此处更改一些设定，让输入法更好用：

1.

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241215150517754.png" alt="image-20241215150517754" style="zoom: 67%;" />

关闭web建议，这样输入法的第2个位置就不会有一朵云彩形状的提示了，而且现在这个web建议功能已经失效了，纯粹占用空间。

2.

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241215150707576.png" alt="image-20241215150707576" style="zoom: 67%;" />

候选词的个数可以多一些

观赏表情符号面板，这样候选测窗口最后面一列就不会显示表情符号标志了，实际输入过程中，表情符号标志没啥用