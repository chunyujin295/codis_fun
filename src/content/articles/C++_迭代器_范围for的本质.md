---
title: C++_迭代器&范围for的本质
date: '2024-10-14 13:27'
tag:
  - C++
  - C++STL
category:
  - 编程日志
  - C&C++
abbrlink: 874d4093
---



### [迭代器(iterator)](http://c.biancheng.net/view/338.html)

#### 什么是迭代器

迭代器与容器的关系，相当于指针与数组的关系

因为容器是封装起来的，不知道内部是如何实现的，所以通过在内存中的地址的原理访问和遍历容器，一般来说是不实际的



要访问容器(顺序容器、关联容器)中的元素，就需要通过迭代器进行；就如同访问数组中的元素需要通过指针进行一样

用迭代器访问元素的操作也和用指针访问数组的操作很像



迭代器按照定义方式分成以下四种

> 1) 正向迭代器，定义方法如下：
>
>    ```cpp
>    容器类名::iterator 迭代器名;
>    ```
>
> 2) 常量正向迭代器，定义方法如下：
>
>    ```cpp
>    容器类名::const_iterator 迭代器名;
>    ```
>
> 3) 反向迭代器，定义方法如下：
>
>    ```cpp
>    容器类名::reverse_iterator 迭代器名;
>    ```
>
> 4) 常量反向迭代器，定义方法如下：
>
>    ```cpp
>    容器类名::const_reverse_iterator 迭代器名;
>    ```



#### 迭代器用法示例

通过迭代器可以读取它指向的元素，`*迭代器名`就表示迭代器指向的元素。通过非常量迭代器还能修改其指向的元素。

迭代器都可以进行`++`操作。反向迭代器和正向迭代器的区别在于：

- 对正向迭代器进行`++`操作时，迭代器会指向容器中的后一个元素；
- 而对反向迭代器进行`++`操作时，迭代器会指向容器中的前一个元素。




下面的程序演示了如何通过迭代器<mark>遍历一个 vector 容器</mark>中的所有元素

```cpp
#include <iostream>
#include <vector>
using namespace std;
int main()
{
    vector<int> v;  //v是存放int类型变量的可变长数组，开始时没有元素
    for (int n = 0; n<5; ++n)
        v.push_back(n);  //push_back成员函数在vector容器尾部添加一个元素
  
    vector<int>::iterator i;  //定义正向迭代器
    for (i = v.begin(); i != v.end(); ++i) //用迭代器遍历容器
    {  
        cout << *i << " ";  //*i 就是迭代器i指向的元素
        *i *= 2;  //每个元素变为原来的2倍
    }
    cout << endl;
  
    //用反向迭代器遍历容器
    for (vector<int>::reverse_iterator j = v.rbegin(); j != v.rend(); ++j)
        cout << *j << " ";
    return 0;
}
```

> 程序的输出结果是：
> 0 1 2 3 4
> 8 6 4 2 0
>
> 第 6 行，vector 容器有多个构造函数，如果用无参构造函数初始化，则容器一开始是空的。
>
> 第 10 行，begin 成员函数返回指向容器中第一个元素的迭代器。++i 使得 i 指向容器中的下一个元素。end 成员函数返回的不是指向最后一个元素的迭代器，而是指向最后一个元素后面的位置的迭代器，因此循环的终止条件是`i != v.end()`。
>
> 第 16 行定义了反向迭代器用以遍历容器。反向迭代器进行`++`操作后，会指向容器中的上一个元素。rbegin 成员函数返回指向容器中最后一个元素的迭代器，rend 成员函数返回指向容器中第一个元素前面的位置的迭代器，因此本循环实际上是从后往前遍历整个数组。
>
> 如果迭代器指向了容器中最后一个元素的后面或第一个元素的前面，再通过该迭代器访问元素，就有可能导致程序崩溃，这和访问 NULL 或未初始化的指针指向的地方类似。
>
> 第 10 行和第 16 行，写`++i`、`++j`相比于写`i++`、`j++`，程序的执行速度更快。
>
> 回顾`++`被重载成前置和后置运算符的例子如下：
>
> ```cpp
> CDemo CDemo::operator++ ()
> {  //前置++
>     ++n;
>     return *this;
> }
> CDemo CDemo::operator ++(int k)
> {  //后置++
>     CDemo tmp(*this);  //记录修改前的对象
>     n++;
>     return tmp;  //返回修改前的对象
> }
> ```
>
> 后置`++`要多生成一个局部对象 tmp，因此执行速度比前置的慢。同理，迭代器是一个对象，[STL](http://c.biancheng.net/stl/) 在重载迭代器的`++`运算符时，后置形式也比前置形式慢。在次数很多的循环中，`++i`和`i++`可能就会造成运行时间上可观的差别了。因此，本教程在前面特别提到，对循环控制变量i，要养成写`++i`、不写`i++`的习惯。

注意，容器适配器 stack、queue 和 priority_queue 没有迭代器。容器适配器有一些成员函数，可以用来对元素进行访问。





#### 迭代器的功能分类

不同容器的迭代器，其功能强弱有所不同。容器的迭代器的功能强弱，决定了该容器是否支持 STL 中的某种算法。例如，排序算法需要通过随机访问迭代器来访问容器中的元素，因此有的容器就不支持排序算法。

常用的迭代器按功能强弱分为输入、输出、正向、双向、随机访问五种，这里只介绍常用的三种。

>1. 正向迭代器。假设 p 是一个正向迭代器，则 p 支持以下操作：++p，p++，*p。此外，两个正向迭代器可以互相赋值，还可以用`==`和`!=`运算符进行比较。
>
>2. 双向迭代器。双向迭代器具有正向迭代器的全部功能。除此之外，若 p 是一个双向迭代器，则`--p`和`p--`都是有定义的。`--p`使得 p 朝和`++p`相反的方向移动。
>
>3. 随机访问迭代器。随机访问迭代器具有双向迭代器的全部功能。若 p 是一个随机访问迭代器，i 是一个整型变量或常量，则 p 还支持以下操作：
>  - p+=i：使得 p 往后移动 i 个元素。
>  - p-=i：使得 p 往前移动 i 个元素。
>  - p+i：返回 p 后面第 i 个元素的迭代器。
>  - p-i：返回 p 前面第 i 个元素的迭代器。
>  - p[i]：返回 p 后面第 i 个元素的引用。
>
>
>
>此外，两个随机访问迭代器 p1、p2 还可以用 <、>、<=、>= 运算符进行比较。`p1<p2`的含义是：p1 经过若干次（至少一次）`++`操作后，就会等于 p2。其他比较方式的含义与此类似。
>
>==对于两个随机访问迭代器 p1、p2，表达式`p2-p1`也是有定义的，其返回值是 p2 所指向元素和 p1 所指向元素的序号(下标)之差（也可以说是 p2 和 p1 之间的元素个数减一）。==
>
>> 例如在vector中返回某个元素的下标
>>
>> ```cpp
>> #include <iostream>//std::cout
>> #include<vector>//std::vector
>> using namespace std;
>> int main()
>> {
>> 	vector<int> temp = { 1, 3, 2, 4, 5, 0 };
>> 	vector<int>::iterator it = temp.begin();
>> 	it += 2;//p+=i
>> 	//此时it对应的元素下标为
>> 	int index = it - temp.begin();//p2-p1
>> 	cout << index;
>> }
>> ```
>>
>> 输出2


不同容器的迭代器的功能:

| 容器           | 迭代器功能   |
| -------------- | ------------ |
| vector         | 随机访问     |
| deque          | 随机访问     |
| list           | 双向         |
| set / multiset | 双向         |
| map / multimap | 双向         |
| stack          | 不支持迭代器 |
| queue          | 不支持迭代器 |
| priority_queue | 不支持迭代器 |



> vector 的迭代器是随机迭代器，因此<mark>遍历 vector 容器</mark>有以下几种做法。下面的程序中，每个循环演示了一种做法。
>
> ```cpp
> #include <iostream>
> #include <vector>
> using namespace std;
> int main()
> {
>     vector<int> v(100); //v被初始化成有100个元素
>     for(int i = 0;i < v.size() ; ++i) //size返回元素个数
>         cout << v[i]; //像普通数组一样使用vector容器
>   
>   
>     vector<int>::iterator i;
>     for(i = v.begin(); i != v.end (); ++i) //用 != 比较两个迭代器
>         cout << * i;
>   
>     for(i = v.begin(); i < v.end ();++i) //用 < 比较两个迭代器
>         cout << * i;
>   
>     i = v.begin();
>     while(i < v.end()) { //间隔一个输出
>         cout << * i;
>         i += 2; // 随机访问迭代器支持 "+= 整数"  的操作
>     }
> }
> ```



> list 容器的迭代器是双向迭代器。
>
> 假设 v 和 i 的定义如下：
>
> ```cpp
> list<int> v;
> list<int>::const_iterator i;
> ```
>
> 则以下代码是合法的：
>
> ```cpp
> for(i=v.begin(); i!=v.end(); ++i)
>   cout << *i;
> ```
>
> 以下代码则不合法：
>
> ```cpp
> for(i=v.begin(); i<v.end(); ++i)
>   cout << *i;
> ```
>
> 因为双向迭代器不支持用 “<” 进行比较。以下代码也不合法：
>
> ```cpp
> for(int i=0; i<v.size(); ++i)
>   cout << v[i];
> ```
>
> 因为 list 不支持随机访问迭代器的容器，也不支持用下标随机访问其元素。



**==在 [C++](http://c.biancheng.net/cplus/) 中，数组也是容器。数组的迭代器就是指针，而且是随机访问迭代器。例如，对于数组 int a[10]，int * 类型的指针就是其迭代器。则 a、a+1、a+2 都是 a 的迭代器。==**



#### 迭代器的辅助函数(好用)

STL 中有用于操作迭代器的三个函数模板

> ```cpp
> advance(p, n) 
> ```
>
> 使迭代器 p 向前或向后移动 n 个元素。
>
> ```cpp
> distance(p, q)
> ```
>
> 计算两个迭代器之间的距离，即迭代器 p 经过多少次 + + 操作后和迭代器 q 相等。如果调用时 p 已经指向 q 的后面，则这个函数会陷入死循环。
>
> ```cpp
> iter_swap(p, q)
> ```
>
> 用于交换两个迭代器 p、q 指向的值


要使用上述模板，需要包含头文件 algorithm。下面的程序演示了这三个函数模板的 用法。

```cpp
#include <list>
#include <iostream>
#include <algorithm> //要使用操作迭代器的函数模板，需要包含此文件
using namespace std;
int main()
{
    int a[5] = { 1, 2, 3, 4, 5 };
    list <int> lst(a, a+5);
    list <int>::iterator p = lst.begin();
  
    advance(p, 2);  //p向后移动两个元素，指向3
    cout << "1)" << *p << endl;  //输出 1)3
  
    advance(p, -1);  //p向前移动一个元素，指向2
    cout << "2)" << *p << endl;  //输出 2)2
  
    list<int>::iterator q = lst.end();
  
    q--;  //q 指向 5
    cout << "3)" << distance(p, q) << endl;  //输出 3)3
  
    iter_swap(p, q); //交换 2 和 5
    cout << "4)";
  
    for (p = lst.begin(); p != lst.end(); ++p)
        cout << *p << " ";
    return 0;
}
```

程序的输出结果是：
\1) 3
\2) 2
\3) 3
\4) 1 5 3 4 2



#### 返回 随机访问迭代器中某个元素的 位置(序号)(下标)

方法1⃣️用循环，从第1个元素开始找，直到找到对应的元素，返回下标

方法2⃣️利用[find函数](http://c.biancheng.net/view/7489.html)，找到对应元素的迭代器，利用["两个随机访问迭代器相减，返回值是两个迭代器对应的元素的序号(下标)之差"](#迭代器的功能分类)，用该元素的迭代器减去容器首元素迭代器，返回值就是该元素的下标

```cpp
//例如：
#include <iostream>//std::cout
#include<vector>//std::vector
#include<algorithm>//std::find()

using namespace std;
int main()
{
	vector<int> temp = { 1, 3, 2, 4, 5, 0 };
	vector<int>::iterator it = find(temp.begin(), temp.end(), 5);//value为要查找的值，该函数返回一个指向对应元素的迭代器

//此时it对应的元素下标为
	int index = it - temp.begin();
	cout << index;
	
	return 0;
}

```



find函数是algorithm的库函数

find() 函数本质上是一个模板函数，用于在指定范围内查找和目标元素值相等的第一个元素。

如下为 find() 函数的语法格式：

```cpp
InputIterator find (InputIterator first, InputIterator last, const T& value);
```

其中，first 和 last 为输入迭代器，[first, last) 用于指定该函数的查找范围；value 为要查找的目标元素。

> 正因为 first 和 last 的类型为输入迭代器，因此该函数适用于所有的序列式容器。

该函数会**返回**一个<u>输入迭代器</u>，当 find() 函数查找成功时，其指向的是在 [first, last) 区域内查找到的第一个目标元素；如果查找失败，则该迭代器的指向和 last 相同。

> 例如查找vector的元素时，first是vector.begin()，end是vector.end()
>
> >  vector.end()是指向容器的最后一个元素之后的/0

值得一提的是，find() 函数的底层实现，其实就是用`==`运算符将 val 和 [first, last) 区域内的元素逐个进行比对。这也就意味着，[first, last) 区域内的元素必须支持`==`运算符。

举个例子：

```cpp
#include <iostream>     // std::cout
#include <algorithm>    // std::find
#include <vector>       // std::vector
using namespace std;
int main()
{
	//find() 函数作用于普通数组
	char stl[] = "http://c.biancheng.net/stl/";
	//调用 find() 查找第一个字符 'c'
	char *p = find(stl, stl + strlen(stl), 'c');
	//判断是否查找成功
	if (p != stl + strlen(stl))
	{
		cout << p << endl;
	}
	
	//find() 函数作用于容器
	std::vector<int> myvector{ 10, 20, 30, 40, 50 };
	std::vector<int>::iterator it;

	it = find(myvector.begin(), myvector.end(), 30);
	if (it != myvector.end())
		cout << "查找成功：" << *it;
	else
		cout << "查找失败";
	return 0;
}
```

程序执行结果为：

```
c.biancheng.net/stl/
查找成功：30
```

可以看到，find() 函数除了可以作用于序列式容器，还可以作用于普通数组(因为在C++中普通数组也是容器)



> 补充：find() 函数的底层实现，C++ 标准库中给出了参数代码:
>
> ```cpp
> template<class InputIterator, class T>
> InputIterator find(InputIterator first, InputIterator last, const T& val)
> {
> 	while (first != last)
> 	{
> 		if (*first == val) return first;
> 		++first;
> 	}
> 	return last;
> }
> ```



#### 迭代器的好处

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202212031252529.png" alt="截屏2022-12-03 12.51.56" />

#### 迭代器可以使用auto，更简便

```c++
string s("hello world");
string::iterator it1 = s.begin();
auto it2 = s.begin();
//二者是等同的
```

#### C++11范围for本质上就是替代了范围for

从汇编上就可以看出来

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/%E8%8C%83%E5%9B%B4for%E6%9C%AC%E8%B4%A8%E4%B8%8A%E5%B0%B1%E6%98%AF%E6%9B%BF%E4%BB%A3%E4%BA%86%E8%BF%AD%E4%BB%A3%E5%99%A8(%E4%BB%8E%E6%B1%87%E7%BC%96%E5%B0%B1%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%87%BA%E6%9D%A5).png" alt="范围for本质上就是替代了迭代器(从汇编就可以看出来)" />
