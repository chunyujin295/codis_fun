---
title: Windows将大写锁定键设置为中英文切换
date: '2024-8-12 20:56'
tag:
  - AutoHotKey
category:
  - Skill
  - AutoHotKey
  - Windows
cover: https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-08-12%20210205.png
abbrlink: 679ac598
sticky:
---

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-08-12%20210205.png" alt="屏幕截图 2024-08-12 210205" style="zoom:80%;" />

1. 在“设置-时间和语言-语言”选择中文语言的选项

​	<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240812202640052.png" alt="image-20240812202640052" style="zoom:80%;" />

进入后点击微软输入法的选项

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240812202720965.png" alt="image-20240812202720965" style="zoom:80%;" />

进入后在“按键”中确保选择了“ctrl+空格”进行大小写切换

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240812202921875.png" alt="image-20240812202921875" style="zoom:80%;" />

2. 下载脚本工具[AutoHotkey](https://www.autohotkey.com/)，本次教程的核心就是使用这个脚本，使CapsLock键映射为ctrl+空格，并判定长按的时间，超过一定时间就判定为按下大写锁定键，从而实现mac上一样的效果；将写好的脚本放在开机目录，开机自启动。

   > 顾名思义，autohotkey是一款热键管理管理脚本工具

3. 下载好之后进行安装，安装好之后就如下图，不用管，关闭就好

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240812203552535.png" alt="image-20240812203552535" style="zoom:80%;" />

4. 方法一：

   新建一个记事本，命名一个比较贴近的名称

   里面内容设置如下：

   `#NoEnv的作用应该是指定使用v1版本的ahk`
   
   ```shell
   #NoEnv
   
   SetCapsLockState, Alwaysoff
   SetStoreCapsLockMode, Off
   
   CapsLock::
   KeyWait, CapsLock, T0.3
   If ErrorLevel {
     Send, {CapsLock}
     KeyWait, CapsLock
   } else {
     Send, {Ctrl down}{Space down}{Space up}{Ctrl up}
   }
   ```

   > 分析一下：如果大写锁定键按下时间小于0.3s，则映射为ctrl+空格，否则为大写锁定

   然后选择文件-另存为，选择类型为所有文件，然后更改文件后缀为.ahk（autohotkey的后缀）
   
   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240812204406303.png" alt="image-20240812204406303" style="zoom:80%;" />

​	方法二：

​	安装好autohotkey之后，在鼠标右键的新建里，已经可以看到可以新建autohotkey文件.ahk了，直接创建，然后填入上	述代码即可

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240812204526727.png" alt="image-20240812204526727" style="zoom:80%;" />

5. 点击运行这个文件，发现没有什么反应，并且按键也没有替换掉。

   稍等片刻，弹出如下安装提醒AutoHotKey v1，这个软件就是自动化运行的关键

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240812204749668.png" alt="image-20240812204749668" style="zoom:80%;" />

​	点击“是”之后，等待片刻，安装成功

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240812204901843.png" alt="image-20240812204901843" style="zoom:80%;" />

6. 再次点击刚才创建的.ahk文件，运行成功，右下角菜单状态栏多了一个autohotkey v1正在运行的标志

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240812205035150.png" alt="image-20240812205035150" style="zoom:80%;" />

7. 现在将这个文件添加到开机自动文件夹中：
   win+r打开“运行”，输入**shell:startup**，打开了启动文件夹（一般为C:\Users\UserName\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup）

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240812205301748.png" alt="image-20240812205301748" style="zoom:80%;" />

​	将.ahk文件复制或者移动到这个目录下，开机的时候就会自动启动了

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240812205425257.png" alt="image-20240812205425257" style="zoom:80%;" />

> ps：如果这个目录下有你不想要开机自启动的东西，那就直接删掉他！