---
title: C++_auto关键字
date: '2022-12-4 23:02'
tag:
  - C++
  - C++STL
category:
  - 编程日志
  - C&C++
abbrlink: b4979a36
---



[auto关键字(类型推导)](http://c.biancheng.net/view/3718.html)

当STL的模板类型实例化的时候，如果实例化的类型是模版类型，那么使用迭代器是会报错的

比如

```cpp
template<class T>
void a()
{
		vector<int> i;//vecter的实例化类型是int
		vector<T> v;//vector的实例化类型是模版类型T
		
		vector<int>::iterator I = i.begin();//正确
  	veector<T>::iterator V = v.begin();//报错		
}
```

> 因为在模板参数T实例化之前，模板类型为int的vector明确了自己的类型就是int，故迭代器可以根据类型执行相应的关于空间的操作。而模版类型为T的vector尚不知道T究竟是什么类型，所以迭代器无法通过类型来执行操作

auto关键字是在程序编译时自动推导出变量的类型，可以很自然地和泛型编程结合而不用去提前考虑变量的类型

```cpp
template<class T>
void a()
{
		vector<T> v;//vector的实例化类型是模版类型T
		
  	auto V = v.begin();//正确		
}
```

> auto会在最后编译的时候，会判断变量的类型。在编译时，一旦调用函数，T类型就已经实例化，并且v是vector，vector.begin()函数返回的就是vector的迭代器，因此编译器会推导出此时V的类型
>
> ==因此auto可以将泛型编程(模板)跟STL很好地结合==

![iShot_2022-12-04_13.40.14](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202212041341428.png)