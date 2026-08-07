---
title: 模版template
date: '2024-3-17 10:12'
tag:
  - Cpp
category:
  - Cpp
abbrlink: b742e110
---

# 模板

模板可用应用于函数，也可应用于类。
应用于函数的为函数模板，应用于类的为类模板。

### 模板参数--很多地方和函数参数类似

函数参数：传递的是对象值

模板参数：传递的是类型

### 函数模板的类型一般是编译器根据实参传递给形参的类型推演出来的，但是也有推演不出来的时候：

例1:

```C++
template < class T >
T *func(int n)
{
    return new T[n];
}

int main()
{
    int *p = func(10);
    return 0;
}
```

> 推到不出来模板参数T的类型，因为模板参数应用在了返回值类型上
> 没有办法通过传参判断出来模板参数的类型

#### 此时应显式指定模板参数类型，“函数模板显式实例化”：

```C++
int main()
{
    int *p1 = func<int>(10);
    double *p2 = func<double>(10);
    return 0;
}

//类似于使用vector的时候，需要显式指定vector元素的类型
```



例2:

```C++
template <class T>
T Add(const T &left, const T &right)
{
  return left + right;
}

int main()
{
  int a = 10;
  double b = 1.0;
  
  Add(a,b);//报错，因为无法推演出模版参数T到底是什么类型，到底是int还是double
  //解决方式1，显式实例化
  Add<int>(a,b);//其实上面一行的实例化方式就是隐式实例化
  //解决方式2，强制类型转换
  Add(a,(int)b);
  
  return 0;
}
```



### 模板参数也可以缺省(用的比较少)：

```C++
template <class T = char> //缺省值为char
T *func(int n)
{
    return new T[n];
}

int main()
{
    char *p = func('1');//此时不用函数模板显式实例化也可以了
    return 0;
}
```



## 模版的声明、定义可以分离

但是每个定义、声明前都要重新规定一下模版参数(的名称)

```C++
template <class T>
void func(T a);//声明

template <class N>
void func(N a)//定义的时候要重新规定一下模版参数，模版参数名可以和声明时不一样
{
  cout << a <<endl;
}
```

### 《但是模版不支持声明和定义分离到两个文件！！》

<mark>会报编译错误</mark>

> 此种情况都是对于分离式编译来说的
>
> 通常来讲，分离式编译有三类文件，包含程序入口main函数的文件(暂且称之为main文件)、包含自定义对象和函数声明的自定义头文件(暂且称之为头文件)、实现头文件中的对象和函数的cpp文件(暂且称之为实现文件)
>
> 一般是main文件和实现文件都包含头文件，然后通过实现文件实现头文件。最后链接到一起。
>
> >  当然，main文件不要包含实现文件，否则不叫分离编译了
> >
> > 若实现文件被包含在了main文件中，展开后还是都在了main文件，最后结果还是声明、实现都在同一个文件也就是main文件中，并没有分离开来
> >
> > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202403142102014.png" alt="截屏2024-03-14 21.01.44" style="zoom:50%;" />
>
> 此处指的声明和定义分离，就是指声明在头文件中，实现/定义在实现文件中。



**为什么模版的声明和定义分离到2个文件中就会报编译错误？**

符号表找不到（编译原理会提到）

> 程序编译的过程：
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202403142108822.png" alt="截屏2024-03-14 21.07.22" style="zoom: 33%;" />
>
> 而模版参数只有在实例化的时候，才能借由实参传递形参推演出来参数类型，故在链接之前，负责模版实现的.cpp文件无法单独推演出模版参数（因为模版实例化是在main.cpp中进行的，此时都处在链接之前，都是分别独立处理的），因此负责实现的.cpp文件无法编译通过
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202403142117386.png" alt="截屏2024-03-14 21.16.26" style="zoom: 67%;" />

### 解决方式

#### 方案一(比较挫)：在用于实现模版的.cpp中针对main中要使用的模版类型显式实例化

比如已知main.cpp中调用了函数模版，并且实例化参数为char

```C++
//main.cpp
#include "test.h"
......
......
int main()
{
  char a = '1';
  func(a);
  return 0;
}
```

那么就在实现的.cpp中显式实例化一个出一个char类型的模版

```C++
//test.cpp
#include "test.h"

template <class T>
void func(T a)
{
  cout << a << endl;
}

template
void func<char> (char a);//在此显式实例化一下（注意上一行中要加上template，这是固定格式
```

#### 方案二：声明和定义不分离，将模版的实现写在声明的头文件里，文件后缀命名为.hpp(建议)

后缀名建议更改，并不是强制更改，文件名后缀本质上对于文件没有任何影响，.cpp .h .hpp没有本质上的区别

[头文件和源文件的区别](ttps://chunyujin.top/chunyujin/7c16d58)

.hpp 只是寓意更好，是.h和.cpp拼接成的，也就是“既有定义又有实现”的意思

## 调用顺序

在调用函数/实例化对象的时候，如果有已定义好的、(参数类型)更精确的，先调用已定义好的

没有，才调用模版，进行推演

若就是想强制指定调用模版，则调用时使用显式实例化

```C++
Add<int>(a,b);
```

