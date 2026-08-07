---
title: Java_基本概念
date: '2023-3-8 18:17'
tag:
  - Java
category:
  - 编程日记
  - Java
abbrlink: 9772543a
---

# 源文件--编译单元

Java项目中的编译单元是后缀为`.java`的源文件



# main方法

<mark>main方法是Java程序</mark>(就是项目)<mark>的入口</mark>，在Java项目(程序)执行的时候，从main方法开始执行。

一个源文件中最多有一个main方法；跟C++不同，<mark style= "background-color: pink">一个Java程序允许多个main函数</mark>，每个源文件中都可以有一个main方法，但是在程序执行的时候，<mark style = "background-color: pink">只能选择项目中的一个main方法作为项目的入口</mark>。



# public类(公共类)

> 在此之前，先说一下访问权限
>
> 针对类、成员方法、成员属性，Java提供了四种访问控制权限修饰符关键字，在定义的时候加在最前面，附加上访问权限
>
> 分别是`private`	`defalut`	`protected`	`public`
>
> 
>
> `private`用于修饰<font color = red>成员对象</font>和<font color = red>成员方法</font>
>
> 当<font color=blue>类</font>、<font color=red>成员方法</font>、<font color = red>成员属性</font>没有权限修饰符的时候，默认是`default`，最多可以在<u>本包下的其他源文件中被访问</u>
>
> `protected`用于修饰<font color = red>成员对象</font>和<font color = red>成员方法</font>
>
> `public`修饰<font color = blue>类</font>、<font color = red>成员属性</font>和<font color = red>成员方法</font>的时候，允许在本项目中任何地方被访问(全局访问)
>
> 
>
> >  以下为当<font color = black>成员属性</font>被不同的权限修饰符修饰时的可被访问的范围：
> >
> >  | 可被访问的范围           | private | default | protected | public |
> >  | ------------------------ | ------- | ------- | --------- | ------ |
> >  | 同一类中                 | yes     | yes     | yes       | yes    |
> >  | 同一包中的类             |         | yes     | yes       | yes    |
> >  | 同一项目下不同包中的子类 |         |         | yes       | yes    |
> >  | 同一项目下全局范围       |         |         |           | yes    |
> >
> >  > 不同包中的子类：本类作为父类时，在其他包中被继承



<mark style = "background-color: pink">源文件中只有public类是允许完全对外访问的</mark>(对项目内全局可访问，不只同包中)

不包中的类只有通过调用某类的public类才能间接调用该public类(所在源文件的)所在包下的其他非public类(如果这个public类中调用了其包中的非公共类的话，否则还是无法调用)

在程序编译的时候，只有通过源文件的public类才能访问到该源文件的内部，进而间接调用该源文件所在包中的非public类，所以<mark>public类是源文件的公共接口</mark>(只对外开放的口，不是Java的术语"接口")

所以项目的<mark>main方法只能存在于public类中</mark>，否则无法被访问到

> 例如源文件test.java
>
> ```Java
> public class test{
> 	public static void main(String[] args)
> {
>  //......
> }
> }
> ```
>
> main方法必须用public修饰：因为要允许被全局访问，否则就算在public类中，main函数本身也不允许被访问
>
> main方法必须用static修饰：main方法是public类的成员方法。普通的成员方法只能在类被实例化成对象，由对象用对象名调用，是对象方法；static修饰的成员方法是静态方法，在加载类的时候就被存储在静态域空间内了，通过类名就可以直接调用，不需要类实例化成对象。很显然，main函数作为项目的入口，一定是不需要实例化的



<mark style="background-color:pink">源文件的名称必须和文件内的public同名</mark>

> 这是好理解的，因为只有通过public类才能访问源文件

由于源文件对外的接口是其中的公共类，所以在称呼源文件的时候可以称其为类，这里特指的是公共类



**源文件中并不一定要包含public类**，当源文件的类需要直接被包外访问时，才需要被加上public权限，否则可以不加public，只被本包中的类访问



# 包(package) (软件包)

> 在使用C++编程的时候，一个项目里有若干个.c和.h源文件，它们是并行的，也就是说都存在于项目文件夹，且属于同一级。在C++中有使用`using namespace `命名空间这个机制来防止同名冲突，允许不同命名空间里的变量重名，只要在使用的时候指明变量的命名空间就行。

在Java中，也给出了相似的机制，是通过包来实现的。

平时我们在使用电脑的操作系统的时候，通常将同一类的文件放到一个文件夹里，这样在进行查找的时候就能根据文件夹找到具体的文件。同时，同一个文件夹里不允许有同名的文件(文件拓展名也属于文件名)，但是不同的文件夹中可以存放不同的文件。

Java中的包就是这样。<mark style="background-color:pink">在项目中，可以将源文件按照某种方式进行分类，将同一类的文件放到一个包中，同一个包中的类名不允许重名，不同包中的类可以重名</mark>。

> 类有两种权限，public和default，两种权限都是允许同包里的类访问，所以同包里的任何类都不允许重名

这就跟操作系统的文件管理一样，文件夹里可以包含多个子文件夹，包里也可以存在多个子包，并且<mark style="background-color:pink">每个包属于一个命名空间，同一个命名空间里的变量不允许重名，不同命名空间里允许</mark>。



如同操作系统文件管理一样，应该先创建文件夹，再将文件添加到文件夹里(指定文件存在于哪个文件夹里)；不能先创建文件，然后指定其存在于哪个文件夹，因为有可能文件夹不存在

应该<mark style="background-color:pink">先创建包，再往包里添加文件</mark>

- 源文件的第一行用`package`关键字声明本源文件属于的包：

```java
package 文件所属的一级包.文件所属的二级包.文件所属的三级包;//如果文件直接在项目底下，不属于任何包，不需要使用package声明；声明时路径要详细，并用.进行路径分隔
	public class 类名{
    public static void main(String[] args){
      //....
    }
	}
```

- 然后将文件移动到相应到包中

> 一定要确保<font color=red>文件中`package`声明的包路径</font>与<font color= red>文件实际存在于的包路径</font><font color=blue>一致</font>，否则会报错
>
> > - 比如在项目中有一个test.java，声明所属的包在test，但是test.java实际直接存在于项目底下，不在任何包中，此时会报错
> >
> >   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303082230342.png" alt="截屏2023-03-08 20.37.58" style="zoom: 50%;" />
> >
> > - 包括当文件所属的包实际不存在时，也是属于声明的包路径与实际存在的包路径不一致
> >
> >   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303082230795.png" alt="截屏2023-03-08 22.25.01" style="zoom: 50%;" />

- 也可以在<font color = blue>包中直接创建源文件，源文件自带package声明</font> (更方便一些)





# import语句

用于引入其他包内的类，包括类库中的类以及自定义的类

1. 类库中的类

2. 引入包中的某个类

   `import java.util.Scanner;`

3. 引入包中的全部类

   `import jaca.util.*`（通配符的使用）

4. java.lang包提供了java语言的核心类库，包中的全部类，由系统自动引入(隐式引入)，不需要显示引入

   比如包含了`system`类

5. 如果使用`import`语句引入了整个包中的类，可能会增加编译时间但是不会影响运行性能

6. 当程序中没有使用import语句声明类所在的包时，会默认使用当前路径下的类

- <font color = red>`improt`语句必须位于包声明之后，类声明之前</font>

