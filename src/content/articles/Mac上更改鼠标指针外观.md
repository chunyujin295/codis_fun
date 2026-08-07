---
title: Mac上更改鼠标指针外观
date: '2023-11-19 19:25'
tag: Mac
category:
  - Skill
  - Mac
cover: 'https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291927890.png'
abbrlink: cfd78e0
---

# Mac上更改鼠标指针外观

前言：

> 此教程在Mac上更改鼠标外观，是基于Mac上mousecape软件来进行的
>
> 需要的鼠标外观材料来源于Windows的鼠标指针文件(.ani后缀)，将其先转化成每一帧的gif文件，再借助PS将gif文件拼接成为竖版长png，最后导入mousecape进行设置
>
> 另外，mousecape只能生效更改后的图标，如果一些指针图标并未设置，是不会显示的，这也是本人后期放弃使用的原因（即不实用，我还是老实选择了原生指针，这一点上Windows自定义做的真好）

[mousecape下载地址_GitHub](https://github.com/alexzielenski/Mousecape/releases)



## 1.ani文件分帧转化为gif文件

选择想要更改的鼠标指针文件，此处使用的是[【无职转生】艾莉丝动态鼠标指针 by:夹心酱のATM_](https://www.bilibili.com/video/BV12Q4y1J791/?spm_id_from=333.999.0.0)（在此感谢up主，本文章声明不会用于商用）

下载好之后，解压并打开，里面包含为一些.ani文件和Windows上的指针安装程序，此处我们只需要.ani文件

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291753855.png" alt="截屏2023-11-29 17.53.04" style="zoom:33%;" />

进入网站https://ezgif.com/ani-to-gif

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291755202.png" alt="截屏2023-11-29 17.55.06" style="zoom:33%;" />

点击“选取文件”，选择一个ani文件，然后点击“Upload"

> 此处注意，Mac上的指针只有部分支持修改外观，具体可以查看Apple官方文档
>
> 此处借助https://www.cnblogs.com/xuanyu-10-18/p/12901954.html的图片：
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291758617.png" alt="截屏2023-11-29 17.57.39" style="zoom:50%;" />

等待文件上传到网站，完成后如下图所示，点击“Convert to GIF”进行转化：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291800624.png" alt="截屏2023-11-29 17.59.53" style="zoom: 25%;" />

完成后可以在下方输出栏中看到，然后选择“split”，将git分帧

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291802083.png" alt="截屏2023-11-29 18.01.50" style="zoom: 25%;" />

点击图示选项，下载文件图集压缩包

> 建议对于压缩包进行重命名，并且命名中包含下图中的“frames”对应的值，此为gif图片原本的帧，也是转化后的git图片的个数，数值需要在后续mousecape中设置使用

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291803245.png" alt="截屏2023-11-29 18.03.10" style="zoom: 33%;" />

按照以上方式，将其余的ani文件转化为gif即可

## 2.将gif文件拼接成长png

选择一个gif系列中的gif文件，选择通过ps打开（此处我是在Windows上操作的，Mac同理）

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291815353.png" alt="屏幕截图 2023-11-29 171625" style="zoom:60%;" />

选择右上角的搜索，输入“RGB”，选择“RGB颜色”

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291819008.png" alt="屏幕截图 2023-11-29 171647" style="zoom:60%;" />

选择左上角“图像”，更改画布大小，更改纵向的大小，设置为单张gif的长度 ✖️ gif数

> 注意，由于mousecape软件的问题，不支持帧大于15（否则显示的时候会出现上一帧部分画面保留到下一帧之类的bug），因此在设置gif数的时候要注意抽取出一些不关键的帧，防止超出15帧

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291832097.png" alt="屏幕截图 2023-11-29 171724" style="zoom:60%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291832280.png" alt="屏幕截图 2023-11-29 171711" style="zoom:60%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291832583.png" alt="屏幕截图 2023-11-29 171746" style="zoom:60%;" />

然后开始按照序号从小到大从上到下排列，将gif拖入

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291834941.png" alt="屏幕截图 2023-11-29 171853" style="zoom:50%;" />

完成后，点击左上角“文件”，选择“导出”，“快速导出为PNG”

## 3.在mousecape中进行设置

打开mousecape，左上角选择file->new cape，创建一个新的项目

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291845583.png" alt="截屏2023-11-29 18.45.12" style="zoom:50%;" />



右击项目，选择edit

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291907950.png" alt="截屏2023-11-29 19.07.06" style="zoom:50%;" />

点击左下角加号，创建新的指针图标

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291908097.png" alt="截屏2023-11-29 19.08.02" style="zoom:50%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291909454.png" alt="截屏2023-11-29 19.09.01" style="zoom:50%;" />

**Type**为指针类型，在步骤一中给出了mac支持修改的指针类型，选择时只能选择支持修改的类型，否则修改了也不生效

然后将步骤2中生成的对应的png图像拉入下面1x、2x、5x、10x中的任意一个即可（此处为预览框，预览修改结果）

然后对于具体内容进行配置：
**Frames**：刷新帧率，即步骤二中合成png使用的gif的数量，要填写一致，比如拖入的png帧为17，此处就为17

**Frame Duration**：每帧的更新速度，个人建议设置为0.1～0.2之间体验较好，具体数值依据实际情况修改即可

Hot Spot：指针的标识点，即有效点击的位置，以png图片最左上角为原点的坐标，此处本人设置为{4,4}，会在预览框中以红点的形式标识出来

**Size**：实际大小，即光标的大小，依据实际情况自己修改即可，但要注意Size中的长宽设置一致

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311291916693.png" alt="截屏2023-11-29 19.16.38" style="zoom:50%;" />

全部设置完成后，右击项目选择“Apply”即可

项目以“.cape“文件的形式保存，右击项目，选择“show in finder“可查看finder中的cape，可以用来跟别人分享。使用别人分享的cape时，直接打开cape文件即可将项目写入到mousecape。

## 4.附上制作完成的无职转生-艾莉丝像素指针文件，以及mousecape软件安装包

指针文件中包含成品'.cape'文件，和用于制作的png、gif文件，可自定义或直接使用成品

百度网盘：

[无职转生-艾莉丝像素指针文件](https://pan.baidu.com/s/1baDFom6mYrJTTVEYqwjvZg?pwd=wr23 ) ，提取码: wr23

[mousecape软件](https://pan.baidu.com/s/1Uj1JcDYjJByna0H-ef-j5g?pwd=eqx2 )，提取码: eqx2