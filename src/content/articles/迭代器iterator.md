---
title: 迭代器iterator
date: '2024-3-17 10:10'
tag:
  - Cpp
category:
  - Cpp
abbrlink: 1261762c
---

## 迭代器iterator的使用

迭代器iterator是一个额外的、独立数据结构，存在于STL库中。专门用于访问STL中各个数据结构中的元素。

(可以朴素地认为迭代器就是指针)

> 使用迭代器访问元素，和使用方括号[]加下标的效果一样，<mark>都是获取元素的引用</mark>，可读可写
>
> 但是方括号是对象本身的数据结构自带的(通过重构)，而迭代器是不属于被访问的对象的，一个单独的数据结构
>
> >  当一个对象为const时，为只可读的，此时还是可以通过方括号下标访问(因为通常会重构一个const类型的方括号)，只要不对访问到的元素进行修改即可
> >  但是已经不能使用普通迭代器访问了，因此使用迭代器访问元素，本质上是使用一个数据结构A(iterator)访问另一个数据结构B(被访问的对象)中的元素，而非数据结构B直接调用自己的成员函数访问自己
> >
> >  因此就算数据结构B设置为const，但是外部的迭代器仍有写的权限，这是不合理的。此处应使用const_iterator



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
> cout<<*it_left<<" ";
> }
> //遍历方式4
> for(; it_left != s1.end(); it_left++;)
> {........}
> ```

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

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202403161625553.png" alt="截屏2024-03-16 11.08.56" style="zoom: 33%;" />

**普通反向迭代器 reverse_iterator**

与正向迭代器的起点、终点、移动方向正好相反

```C++
string::reverse_iterator re_it_left = s1.rbegin();//获取最后一个有效元素
string::reverse_iterator re_it_right = s1.rend();//获取首元素的前一个位置
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202403161625631.png" alt="截屏2024-03-16 11.09.50" style="zoom:33%;" />

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



## 