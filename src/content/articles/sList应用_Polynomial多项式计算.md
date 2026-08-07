---
title: 数据结构_线性表应用_多项式的计算
date: '2023-2-21 8:47'
tag:
  - 数据结构
  - Cpp
category:
  - 数据结构
  - Cpp
abbrlink: 4618b828
---

## 数据结构_线性表的应用-多项式的计算

> 前言：此类笔记仅用于个人复习，内容主要在于记录和体现个人理解，详细还请结合bite课件、录播、板书和代码。

---

[toc]

---

### 一元多项式(polynomial)的加法

#### 数学表示方法

> 一元多项式通常按幂升序排列，在数学上表示为：
>
> p~n~(x) =p~0~ + p~1~x + p~2~x^2^ + p~3~x^3^ + p~4~x^4^ + p~5~x^5^ +.... + p~n~x^n^

#### 计算机内实现

> 在计算机内实现的话，可以使用线性表来存储，每个结点内存储两个成员：data数据、next指针，data数据包括单项式的系数和次数
>
> 且是按照次数的升序来进行存储的
>
> 《《此处应有图片，参考课本图2-18

##### 数据的存放方法

> 如果不论次数是否为0都将数据存储进结点，那么有可能会造成空间的大量浪费,比如1 + x^100^
>
> 如果只存储次数不为0的单项式，不会造成空间的浪费，但是考虑到两个多项式相加，次数相同的多项式需要合并在一起，这种存储方式可能需要花费一些时间来寻找两个多项式里的相同次数的单项式

##### 数据结构的选择

> 1. 不用多说必须使用动态内存，静态内存会造成空间不够或者空间浪费的情况
> 2. 数据结构选择链表，顺序表动态开辟内存是成倍开辟，会造成空间浪费

#####   一元多项式以及基本操作的实现

**polynomial.h**

> ~~~C++
> #include"sList.h"
> ~~~
>
> 数据结构是链表，要包含链表的头文件
>
> (不过说实话，好像并没有用上链表的功能，只是用了链表作为结构体，除了用到了sList头问价中的#include<iostream>以及using namespace std之外好像啥也没用上)
>
> **组成多项式的基本单位：单项式结点**
>
> ~~~~ cpp
> struct Type
> {
> 	int coef;//系数
> 	int exp;//次数
> };
> 
> template<class elemType>
> struct Node
> {
> 	elemType data;//数据
> 	Node* next;//下一个结点
> };
> ~~~~
>
> 在这里，次数和系数被存放在了结构体Type
>
> 结点Node包括data和next，因为用的模板，所以data适用于任何数据类型，当然也包括Type
>
> 不是直接将次数和系数放到Node里是为了Node的复用性，Node作为链表结点只包含data和next两个成员
>
> > 这里既可以使用结构体也可以使用类，因为在C++中，类和结构体的唯一区别就是类的成员默认是私有的，结构体的默认是公有的（下面的也是
>
> **多项式及其加法的构想**
>
> *多项式的构想：*
>
> 构建一个多项式就是输入每一个单项式的系数和次数，等到所有的单项式都输入完毕，多项式就构建好了
>
> 但是单项式一个一个输入比较麻烦，可以一口气全部输入完，最后输入一个结束标志表示所有的单项式都输入完了，停止多项式的构建
>
> 每个单项式含有两个数据，那就将输入的这一串数字每两个写入一个Node中，如果读取到的两个数字跟结束标志相符，则说明多项式构建好了
>
> 由于写入多项式的前提是已知所有单项式的系数和次数，只要把不是次数和系数的组合的两个数作为结束标志就可以了
>
> 
>
> *加法的构想：*
>
> 用a、b表示两个相加的多项式，用另一个多项式c作为多项式相加的结果
>
> 如果a、b多项式里有同类相，要合并之后作为结果，没有同类相的单项式直接作为结果
>
> 
>
> **多项式及加法的实现**
>
> *多项式类（结构体）的定义*
>
> ~~~cpp
> template <class elemType>
> struct Polynomial
> {
> private:
> 	Node<elemType>* head;
> 	elemType stop_flag;//多项式结束标志，用作判断多项式是否结束
> public:
> 	Polynomial(const elemType& stop);
> 	void getPoly();//读入一个多项式
> 	void addPoly(const Polynomial& a, const Polynomial& b);//相加函数
> 	void dispPoly();//显示一个多项式
> 	void clear();//释放多项式空间（清空多项式,仅保留头结点
> 	~Polynomial() { clear(); delete head; };//销毁所有动态内存
> };
> ~~~
>
> 数据成员只需要有头和结束标志就可以，头是链表的头，有了头就可以找到链表的所有数据；结束标志用来判断多项式是否结束
>
> *获取多项式结束标志*
>
> ~~~cpp
> //getStop为外部函数，是非类成员函数
> template <class elemType>//从用户处获取结束标志
> void getStop(elemType& stopFlag)
> {
> 	int c, e;
> 	cout << "请输入系数、指数对作为结束标志，如'0 0'" << endl;
> 	cin >> c >> e;
> 	stopFlag.coef = c;
> 	stopFlag.exp = e;
> }
> ~~~
>
> 不同的多项式的结束标志是可以相同的，获取一次结束标志就可以供所有多项式使用，因此没有必要将其作为成员函数

*个人认为这里有点强行构建模板类*

在使用的时候，其实elemType只能是Type结构体或者Node结构体，因为在各个模板类和模板函数中，都用到了elemType的成员coef和exp，或者elemType的成员head，只有Type具有成员coef和exp，只有Node有head，直接使用具体的变量类型不更简单吗

而且这个是多项式的加法，并不会封装用于其他变量

相反，多项式的次数和系数更应该使用eleType或者直接用double，因为可能不止整型

**polynomial.cpp**

> ~~~C++
> #include "polynomial.h"
> ~~~
>
> ~~~cpp
> template <class elemType>
> Polynomial<elemType>::Polynomial(const elemType &stop) //从用户处获取结束标志并初始化多项式
> {
>     head = new Node<elemType>();
>     stop_flag.coef = stop.coef;
>     stop_flag.exp = stop.exp;
> }
> ~~~
>
> ~~~cpp
> template <class elemType>
> void Polynomial<elemType>::getPoly() //读入一个多项式
> {
>     Node<elemType> *p, *next;
>     elemType e;
> 
>     p = head;
>     cout << "请按照升幂的顺序输入系数、次数对，并最后输入结束标志作结尾结束多项式的输入" << endl;
>     cin >> e.coef >> e.exp;
> 
>     while (e.coef != stop_flag.coef || e.exp != stop_flag.exp) //先判断有没有到多项式的结尾
>     {
>         next = new Node<elemType>(); //不断创建新结点来保存数据
>         next->data.coef = e.coef;
>         next->data.exp = e.exp;
> 
>         p->next = next; // p接上新结点
>         p = next;       // p后移
> 
>         cin >> e.coef >> e.exp;
>     }
> }
> ~~~
>
> 这里注意，在判断有没有到多项式结尾的时候的条件，是系数和次数同时一一等于结束标志对，即e.coef == stop_flag.coef && e.exp == stop_flag.exp，换做while循环的条件就是：次数或系数有一个不同于结束标志就可以进入循环
>
> 也可以写成这样:
>
> While(1）
>
> {
>
> ​	if(e.coef == stop_flag.coef && e.exp == stop_flag.exp)
>
> ​	break;
>
> ..........
>
> }
>
> 直接在while处进行判断比较简便，但是要注意条件不要出错
>
> ~~~cpp
> template <class elemType>
> void Polynomial<elemType>::addPoly(const Polynomial &a, const Polynomial &b) //相加函数,a、b分别就是两个要相加的多项式
> {
>     Node<elemType> *pa, *pb, *pc; //分别用在a、b、c三个链表上
>     Node<elemType> *New;          //创建新结点，用来保存结果并插入到多项式c中
>     pa = a.head->next, pb = b.head->next;
>     pc = head; //说明正在调用这个相加函数的对象是第三个多项式
> 
>     while (pa && pb) //如果a、b两个多项式都没有走完
>     {
>         if (pa->data.exp == pb->data.exp)
>         {
>             if (pa->data.coef + pb->data.coef == 0)
>             {
>                 pa = pa->next;
>                 pb = pb->next;
>                 continue;
>             }
>             else
>             {
>                 New = new Node<elemType>();
> 
>                 New->data.coef = pa->data.coef + pb->data.coef;
>                 New->data.exp = pa->data.exp;
> 
>                 pa = pa->next;
>                 pb = pb->next;
>             }
>         }
>         else if (pa->data.exp > pb->data.exp)
>         {
>             New = new Node<elemType>();
> 
>             New->data.coef = pb->data.coef;
>             New->data.exp = pb->data.exp;
> 
>             pb = pb->next;
>         }
>         else
>         {
>             New = new Node<elemType>();
> 
>             New->data.coef = pa->data.coef;
>             New->data.exp = pa->data.exp;
> 
>             pa = pa->next;
>         }
>         New->next = NULL; //将相加的结果作为新结点尾插到c中
>         pc->next = New;
>         pc = New;
>     }
>     //跳出第一个whlie循环说明a、b中至少一个走完了
> 
>     while (pa) //如过a没走完
>     {
>         New = new Node<elemType>();
> 
>         New->data.coef = pa->data.coef;
>         New->data.exp = pa->data.exp;
>         New->next = NULL;
> 
>         pc->next = New;
>         pc = New;
> 
>         pa = pa->next;
>     }
> 
>     while (pb) //如过b没走完
>     {
>         New = new Node<elemType>();
> 
>         New->data.coef = pb->data.coef;
>         New->data.exp = pb->data.exp;
>         New->next = NULL;
> 
>         pc->next = New;
>         pc = New;
> 
>         pb = pb->next;
>     }
> }
> ~~~
>
> ~~~cpp
> template <class elemType>
> void Polynomial<elemType>::dispPoly() //显示一个多项式
> {
>     Node<elemType> *p;
>     p = head->next;
> 
>     if (!p)
>     {
>         cout << "多项式为空" << endl;
>         return;
>     }
> 
>     cout << "多项式系数指数对分别为" << endl;
>     while (p)
>     {
>         cout << p->data.coef << " " << p->data.exp << endl;
>         p = p->next;
>     }
>     cout << "到此结束" << endl;
> }
> ~~~
>
> ~~~cpp
> template <class elemType>
> void Polynomial<elemType>::clear() //释放多项式空间（清空多项式,仅保留头结点
> {
>     Node<elemType> *p = head->next;
> 
>     while (p)
>     {
>         head->next = p->next;
>         delete p;
>         p = head->next;
>     }
> }
> 

测试用例test.cpp

~~~cpp
#include "polynomial.cpp"
int main()
{
    Type stop_flag;
    getStop(stop_flag);

    Polynomial<Type> a(stop_flag), b(stop_flag), c(stop_flag);

    a.getPoly();
    b.getPoly();

    c.addPoly(a, b);
    c.dispPoly();

    return 0;
}
~~~

a=7+3x+9x^8^+5x^17^

b=8x+22x^7^-9x^8^

结果c应该是7+11x+22^7^+5x^17^

#### 结束

That's all, thanks for reading!💐

