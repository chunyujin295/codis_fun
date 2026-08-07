---
title: Java_输入
date: '2023-3-17 20:56'
tag:
  - Java
category:
  - 编程日记
  - Java
abbrlink: 9e54541f
---

# Java中的输入

- Java使用的是`Scanner`类的对象来获取用户的输入



首先定义一个`Scanner`类的对象，名称任意，此处以`sca`为例

```Java
Scanner sca = new Scanner(System.in);
```

`sca`的输入流缓冲区里就用来保存用户在控制台输入的数据

> `sca`不同于C++中的`cin`，它不是一个全局变量，有作用域，不过一个作用域里有一个Scanner类的对象就够用了，因为只需要一个缓冲区就可以获得输入流的所有数据

用户再控制台输入数据之后，按下回车，将数据送入`sca`的输入流缓冲区

> 跟C++的`cin`一样



> <font color = red>Java的`src`输入流缓冲区保存数据是按照字符串进行保存的</font>

通过`Scanner`的成员方法将`Scanner`对象输入流缓冲区的数据赋值给变量

有几种常用的成员方法

以`Scanner`的对象`sca`为例:

1. `sca.next()`

   这个成员方法是 返回`sca`的输入流缓冲区的分隔符之前的数据，返回值类型是字符串。数据被返回后，流出缓冲区

   <mark style="background-color">此时，分隔符是空格`' '`、tab`'\t'`、换行符`'\n'`</mark>

   > <mark style="background-color">并且此时如果分隔符在有效数据之前，会自动将分隔符忽略掉，直到获取的数据是有效数据而不是分隔符</mark>
   >
   > 比如
   >
   > ```Java
   > String a = sca.next();
   > ```
   >
   > 如果输入`"               A"`(A之前很多空格)，`A`是才有效数据，`A`之前的空格是分隔符，在从`cin`的输入流缓冲区获取数据的时候，会自动忽略`A`之前的分隔符空格，只获取有效数据`A`
   >
   > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303151642907.png" alt="截屏2023-03-15 16.41.29" style="zoom:50%;" />

   

   比如：

   在控制台输入`"1 2 3 4 5 6 7"`（数字之间有空格），按下回车，添加回车符到数据中，`"1 2 3 4 5 6 7'\r'"`，数据被送入`sca`的输入流缓冲区，回车符`'\r'`在缓冲区变成了换行符`'\n'`，此时缓冲区里的数据为`"1 2 3 4 5 6 7'\n'"`

   执行

   ```Java
String i = sca.next();
   ```
   
   将`sca`的输入流缓冲区换行符，空格`' '`，之前的数据`1`作为返回值赋值给`i`，并流出缓冲区，缓冲区剩余数据为`"2 3 4 5 6 7'\n'"`

   

2. `sca.nextLine()`

   获取`src`输入流缓冲区中的一行数据，也就是'`\n'`之前的所有数据，包括空格。返回值类型是字符串，字符串中包括空格。<mark style="background-color">此时空格`' '`就不是分隔符了，分隔符是`'\n'`</mark>

   比如：

   如果接着上面的代码，先在控制台输入`"hello world"`并按下回车送入缓冲区，此时`sca`输入流缓冲区中的数据是`"2 3 4 5 6 7'\n'hello world'\n'"`

   执行

   ```Java
   String x = sca.nextLine();
   String y = sca.nextLine();
   ```

   先是`x`获取到缓冲区换行符之前的所有数据，也就是`"2 3 4 5 6 7"`，`sca`输入流缓冲区剩余的数据是""`hello world'\n'"`

   之后`y`获取缓冲区换行符之前的所有数据，即`"hello world"`，`sca`缓冲区没有剩余数据了，为空

   

3. `sca`缓冲区中的数据是按照字符串存储的，如果想要按照指定的类型从缓冲区中获取数据，使用以下函数

   | 方法            | 描述                                           |
   | :-------------- | :--------------------------------------------- |
   | `nextBoolean()` | 从缓冲区获取数据，并转化为`boolean`布尔值返回  |
   | `nextByte()`    | 从缓冲区获取数据，并转化为`byte`字节值返回     |
   | `nextDouble()`  | 从缓冲区获取数据，并转化为`double`双精度值返回 |
   | `nextFloat()`   | 从缓冲区获取数据，并转化为`float`浮点值返回    |
   | `nextInt()`     | 从缓冲区获取数据，并转化为`int`值返回          |
   | `nextLine()`    | 从缓冲区读取`String`字符串值                   |
   | `nextLong()`    | 从缓冲区读取`long`值                           |
   | `nextShort()`   | 从缓冲区读取`short`值                          |

   使用这类函数的前提是输入流缓冲区里的数据是能转化成相应的类型

   比如缓冲区里的`"123"`可以转化为`int`类型的`123`，但是`"A"`并不能转化为`int`类型，如果要转化成`int`类型，只有数字字符串才可以
   
   > 比如
   >
   > ```Java
   > Scanner sca = new Scanner(System.in);
   > int i = sca.nextInt();
   > System.out.println(i);
   > ```
   >
   > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303151701983.png" alt="截屏2023-03-15 16.59.14" style="zoom: 50%;" />
   >
   > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303151702764.png" alt="截屏2023-03-15 16.59.23" style="zoom:50%;" />

   所以某种程度上，使用此类成员函数可以提升数据安全性
   
   防止用户输入数据类型不匹配而出错

