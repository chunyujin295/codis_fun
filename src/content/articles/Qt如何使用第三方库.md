---
title: Qt如何使用第三方库
date: '2024-8-4 11:43'
tag:
  - Qt
category:
  - Qt
cover: https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202408041153746.png
abbrlink: 5a0ef924
---

![截屏2024-08-04 11.46.25](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202408041147279.png)

## 1.获取库的.dll和.lib(或.a)

### 在资源管理器中找到对应库的.dll和.lib(或.a)

#### 如果第三方库不是Qt生成的：

通常比较规范的第三方库，有`lib`和`include`两个文件夹。`lib`文件夹就是包含的库文件。`include`则包含头文件。



#### 如果第三方库是Qt生成的：

（通过Qt创建库的方法请见另一篇文章）

第三方库的构建时可以选择构建套件(Kit)：

> 使用的`MSVC`编译：编译后会生成`.dll`和`.lib`两个文件。`.dll`在运行应用程序时调用，`.lib`在应用程序隐式调用动态链接库时使用
> 使用`MinGW`编译：编译后会生成`.dll`和`.a`两个文件，`.dll`在运行应用程序时调用，`.a`在应用程序隐式调用动态链接库时使用
>
> <mark>注意，如果一个项目中使用了第三方库，构建项目时使用的套件，必须与使用的第三方库构建使用的套件一致，否则会报错”link1104“错误</mark>
>
> > 即如果第三方库用的MinGW编译，项目中添加的库文件是.a，那么项目构建的时候，也是用MinGW编译才可以通过

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803102506454.png" alt="image-20240803102506454" style="zoom: 80%;" />

构建时可以选择套件、构建的位置，如果选择了Debug，则应该到中间文件目录的Debug文件夹下去找构建后的库：
中间文件目录会生成到项目文件的同级目录下：

![image-20240803103351534](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803103351534.png)





## 2.获取库的头文件

### 在资源管理器中找到对应库的头文件

#### 如果第三方库不是Qt生成的：

一般就存在于第三方库的`include`文件夹下



#### 如果第三方库是Qt生成的：

头文件存在于项目目录下

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240804110803753.png" alt="image-20240804110803753" style="zoom:80%;" />

## 3.在项目中添加该库文件 及 相关头文件

#### 方法一：不拷贝（推荐）

##### 添加库

右击项目，选择“添加库”

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803163413609.png" alt="image-20240803163413609" style="zoom:80%;" />

或者打开.pro文件，在空白处右击鼠标，选择添加库

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803163448944.png" alt="image-20240803163448944" style="zoom: 80%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803164247193.png" alt="image-20240803164247193" style="zoom:80%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803164401963.png" alt="image-20240803164401963" style="zoom:80%;" />

点击库文件的“浏览”，库的.a文件。如果库是Qt生成的，则找到对应的中间文件目录的debug目录或者release目录，找到对应的.a文件。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803164505781.png" alt="image-20240803164505781" style="zoom: 80%;" />

##### 添加库的头文件路径

点击“包含路径”后面的“浏览”

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240804111413939.png" alt="image-20240804111413939" style="zoom:80%;" />

找到库的项目目录（如果库是Qt构建的），选中，然后点击右下角选择文件夹

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240804111523486.png" alt="image-20240804111523486" style="zoom:80%;" />

> 因为Qt的头文件在项目目录下

完成之后，确定剩余的勾选项，然后一直下一步，直到结束

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240804111646721.png" alt="image-20240804111646721" style="zoom:80%;" />

> 关于勾选项：
> `平台`：如果不是Linux和mac平台，可以只选Windows
> `链接`：根据需求选择，可以直接选动态
> `Windows`下的选项：
> 			因为当前使用的库并不是存在于中间文件目录的debug或release子目录下，而是复制到了工程目录下，所以不勾选
> 			“为debug版本添加'd'作为后缀”建议不勾选（勾选了之后在.pro文件中会在库名后加一个d，构建时容易报错“找不到库文件”，如果勾选上，在.pro将d删除即可
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803112021251.png" alt="image-20240803112021251" style="zoom:80%;" />
>
> ​			“移除release版本中的'd'后缀”不勾选



此处可以查看一下项目的`.pro`文件，里面有和库有关的配置信息：
在添加完库之后，`.pro`文件中会新生成几行：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240804112017650.png" alt="image-20240804112017650" style="zoom:80%;" />

> 其中`LIBS`是确定库的所在位置（-L），以及库名（-l）
>
> `INCLUDEPATH`是指定头文件的搜索路径
>
> `DEPENDPATH`用于指定项目中的源文件所依赖的头文件的搜索路径
>
> （二者区别见[Qt构建中DEPENDPATH和INCLUDEPATH区别](https://blog.csdn.net/weixin_45650767/article/details/129740691)）



##### 使用库

现在就可以使用库了，本例中使用的`des.h`即为库中的头文件

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240804112409882.png" alt="image-20240804112409882" style="zoom:80%;" />

#### 方法二：拷贝

##### 将库文件拷贝到当前项目下，新建目录

在工程目录下创建一个新的文件夹(此处取名`lib`，随意)，将库的`.dll`和`.a`复制进去(此处以.a为例)

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803105505302.png" style="zoom:80%;" />

##### 将库的头文件拷贝到当前项目下，新建目录

在项目目录下新建文件夹（此处取名`include`，随意），将库头文件拷贝进来（如果多个头文件，建议全部拷贝，因为可能互相包含）。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803170601334.png" alt="image-20240803170601334" style="zoom:80%;" />

在Qt Creator中，右击项目中的Header文件夹，点击“Add Existing Directory”（也可以选择“添加现有文件”但是是单文件添加，效率低）

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803170832859.png" alt="image-20240803170832859" style="zoom:80%;" />

选择当前项目目录下的`include`文件夹

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803171320095.png" alt="image-20240803171320095" style="zoom:80%;" />

稍等片刻，项目中就添加完成了，同时`.pro`文件中也更新了配置

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803171509008.png" alt="image-20240803171509008" style="zoom:80%;" />

##### 添加库和头文件路径

在Qt Creator中右击项目名，点击添加库

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803110136850.png" alt="image-20240803110136850" style="zoom:80%;" />

或者，打开项目的`.pro`文件，右击空白处，点击添加库

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803110224689.png" alt="image-20240803110224689" style="zoom:80%;" />

选择“外部库”

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803110249815.png" alt="image-20240803110249815" style="zoom:80%;" />

点击“库文件”右侧“浏览”

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803110445314.png" alt="image-20240803110445314" style="zoom:80%;" />

找到刚在工程目录下创建的lib文件夹下的`.a`文件，选中打开即可

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803110701026.png" alt="image-20240803110701026" style="zoom:67%;" />

完成后会发现“包含路径”一栏已经自动填充，而且是自动选择了项目目录下的include目录，即刚才拷贝过来的库头文件

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240804113021433.png" alt="image-20240804113021433" style="zoom:80%;" />

关于勾选框，左下如果没有特别情况，只勾选Windows即可。右侧Windows中，“debug或release子目录下的库”，如果是Qt生成的库，可以选上。“为debug版本添加’d‘作为后缀”不勾选。（详细看方法一此处介绍）

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240804113716498.png" alt="image-20240804113716498" style="zoom:80%;" />

之后一路点击“下一步”即可。

##### 使用库

此时就可以使用库了，在引入头文件的时候，可以写相对路径，也可以不写

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803172511304.png" alt="image-20240803172511304" style="zoom:80%;" />

构建一下，通过，可以正常使用



#### 方法三：其他方式（不太推荐）

比如不在添加库时指定头文件目录，而是添加库后，在项目中添加现有文件夹（Add Existing Directory），在调用使用头文件时，使用绝对路径的方式

在Qt Creator中，右击项目中的`Headers`文件夹，选择“Add Existing Directory”（也可以选择“添加现有文件”但是是单文件添加，效率低）

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803173247613.png" alt="image-20240803173247613" style="zoom:80%;" />

点击“浏览”，找到库（如果是Qt库，则找到该项目文件夹），选择（而不是进入），点击“选择文件夹

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803173420793.png" alt="image-20240803173420793" style="zoom:80%;" />

然后点击”Start Parsing“，更新目录范围，点击三角图标，展开目录

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803173614776.png" alt="image-20240803173614776" style="zoom:80%;" />

然后在下面栏中使用通配符*进行筛选，点击Apply Filters，即可选中所有.h文件

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803175409005.png" alt="image-20240803175409005" style="zoom:80%;" />

按下OK，即可添加完毕
项目的.pro文件中也更新了配置

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803175507117.png" alt="image-20240803175507117" style="zoom:80%;" />

在使用时，不能直接引用头文件原名，否则查找不到：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803175641151.png" alt="image-20240803175641151" style="zoom:80%;" />

需要写上绝对路径或者相对路径，相对路径写法可以参考.pro文件中的：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240803175859426.png" alt="image-20240803175859426" style="zoom:80%;" />

构建一下，通过，可以正常使用



## 4.写在后面：

还是老生常谈的问题：

<mark>如果一个项目中使用了第三方库，构建项目时使用的套件，必须与使用的第三方库构建使用的套件一致，否则会报错”link1104“错误</mark>

> 即如果第三方库用的`MinGW`编译，生成的库文件包含的是`.a`，项目中添加的库文件是`.a`，那么项目构建的时候，也是用`MinGW`编译才可以通过
>
> 如果第三方库用的`MSVC`编译，生成的库文件包含的是`.lib`，项目中添加的库文件是`.lib`，那么项目构建的时候，也是用`MSVC`编译才可以通过
