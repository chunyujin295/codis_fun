---
title: Typora+PicGo图床+阿里云OSS配置
date: '2024-10-10 21:01'
tag: Typora
category:
  - Skill
  - Typora
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/PixPin_2024-10-10_21-01-52.png
abbrlink: e9887bd
---

首先购买阿里云OSS服务

完成之后，打开RAM访问控制

点击 用户-创建用户

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20230314101800121.png" alt="image-20230314101800121" style="zoom: 67%;" />

创建用户登录名称和显示名称

完成进入相关用户

点击“创建AccseeKey”

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303122001920.png" alt="截屏2023-03-12 20.01.28" style="zoom: 33%;" />

将信息保存下来

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303122002839.png" alt="IMG_0538" style="zoom: 33%;" />

之后点击 权限管理-新增授权

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303122000574.png" alt="ss" style="zoom:50%;" />

选择 整个云账号-授权主体

在“系统策略”里选择以下内容

点击确认，完成

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303122000150.png" alt="qq" style="zoom:50%;" />

打开Typora

打开设置，选择"插入图片时……"

按照一下进行勾选

在“上传服务设定”中选择PicGo，如果没有安装则进行下载，并在Typora中配置好路径

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303122007419.png" alt="截屏2023-03-12 20.06.58" style="zoom:33%;" />

打开PicGo

按照如下进行配置，前两项是在阿里云创建的AccessKey给出的信息

三四项根据阿里云OSS存储中自己设定好的的Bucket和存储区域来，或者直接按实例进行填写

存储路径按照阿里云OSS中填写

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303122008334.png" alt="截屏2022-09-14 11.41.25" style="zoom:50%;" />

回到Typora刚才的页面，点击“验证图片上传选项”

返回结果为成功则说明配置完成

