---
title: STL&string&模拟实现
date: '2024-3-17 10:13'
tag:
  - Cpp
category:
  - Cpp
abbrlink: 9840a6e5
---

# STL简介

STL(standard template library-标准模板库)：是C++标准库的重要组成部分，不仅是一个可以复用的库，而且是一个包罗数据结构与算法的软件框架。

## STL六大组件

![image-20240315082116261](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240315082116261.png)

# string解析

string严格来说不属于STL，它的创建时间比STL更早

## 头文件&命名空间

头文件`#include <string>`
但是有引入头文件`<iostream>`的时候，不引用头文件`<string>`也可以

命名空间`std`



## 构造函数string::string

三种常用的构造函数

```C++
string();//default
string(const string& str);//使用一个string拷贝构造，是深拷贝
string(const char* s);//使用char数组拷贝构造，是深拷贝
```

```C++
char ch[] = "hello"
    
string str1;//默认构造函数
string str2("hello world");//使用string拷贝构造
string str3(ch);//使用char数组拷贝构造
string str4(str2);//使用string拷贝构造
```

## 成员变量string::nops

```C++
static const size_t npos = -1; //C+中的定义
```

这是一个值为-1的`size_t`类型的静态常变量。很明显，`size_t`不可能取负值，因此这个变量常表示用于一些特殊的表示：

1. 表示`string`这个类型的最大容量(大约4亿多字节)，是`max_size()`的返回值。
1. 常用来作为`string一些成员函数`的返回值，表示“未找到”“不存在”等。例如`find()`查找字符/字符串查找无果时。

## 运算符重载

### string::operator[]，访问string中的字符

```c++
char& operator[] (size_t pos);
const char& operator[] (size_t pos) const;
//第一个const表示返回值也是const类型。因为返回值为引用，所以必须设置为const类型，防止通过返回值更改元素
//此处第二个const表示指明该函数所处的对象是一个const对象，避免权限放大
//相当于 const char& opeartor[] (size_t pos, const *this);
```

> pos为字符的下标

<mark>通过[]获取到的字符就是string的字符的引用，可读可写</mark>

通常标准库对于一些函数都会提供两个版本，一个是非const版本，一个是const版本，供不同情况使用。

```C++
const string str_const = "hello China";
string str("hello world");
for(int i = 0; i < str_const.size(); i++)
{
  cout<<str_const[i]<<endl;//str_const是const类型的，只能调用const类型的[]重载
}
str = "hello my friend";//str为非const，具有写的权限
cout<<str<<endlp;
```

权限是不允许放大的，如果`str_const`调用的是非const类型的成员函数，那么就属于权限放大了。

> 1. 非const类型的成员函数并未指明自己所属的对象是一个const类型的对象，则认定为this对象为非cosnt。因此属于通过非const成员函数将自己的对象权限放大了
> 2. 非const类型的成员函数并未指定返回值为const类型，而返回值又使用了引用，因此可以通过返回值更改string对象的元素，对一个只有读权限的const对象来说，这也是权限放大，是不合法的。

----

传统的数组的越界检查是一个抽查行为，不一定每次程序编译都会检查出来
而string越界一定会检查出来，因此[]重载时给出了越界断言检查`assert(pos<size)`

----

### string::opeartor=，string对象赋值

```c++
string s1;
string s2("hello world");
string s3 = "defined by operator =";
const string s4 = "a const string";//const类型的对象，必须在声明的时候就初始化(定义)、

s1 = s2;
s3 = "changed";
```



### string::operator+=，拼接字符/字符串

```C++
string s1 = "hello";
string s2 = " world";
s1 += s2;
string s3 = s1 + s2;

cout<<s1<<endl;//"hello world"
cout<<s3<<endl;//"hello world"
```



### opeartor<<，流插入运算符重载

这个重载运算符并非string的成员函数

实现了可以将string对象插入到IO流中



## string::c_str

获取string的C类型的字符串，本质就是返回该string的`char*`

意义就是可以很好的跟C语言的一些接口配合

operator<<的重载就运用了这个函数，获取到string的C字符串，即可实现重载



## 迭代器iterator的使用

迭代器iterator是一个额外的、独立数据结构，存在于STL库中。专门用于访问STL中各个数据结构中的元素。

(可以朴素地认为迭代器就是指针)

> 使用迭代器访问元素，和使用方括号[]加下标的效果一样，<mark>都是获取元素的引用</mark>，可读可写
>
> 但是方括号是对象本身的数据结构自带的(通过重构)，而迭代器是不属于被访问的对象的，一个单独的数据结构
>
> >  当一个对象为const时，为只可读的，此时还是可以通过方括号下标访问(因为通常会重构一个const类型的方括号)，只要不对访问到的元素进行修改即可
> > 但是已经不能使用普通迭代器访问了，因此使用迭代器访问元素，本质上是使用一个数据结构A(iterator)访问另一个数据结构B(被访问的对象)中的元素，而非数据结构B直接调用自己的成员函数访问自己
> >
> > 因此就算数据结构B设置为const，但是外部的迭代器仍有写的权限，这是不合理的。此处应使用const_iterator



### 迭代器的使用方法

1. 使用迭代器的时候要指明被访问的数据结构类型

```C++
//此处以string对象为例
string::iterator ite;
```

2. STL中的数据结构，都具有相关的成员函数，获取到自己元素的迭代器

以`string`为例：

`string::begin()`获取首字符的迭代器

`string::end()`获取最后一个有效字符的下一个字符(即结束字符，也就是'\0')的迭代器

> STL的各个数据结构都有`begin()`和``end()``函数，而且都是<mark>左闭右开</mark>
>
> 即begin()获取首元素的迭代器，end()获取最后一个有效元素的下一个元素的迭代器
>
> 这样便于遍历
>
> ```C++
> string s1 = "helle world";//即h、e、l、l、o、 、w、o、r、l、d、\0
> string::iterator it_left = s1.begin();//获取的是h的迭代器
> string::iterator it_right = s1.end();//获取的是\0的迭代器
> 
> 
> //遍历方式1
> while(it_left != it_right)
> {
> 	cout<<*it_left<<" ";//访问迭代器对应的元素，就是解引用
> 	it_left++;//迭代器可以加减，就是后移/前移
> }
> //遍历方式2
> while(it_left != s1.end())
> {
> 	cout<<*it_left<<" ";
> 	it_left++;
> }
> //遍历方式3
> for(; it_left != it_right; it_left++;)
> {
>   cout<<*it_left<<" ";
> }
> //遍历方式4
> for(; it_left != s1.end(); it_left++;)
> {........}
> ```
>

### 注意！迭代器遍历要使用!=，不能使用<，因为地址空间不一定连续

> 顺序存储类型的数据结构，地址空间连续，如string/vector出了使用迭代器访问元素，还可以通过方括号[]结合下标来访问。
>
> 但非顺序存储类型的数据结构，地址空间不连续，如list，则只能使用迭代器访问

但是`iterator++`或i`tertor+=n`意味着迭代器指向下一个/后面第n个元素，是逻辑上的指向下一个



### 四大常用迭代器

**普通正向迭代器 iterator**

```C++
string::iterator it_left = s1.begin();//获取首元素
string::iterator it_right = s1.end();//获取最后一个有效字符的后一个字符，即结束字符\0
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202403161112920.png" alt="截屏2024-03-16 11.08.56" style="zoom: 33%;" />

**普通反向迭代器 reverse_iterator**

与正向迭代器的起点、终点、移动方向正好相反

```C++
string::reverse_iterator re_it_left = s1.rbegin();//获取最后一个有效元素
string::reverse_iterator re_it_right = s1.rend();//获取首元素的前一个位置
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202403161112768.png" alt="截屏2024-03-16 11.09.50" style="zoom:33%;" />

const正向迭代器

```C++
string::const_iterator con_it_left = s1.begin();//还使用begin()获取，因为string中对此重载了
```

**const反向迭代器**

```C++
string::const_reverse_iterator con_re_it_left = s1.rbegin();

//还是使用rbegin()获取，因为string对此重载了
```



<mark>不知道对象是不是const的？auto登场</mark>



## string::size / string::length

获取string的有效长度，即有效字符的数量。<mark>不包括结束字符\0</mark>

```C++
size_t size() const;//C++98中是这样定义的
```

注意返回值类型是`size_t`，因此最小值就是0

> ```C++
> size_t _size = s1.size();
> while(_size >= 0)
> {
> 	_size--;
> }
> //会造成无限循环。因为size_t类型，最小值就是0，即使已经等于0了，--之后还是0。所以会无尽循环
> ```



## string::capacity

获取string的容量，即已开辟的string的总空间

一般情况下，容量capacity肯定是比大小/长度size大的，因为要预留一部分空间

```C++
size_t capacity() const;//C++98中是这样定义的
```



## string::empty

```C++
bool empty() const;//C++定义，判断string是非为空串
```



## string的三种遍历方式

[下标]
迭代器
范围for

### [下标]

```c++
string s = "hello world";
for(int i = 0; i < s.size(); i++)
{
  cout<< s[i] << " ";
}
```

### 迭代器

```C++
string s = "hello world";
auto it_left = s.begin();//此处使用了智能指针
while(it_left != s.end())//注意要使用不等号而不是小于号，因为某些数据结构地址空间不一定是连续的
{
  cout<< *it_left << " ";
  it_left += i;
}
//或者
for(string::iterator it_left = s.begin(); it_left != s.end(); it_left++)
{
  cout<< *it_left << " ";
}
```

### 范围for，C++11新引入，原理：替换成迭代器

```C++
string s = "hello world";
for(auto ch : s)
{
  cout<< ch <<" ";
}
```

范围for的实现逻辑实际上就是调用了迭代器iterator，通过查看汇编就可以看出来

范围for是遍历STL中的每一个元素

> 这里不要和迭代器搞混，迭代器是访问的元素的地址，然后再解引用迭代器，访问到的元素
>
> 范围for使用时变量直接就是获取到的元素（也就是包含了用迭代器获取地址+迭代器解引用）

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202403161616750.png" alt="范围for本质上就是替代了迭代器(从汇编就可以看出来)" style="zoom: 30%;" />



## string扩容

string会自动扩容，每当string被填满(size == capacity)的时候，就会自动进行扩容

扩容：开新空间，拷贝，释放旧空间

> 出了初始化时(第一次扩容)：Windows的vs下每次扩容约为原来的1.5倍，Linux下约为2倍
>
> 创建一个空string也是有容量的，因为要存放'\0'



### string::reserve

扩大容量

```C++
void reserve (size_t n = 0);//C++定义
```

> 只能扩，不能缩
>
> 只增加`capacity`，不更改`size/length`

可以提前扩容（增加单次扩容的空间），减少单次扩容的次数（因为扩容也是费时间的）

```C++
string s1;
string s2.reserve(1000);
for(int i=0; i<500; i++)
{
  s1 += 'h';
  s2 += 'h';
}
//与s2相比，s1要扩容很多次，而s2提前开好了空间，不用每次都扩容了
```



### string::resize

更改大小/长度

```C++
void resize (size_t n);
void resize (size_t n, char c);
//将字符串大小调整为n个字符的长度。

//如果n小于当前字符串长度，则当前值缩短为第一个n个字符，删除n个字符。

//如果n大于当前字符串长度，则通过在末尾插入尽可能多的字符来扩展当前内容，以达到n的大小。如果指定了c，则新元素将初始化为c的副本，否则，它们是值初始化字符（空字符，即'\0'）。
```

> 更改的是`size`，既能扩，也能缩，并且会进行初始化
>
> 扩容的时候，可能会间接影响capacity，例如如果当前capacity小于n，则capacity也会被扩充
>
> > 本质是通过影响`size(长度)`来影响`capacity(容量)`，因为`capacity`始终要略大于`size`

```C++
string s1.= "a";//size=1,capacity>1(因为保存'\0'，再加上要内存对齐)
s1.reserve(10);//size=1,capacity=10
s1.resize(20,'x');//size=20,capacity>20(因为保存'\0'，再加上要内存对齐)
//s1:"axxxxxxxxxxxxxxxxxxxx"一个a，19个x
s1.resize(10);//size=10,capacity保持不变
//s1:"axxxxxxxxx"一个a，9个x
string s2;//size=0,capacity>=1
s2.resize(10);//size=10,capacty>10
//s2:"\0\0\0\0\0\0\0\0\0\0"10个'\0'
```



### 二者的区别与联系

`reserve`：开空间。本质只影响`capacity(容量)`
`resize`：开空间+初始化。本质是通过影响`size(长度)`来影响`capacity(容量)`

扩容时：
如果string中没有数据，`resize`会出初始化，填上指定字符或者'\0'
如果string已经存在数据了，`reserve`只扩容，不改变字符串；`resize`会在原有字符串后面填上指定字符或者'\0'

缩小时：
`reserve`不会缩小容量、大小，只能扩，不能缩
`resize`不会缩小容量，只会减小长度。将多余的字符删掉。因为resize影响的是size
二者都不会缩小capacity（注意，是一般情况下、某一版本的STL下。VS下是这样的，其他版本下，不好说）

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202403161541802.png" alt="截屏2024-03-16 15.40.15" style="zoom: 25%;" />

二者的常规用途就是：扩容

> 不初始化，就用`reserve`
>
> 初始化，就用`resize`

扩容都会多扩出一点，因为内存是要对齐的



## 尾插

### string::push_back尾插字符

```C++
void push_back (char c);//C++定义
```

### string::append尾插字符串/字符串对象

```C++
//C++98定义
string& append (const string& str);
//尾插string
string& append (const string& str, size_t subpos, size_t sublen);
//尾插string，规定从该字符串的起始下标subpos，长度sublen，若sublet大于该字符串的size，则直接用npos
string& append (const char* s);
//尾插C字符串
string& append (const char* s, size_t n);
//尾插C字符串指针的前n个字符
string& append (size_t n, char c);
//尾插n个相同的字符c
template <class InputIterator>   string& append (InputIterator first, InputIterator last);
```

### +=既可以尾插字符，也可以尾插字符串！



## string::insert

从任意位置插入字符/字符串

```C++
//C++98定义
 string& insert (size_t pos, const string& str);

 string& insert (size_t pos, const string& str, size_t subpos, size_t sublen);

 string& insert (size_t pos, const char* s);

 string& insert (size_t pos, const char* s, size_t n)
  
 string& insert (size_t pos, size_t n, char c);    
 void insert (iterator p, size_t n, char c);

iterator insert (iterator p, char c);

template <class InputIterator>  void insert (iterator p, InputIterator first, InputIterator last);
```

```C++
string s = "hello world";
s.insert(s.begin()+3, 'y');//"helylo world"
s.insert(3, 2, 'y');//"helyyylo world"
s.insert(s.begin(), "hello ");//"hello helyyylo world"
s.insert(3, "world");//"helworldlo helyyylo world"
s.insert(0, "hello ", 3, 3)//"lo helworldlo helyyylo world"
```

## string::earse

删除string内的某段子串

```C++
string& erase (size_t pos = 0, size_t len = npos);
//全缺省，清空整个字符串
//缺省第二个，从某个下标位置开始往后全部删除
iterator erase (iterator p);
//从开始位置一直到迭代器p的位置，都删除
iterator erase (iterator first, iterator last);
//开始位置迭代器，结束为止迭代器
```

```C++
string s = "hello world";
s.earse(s.begin()+1);//迭代器，从第二个元素开始往后全部删除
s.earse(s.begin() + 1, s.end() -1);//删除从第二个元素到最后一个元素
s.earse(0, s.size()-4);//删除从下标0开始到倒数第4个位置的全部元素（s.size()的值是有效元素个数，作为下标就是最后一个有效字符的下一个位置）
s.earse(3);//第二个参数缺省，缺省值为npos，nops=-1，即从下标3开始往后全部删除
```

## 

## string::clear

清空字符串，size=0，capacity不变



## swap 交换

### string::swap

```C++
void swap (string& str);//C++定义
//eg:
string s1 = "hello";
string s2 = "world";
s1.swap(s2);
```

实现方法，交换两个string的指针

### STL的全局函数std::swap

STL库中存在一个全局函数swap，在命名空间std中，支持任意两个相同类型的对象进行交换

实现方法，深拷贝

### 区别

string::swap效率高（交换指针）
swap效率低（深拷贝交换）



## string::find()

查找字符/字符串，从前向后正向找，找到最先匹配的字符/字符串，返回`size_t`类型的

> 被查找的(字符串的首)字符的下标 【找到了】
>
> npos 【没找到】

### string::rfind()

从后向前找，或者说找到最后匹配的字符/字符串，返回`size_t`类型的

> 被查找的(字符串的首)字符的下标 【找到了】
>
> npos 【没找到】



## string::substr

```C++
string substr (size_t pos = 0, size_t len = npos) const;//C++定义
```

从某个位置(pos)开始，取出长度为len的子串。不会影响远来的字符串，因为有`const *this`，规定了当前对象为const。



# 模拟实现

## 模拟实现拷贝构造函数

默认的拷贝构造函数是浅拷贝（值拷贝），会出现的问题是：1. 同一块空间会析构两次 2.其中一个改变会影响另外一个

> 一块空间只能析构一次

因此应完成深拷贝

```C++
//s2(s1)
string(const string& s)
  :_str(new char[strlen(s._str)+1])
{
      strcpy(_str,s._str);
}
```

> 为什么要`strlen(s._str) + 1`，因为strlen只获取字符串的有效字符个数，不获取字符串结尾符号`\0`
> 但是`strcpy`函数会把被拷贝的字符串`s._str`全部字符拷贝到`_str`，包括`\0`，因此要多开一位，避免造成`_str`容量不够，无法接纳`\0`

同理，赋值`=`的重定义也应该使用深拷贝

## 模拟实现赋值=运算符重载

```c++
//s1("hello world");
//s3("111111111");
//s1 = s3;
//面临的可能存在的问题：
//s3比s1小
//s3比s1大的太多了，以至于拷贝了s1之后s3剩余很多空间，浪费
string& operator = (const string& s) //引用返回
{
  //先判断一下是不是自己给自己赋值，如果自己给自己赋值，就不能delete自己了，因为清空之后要拷贝给自己清空后的自己
  	if(this != &s._str)//&为取地址
    {
      //所以，先将原来的字符串的空间释放掉，就避免了原字符串过大或过小的问题
      delete[] _str;
      _str = new char[(strlen(s._str) + 1];
      strcpy(_str, s._str);
    }                             
    return *this;
}
```

> 为什么选择引用返回：
> 传值返回：拷贝要返回的变量的值，返回拷贝出的临时变量。并且出了函数作用域，这个变量就失效了。
>
> 引用返回则是直接返回原本的这个变量本身，简单。
> 此处引用返回的是`*this`，this是指向当前对象的指针，*this就是当前对象，返回的是当前对象本身。
> 如果此处使用传值返回，那么需要先拷贝一个string对象，这个值是自定义的string类型，而自定义的拷贝是深拷贝，代价太大。
> 使用引用拷贝相当于直接对本对象进行修改然后返回本对象，不需要经过修改-拷贝一个临时对象-将临时对象赋值给当前对象的过程。
>
> 当然，返回类型应该也可以是void，不需要返回值，直接修改完当前对象即可。

与malloc不同，new动态开辟空间后不需要手动检查开辟是否成功，失败时new会自动抛出异常

清空`_str`写在了在开辟新空间之前，此处有一个小问题，如果new开辟空间失败，不仅无法成功拷贝，反而还先把原来的字符串`s1`清空了

针对这个问题，有人提出了改进，更改了一下代码的顺序，先new新对象并赋值给一个中间变量`p`，将被拷贝的字符串`s._str`拷贝给中间变量`p`，再清空原来的`_str`，最后将中间变量赋值给`_str`
这样如果开空间失败，会抛出异常终止程序执行，这一步会赶在清空原字符串之前

```C++
string& operator = (const string& s)
{
  	if(this != &s._str)
    {
      char* p = new char[(strlen(s._str) + 1];//先开空间
      strcpy(p, s._str);//拷贝给中间变量
      delete[] _str;//再清空
      _str = p;//最后赋值
    }                             
    return *this;
}
```

标准库里面resize()扩容的时候，capacity会多扩一些，因为涉及到内存对齐，比如扩容之后内存应该是是2的整数倍，则capacity为这个值-1(因为capacity是有效字符存储空间容量，不包含\0，而内存最后一个为\0)



## 模拟实现范围for

范围for本质就是底层被替换为迭代器以及其中的begin()和end()函数

就算是自己模拟实现的迭代器也是可以的。只要容器支持迭代器，就支持范围for

范围for在遍历的时候，如果不指明获取的元素为引用，则默认是迭代器的解引用的拷贝，即原string里面的元素的拷贝，更改这个值不影响原字符串
如果指明获取的元素为引用，则获取到的则是迭代器解引用的引用，更改这个值影响原字符串

```C++
s1 = "hello world";
//范围for不指明元素为引用
for(auto ch : s1) //此处auto智能匹配的是char
{
    ch -= 1;//更改一下获取到的元素的值
    cout << ch << ' ' << endl;
}
cout << s1 << endl;//s1的值没有改变
//范围for指明遍历的元素为引用
for(auto& ch : s1)
{
    ch -= 1;
    cout << ch << ' ' << endl;
} 
cout << s1 << endl;//s1的值改变了
```



<mark>**C++传参如果没有特殊需求，尽量使用引用传参，减少拷贝，如果要防止参数被修改，就加上const**</mark>

权限只能缩小或保持不变，不能放大

> 比如一个函数定义时形参写的是const，那么调用传参的时候，实参可以是加了const的也可以是不加const的
> 但是如果一个函数定义时形参写的是不加const的，调用的时候，实参就不能是const类型的，因为权限放大了
>
> ```C++
> void fun1(const char s)//参数要求是const类型的
> {
>     cout << "const in" << endl;
> }
> void fun2(char s)//参数没要求是const类型的
> {
> }
> 
> int main()
> {
>     char s1 = '1';
> 	const char s2 = '2';
>     
>     fun1(s1);//正确，权限缩小
>     fun1(s2);//正确，权限保持不变
>     fun2(s1);//正确，权限保持不变
>     fun2(s2);//错误，权限由const变成了一般，权限放大了
>     
>     return 0;
> }
> ```

所以有一些函数会提供两个版本，一个是const版本的，一个是没有const版本的。供不同情况下调用。
例如STL的string的标准库中，运算符`[]`重载函数就提供了两个版本:

```C++
char& operator[] (size_t pos);
const char& operator[](size_t pos) const;
```

> 前一个const指明返回值类型为const，后一个const指明此函数所在的对象是一个const类型的对象
> 相当于`const char& operator[](size_t pos, const string& *this)`

比如当创建了一个const类型的string对象时，因为该对象不能被修改，因此在使用重载运算符[]的时候，就只能使用const版本的，否则会发生权限放大

<mark>const对象不能调用非const的成员函数</mark>



## 模拟实现`<<`流插入运算符重载

```C++
ostream& operator<<(ostream& out, const string& s)
{ 	
   //第一种写法
   /* out << s.c_str();
    return out; */
    
    //第二种写法
    for(auto ch : s)
    {
        out << ch;
    }
    return out;
}
```

> 第一中写法是获取string的char*格式的字符串，然后打印
> 第二种写法是遍历整个string，然后逐个打印

第一种方式在遍历C格式的字符串的时候，遇到`\0`就会终止，认为字符串已经结束
第二种方式会遍历整个string

```C++
string s = "hello world";
s.push_back('\0');
s.push_back('\0');
s.push_bach('x');
cout << s << endl;
```

> 如果是第一种写法的话，打印出来只能打印`hello world`，因为后面遇到了`\0`，C字符串认定为终结符
>
> 第二种写法则会打印出`hello world    x`，因为是对于string整体做了一个遍历



## 模拟实现`>>`流提取运算符重载

```C++
istream& operator>>(istream& in, string& s)
{
    char ch;
    //in >> ch;
    ch = in.get();
    while(ch != ' ' && ch != '\n')
    {
        s += ch;//复用的模拟实现的+=重定向
        //in >> ch;
        ch = in.get();
    }
    return in;
}
```

> 此处从缓冲区获取字符的时候，使用的是`in.get()`而不是`in>>`，因为字符的流提取符`>>`将空格和换行认定为终结符，因此如果从通过`in>>`读取到缓冲区中读取到终结符，就终止读取了，ch获取不到这个终结符。
> 而`in.get()`是获取缓冲区中的(任何)一个字符，无论是不是终结符。这样就能确保ch拿到缓冲区里面的每一个字符，然后再判断时候终止循环。

```C++
cin >> s1;
cin >> s2;
//假设从键盘上键入"hello world"，按下回车
//如果采用in>>的方式，程序会继续等待输入，因为ch没有获取到终结符
//如果采用in.get()，s1获取的是hello，s2获取的是world，因为hello和world之间的空格作为终结符被读取到了。这是正确的
```

#### <mark>优化1：</mark>

如果键入的字符太多，当字符串s满了的时候，s+=每次都要扩一下容，效率不高

创建一个字符数组buff，先把获取到的字符放到字符数组中，等字符数组满了或者字符获取结束后，再将字符数组(其实就是C字符串) += 到字符串s里面去。如果字符数组满了，将内容放到字符串s之后，清空或重新初始化自己的内容，准备继续承接字符。

```C++
istream& operator>> (istream& in, string& s)
{
    char ch = in.get();
    char buff[128] = {'\0'};//假设先给定空间是128，先都初始化成\0
    size_t i = 0;//记录buff里面元素的个数
    while(ch != ' ' && ch != '\n')
    {
        buff[i++] = ch;//先使用字符数组承接缓冲区获取到的字符
        if(i == 127) //等于127因为最后一个位置要留一个\0作为字符串的结束符号
        {
            s += buff;//当字符数组满了，就将里面的内容加到字符串s中去
            memset(buff, '\0', 128);//重新初始化(使用memset函数填充128个\0)
            i = 0;//准备进行下一轮的承接
        }
    }
    s += buff;//可能buff没满，最后要把buff加到s后面去
    
    return in;
}
```

> 这样就避免了string字符串s频繁进行`+=`操作，减少了扩容次数，提高了效率

模拟实现`getline()`就是将上面while循环里面的空格判断删除，只让换行符作为终结符

#### <mark>优化2</mark>：

STL中的string在流提取时，如果原string有内容，则会被新获取的内容覆盖掉

```c++
std::string s = "hello";
std::cin >> s;
//如果输入world
std::cout << s << endl;//此处输出的是world
```

因此模拟实现中也要先将原来的字符串清空一下才可以

```C++
void clear()
{
    _str[0] = '\0';
    _size = 0;
    //清空很简单，把终结符放最前面，然后有效字符个数至0即可
}

istream& operator>> (istream& in, string& s)
{
    s.clear();
   .....
   .....
    return in;
}
```



## 现代写法
