---
title: Qt-qrc机制
date: '2024-9-13 15:56'
tag:
  - Qt
category:
  - Qt
cover: 'https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202408041153746.png'
abbrlink: 43f5e4df
---

## Qt导入照片等资源的三种方式

1. 绝对路径

   ```C++
   Widget::Widget(QWidget *parent)
       : QWidget(parent)
       , ui(new Ui::Widget)
   {
       ui->setupUi(this);
   
       QIcon icon("D:/document/code/QT/LEARNING/QWidget_7/143894.jpg");//直接在栈上创建，而不是在堆上
       //之前推荐在堆上创建，主要是因为要确保当前空间的生命周期是足够的，要通过Qt对象树来释放对象。
       //QIcon自身是一个比较小的对象，创建出来了之后，就是要设置到某个QWidget里面，QIcon对象本身是否释放，都不影响最后的显示
       //另一方面，QIcon不支持对象树
           
       this->setWindowIcon(icon);
       //setWindoewIcon和setWindowTitle一样，也是顶层窗口设置才有效
   
   }
   ```

   ![image-20240913150322120](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240913150322120.png)

2. 相对路径

   ```C++
   Widget::Widget(QWidget *parent)
       : QWidget(parent)
       , ui(new Ui::Widget)
   {
       ui->setupUi(this);
       QIcon icon("../QWidget_7/143894.jpg");
       //通过绝对路径的方式进行引用，是不科学的
       //因为写的程序最后是要发布到用户的电脑上的，无法确保，开发机上图片的路径和用户电脑上的路径完全一致
       //因此，相比于使用绝对路径的方式，使用相对路径是更好的
       //另外还需要注意，此处使用的./是可执行程序的路径，并不是项目工程的路径，因为程序运行时的工作路径，是可执行程序所在路径，并非工程所在的路径
           
       this->setWindowIcon(icon);
       //setWindoewIcon和setWindowTitle一样，也是顶层窗口设置才有效
   
   }
   ```

3. qrc机制

### qrc机制

​	Qt引入qrc机制，从根本上解决两个问题：

1. 图片所在路径不一定在用户机上也存在 (绝对路径的缺点)
2. 图片可能会在用户机上丢失 (相对路径的缺点)

> 原理：给Qt项目引入了一个额外的xml文件（后缀为.qrc），在这个xml中将要使用的图片资源导入进来，并且在xml中进行记录。Qt在编译项目的时候，会根据qrc中的图片信息，找到图片中的内容，提取出里面的二进制数据，将二进制数据转化为C++代码，最终编译到exe中。

​	qrc的缺点：无法导入太大的资源。

#### qrc的用法

##### 1.新建项目

选择Qt -> Qt Resource File，创建名称之后一致next即可。此处取名”resource“。

![image-20240913150531802](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240913150531802.png)

创建完成后可以看到左侧项目列表中多了一个`Resources/resource.qrc`

![image-20240913150750840](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240913150750840.png)

双击之后进入界面

##### 2.新建前缀(Add Prefix)

前缀可以理解为Qt创建的一个虚拟目录

![image-20240913152038144](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240913152038144.png)

自定义一下前缀的名称，然后在qrc文本编辑下就可以看到这个新建的虚拟目录了

##### 3.导入文件(Add Files)

导入文件，即将文件放入刚创建好的前缀中。需要注意的是，文件必须来自于qrc文件同级目录下或同级目录下的子目录中，即必须先将需要导入的文件放入工程目录中才行。

点击Qt编辑区(Qt Editor)的`/test`，选择`Add Files`，选中要导入的文件

![image-20240913152625084](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240913152625084.png)

导入完成后，可以看到/test新增了刚导入的文件，选择该文件，可以设置别名，后去就可以直接用别名调用此文件了，十分方便

![image-20240913152802022](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240913152802022.png)

保存一下qrc文件，可以看到左侧项目栏中增加了内容

![image-20240913152844830](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240913152844830.png)

此时qrc文件已经变成了列表，双击没有办法对qrc进行编辑了。右击qrc文件，可以执行Add Prefix等操作，右击前缀，可以执行添加文件等操作。

右击qrc文件，还可以选择在编辑区中打开(Open in Editor)，此时又可以通过跟上面一样的操作来编辑qrc文件了。

![image-20240913153158610](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240913153158610.png)

##### 4.引用文件

在引用文件的时候，语法与绝对路径，相对路径一样，只是前面要加上冒号":"

```C++
    QIcon icon(":/test/Asuka");//使用qrc的时候，格式为": + 虚拟路径"
    this->setWindowIcon(icon);
```

###### 补充：

前缀名可以加"/"可以不加，因为qrc会自动补全

![image-20240913153615833](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240913153615833.png)

前缀名也可以为空，同样，qrc也会自动补全"/"

![image-20240913153702520](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240913153702520.png)

引用文件的时候，前缀为空，就直接不用写了

![image-20240913153729525](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240913153729525.png)



#### 探究qrc

进入可执行程序目录，会看到多了一个文件：qrc_resource.cpp

![image-20240913154911371](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240913154911371.png)

qrc中导入文件资源，就会被转化成qrc_resource.cpp中的代码

![image-20240913155337482](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240913155337482.png)

当Qt项目进行编译的时候，该cpp文件就被一起编译到exe中了，当exe程序运行的时候，上述图片的数据也就被加载到内存中了