---
title: 用Calibre实现Kindle带封面传书
date: '2022-12-13 00:00'
tag: Kindle
category: 
  - Skill
  - Kindle
cover: https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303071157189.jpg
abbrlink: 35444f4
---

#### Kindle如何带封面传书

软件：Calibre

Kinlde传书以往分为两种方式，一种是邮件传输，另一种是数据线连接电脑传输

##### 邮件传书

> 每部Kindle都有自己的邮箱，通过附件的方式给Kindle邮箱发送邮件就可以传书
>
> 但是Kinlde在2022年8月份就宣布停止mobi格式书籍的邮箱传输，并只支持epub
>
> Kindle机器本身只支持azw格式，Kindle可以对mobi进行转换，成为azw格式
>
> 通过邮件传书，无论是mobi还是epub格式都是先通过线上转换，变成azw格式之后发送到kindle去的，而mobi格式通过邮箱传输可以保留原来的封面，epub格式则会失去封面，用邮箱传书的话要带封面只能用mobi格式
>
> 亚马逊以后将停止kindle邮箱传书，只能选择数据线传书

##### 数据线传书

> mobi的书籍通过数据线传输之后会丢失封面，epub则因为Kindle硬件无法进行格式转换，无法读取。
>
> 网络上获取的资源一般都是mobi格式以及epub格式的

以下是通过数据线带封面传书的步骤

**如果书籍带有封面，并且不需要更换，跳过2、3步骤，如果书籍没有封面或者封面不官方和美观，执行2、3步骤**

1. 将需要传输的书籍放到calibre里面
2. <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202208231507207.png" alt="截屏2022-08-23 15.06.53" style="zoom:50%;" />
3. <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202208231508238.png" alt="截屏2022-08-23 15.08.01" style="zoom:50%;" />
4. <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202208231509350.png" alt="截屏2022-08-23 15.09.53" style="zoom:50%;" />
5. 推出Kindle，但是不要关闭calibre
6. 保持Kindle的wifi打开的状态，等待亚马逊删除封面
7. 再次连接Kindle到电脑，等到calibre读取到Kindle，此时calibre会恢复刚刚导入到Kindle书籍的封面
8. 大功告成，可以推出Kindle以及关闭calibre



##### **补充**

> 1. 关于“步骤6”中“亚马逊删除封面“，因为Kindle图书的正规获取渠道是亚马逊图书商城，对于图书的封面，亚马逊是从网络上获取的，网络获取分为邮件和亚马逊商城，通过邮件推送来的mobi格式的图书，自带封面信息，因此Kindle可以通过网络（邮件）下载到图书封面，从亚马逊图书商城里获得的图书，自然也会下载到图书封面信息。
> 2. 通过数据线传输书籍，书籍信息中的封面信息无法作为元数据保存为图书信息，还会占用掉封片信息，因此需要等亚马逊删除掉封面之后再由calibre恢复（写入）元数据信息（书籍封面）
> 3. calibre的原理：
>
> > 更改书籍的信息（元数据），从名称作者到封面
> >
> > 都可以自定义更改
> >
> > 并且还可以从官方根据书籍名称获取书籍元数据，并下载保存在图书中



##### 自己制作封面：

> > 如果无法获取到在线的封面，可以自己制作封面，一般来说书籍中的第一页就是书的封面，我们可以在calibre双击打开书籍，然后截取封面。进入编辑原数据，将截图设定为封面
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202212230933831.png" alt="截屏2022-12-23 09.31.25"  />
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202212230934612.png" alt="截屏2022-12-23 09.31.48"  />
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202212230934010.png" alt="截屏2022-12-23 09.31.59"  />
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202212230934909.png" alt="截屏2022-12-23 09.32.58"  />
>
> 完成之后不要忘了点左下角的确定
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202212230934041.png" alt="截屏2022-12-23 09.33.07" style="zoom:50%;" />





信息来源

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202208231555992.png" alt="截屏2022-08-23 15.33.18" style="zoom:50%;" />

