---
title: 数据结构_队列（C++
date: '2023-2-21 8:47'
tag:
  - 数据结构
  - Cpp
category:
  - 数据结构
  - Cpp
abbrlink: 9536edd6
---

### 数据结构_队列（C++实现

> 前言：此类笔记仅用于个人复习，内容主要在于记录和体现个人理解，详细还请结合bite课件、录播、板书和代码。

[toc]

#### 前言

> 没什么好说的
>
> 也就是
>
> 1. 队列一般用链表实现比较常用,下面实现的也是链式栈
> 2. ==注意下面类的提前声明和友元类的作用==
> 3. ==**assert果然还是太暴力了**，能不用就不用吧，但是一定要记住要判断 指针 为空的情况==
>
>    1. ==可以抛出异常信号  (建议用这个，因为运行错误的时候知道原因==
>    2. ==可以直接返回==
>    3. 判断指针head为空的方式
>
>    ``` cpp
>    if(!head) // if(!head)等价于if(head==NULL),head==NULL是head为空时等式成立，值为真
>      // head为空的话head就相当于0（假），非空就是真，所以当head为空的时候，!head就是真
>      throw nullPointer();//这里使用了抛出异常信号的方式,而且抛出的是一个匿名对象(因为要的是它的类型，没必要给对象命名了)
>             
>    //如果采用直接返回的方式
>    if(!head)
>        return;//直接返回的话，在有返回类型的函数里面可能会报错
>             
>    //以上两者都可以终止函数，不过直接return只能用在无返回值函数上，return本质是终止函数运行并返回NULL
>    ```



#### 实现

> **queue.h**
>
> ```cpp
> #include <iostream>
> #include <string.h>
> 
> using namespace std;
> 
> class nullPointer
> {
> };//用作异常信号
> 
> template<class elemType>
> class Queue;//类的向前声明，因为下面的Node中要用到Queue类
> 
> template <class elemType>
> class Node
> {
> friend class Queue<elemType>;//将Queue看作Node的友元类，这样Queue中（Node类外)可以访问Node的私有成员，后面Queue的函数用到了Node的私有成员
> private:
> elemType data;
> Node *next;
> 
> public:
> Node() { next = NULL; };
> Node(const elemType &x, Node *p = NULL)
> {
>   data = x;
>   next = p;
> }
> };
> ```
>
> ==这里一定要注意为什么提前声明queue以及为什么Node类将queue类看作友元类==
>
> ==还要注意==
>
> ==类的向前声明的时候类后面不加模板参数，但是前面一定要有参数模板的声明；==
>
> ==友元类后面一定要有模板参数==
>
> ==就按上面的写法==
>
> ```cpp
> template <class elemType>
> class Queue
> {
> private:
> Node<elemType> *head, *tail;
> 
> public:
> Queue() { head = tail = NULL; };
> bool isEmpty() { return !head; };//队列为空（头结点为空）返回真
> bool isFull() { return false; }; //这个函数没有意义，因为队列是单链表，没有满容可言
> elemType getHead();
> void pushQueue(const elemType &x); //入队，尾插
> void popQueue();                   //出队，头删
> ~Queue();
> };
> ```
>
> 
>
> **queue.cpp**
>
> ```cpp
> template <class elemType>
> elemType Queue<elemType>::getHead()
> {
> if (head == NULL) // if(!head)等价于if(head==NULL),head==NULL是head为空时等式成立，值为真
>   // head为空的话head就相当于0（假），非空就是真，所以当head为空的时候，!head就是真
>   throw nullPointer();
> return head->data;
> }
> ```
>
> if(!head)等价于if(head==NULL)
>
> head==NULL是head为空时等式成立，值为真
>
> head为空的话head就相当于0（假），非空就是真，所以当head为空的时候，!head就是真
>
> ```cpp
> template <class elemType>
> void Queue<elemType>::pushQueue(const elemType &x) //入队，尾插
> {
> Node<elemType> *New = new Node<elemType>(x);
> if (!head)
> {
>   head = tail = New;
> }
> else
> {
>   tail->next = New;
>   tail = tail->next;
> }
> }
> ```
>
> ```cpp
> template <class elemType>
> void Queue<elemType>::popQueue() //出队，头删
> {
> if (head == NULL)
>   return;
> //用return和throw queueIsNull()都可以终止函数，不过直接return只能用在无返回值函数上
> //return本质是终止函数运行并返回NULL
> Node<elemType> *p = head;
> head = head->next;
> delete p;
> 
> if (head == NULL)
>   tail = NULL;
> }
> ```
>
> 用return和throw queueIsNull()都可以终止函数，不过直接return只能用在无返回值函数上
>
> return本质是终止函数运行并返回NULL
>
> ```cpp
> template <class elemType>
> Queue<elemType>::~Queue()
> {
> if (!head)
>   throw nullPointer();
> Node<elemType> *p = head;
> while (p)
> {
>   head = head->next;
>   delete (p);
> }
> tail = NULL;
> }
> ```

#### 练习

**有些函数直接作为了上面实现的队列的成员函数，用的时候别忘了在queue.h中声明**



1.

用两个队列实现栈

> ```cpp
> template <class elemType> //先写一个求队列元素个数的函数，后面会用
> int Queue<elemType>::size()
> {
>     Node<elemType> *p = head;
>     int x = 0;
>     while (p)
>     {
>         x++;
>         p = p->next;
>     }
>     return x;
> }
> 
> template <class elemType>
> class Stack_queue
> {
> private:
>     Queue<elemType> a, b;
> 
> public:
>     void push(const elemType &x)
>     {
>         if (!a.isEmpty())
>             a.pushQueue(x);
>         else
>             b.pushQueue(x);
>     }
>     void pop()
>     {
>         // assert(!a.isEmpty() && !b.isEmpty());
>         Queue<elemType> *qEmpty = a.isEmpty() ? &a : &b;
>         Queue<elemType> *qUnEmpty = a.isEmpty() ? &b : &a;
>         while (qUnEmpty->size() > 1)
>         {
>             qEmpty->pushQueue(qUnEmpty->getHead());
>             qUnEmpty->popQueue();
>         }
>         qUnEmpty->popQueue();
>     }
>     elemType top()
>     {
>         // assert(a.isEmpty() && !b.isEmpty());
>         Queue<elemType> *qEmpty = a.isEmpty() ? &a : &b;
>         Queue<elemType> *qUnEmpty = a.isEmpty() ? &b : &a;
>         while (qUnEmpty->size() > 1)
>         {
>             qEmpty->pushQueue(qUnEmpty->getHead());
>             qUnEmpty->popQueue();
>         }
>         int x = qUnEmpty->getHead();
>         qEmpty->pushQueue(qUnEmpty->getHead());
>         qUnEmpty->popQueue();
>         return x;
>     }
> };
> ```
>
> 两个队列，一个总是空的，一个总是不空的
>
> 入栈就进非空队列，出栈把非空队列的前n个出到空队列，pop非空队列最后一个元素
>
> 非空队列就变成了空队列，空队列就变成了非队列



2.

现有一个整数队列， 需要将其前 k 个元素进行逆置， 剩余的元素保持原来的顺序。
例如队列[1， 2， 3， 4， 5， 6， 7， 8， 9]， 若 k 为 4， 则需要将队列调整为[4， 3， 2， 1， 5，6， 7， 8， 9]  

> ```cpp
> #include"seqStack.cpp"//要用到seqStack
> 
> template <class elemType>
> void Queue<elemType>::Reverse_k(int k)
> {
>  Queue<elemType> q;
>  seqStack<elemType> s;
> 
>  int i=0;
>  while(i<k)//前k个元素放到栈中
>  {
>      s.push(getHead());
>      popQueue();
>      i++;
>  }
>  while(head)//后n-k个元素放到临时队列中
>  {
>      q.pushQueue(getHead());
>      popQueue();
>  }
> 
>  while(!s.isEmpty())//栈中的元素放到主队列
>  {
>      pushQueue(s.top());
>      s.pop();
>  }
>  while(q.head!=NULL)//临时队列的元素放到主队列中
>  {
>      pushQueue(q.getHead());
>      q.popQueue();
>  }
> }
> ```
>
> 思路：前k个元素放到临时栈，后n-k个元素放到临时队列，再从临时栈中入到主栈，临时队列入到主栈



3.

现在有一批同学需要接收面试， 参加面试的同学按照先到先面试的原则接受面试官的考查。 本次面试中面试官最看重的是同学的成绩， 现在面试官小明需要你设计程序实现以下功能：
（1） 某位同学加入面试队伍， 输入其名字和成绩；
（2） 队伍最前端的同学的面试结束， 离开场地；
（3） 小明想知道当前面试队伍里最好成绩是多少。

> ```cpp
> template <class elemType>
> class interview_team; //类的向前声明
> 
> template <class elemType>
> class iNode
> {
>     friend class interview_team<elemType>; //看作Node的友元类,友元类可以访问Node的私有成员
> 
> private:
>     string name;
>     int point;
>     iNode<elemType> *next;
> 
> public:
>     iNode(string name = "null", int point = 0)
>     {
>         this->name = name;
>         this->point = point;
>         next = NULL;
>     }
> };
> 
> template <class elemType>
> class interview_team
> {
> private:
>     iNode<elemType> *head, *tail;
> 
> public:
>     interview_team() { head = tail = NULL; }
> 
>     void i_push(string name, int point)
>     {
>         if (head == NULL)
>         {
>             head = tail = new iNode<elemType>(name, point);
>         }
>         else
>         {
>             tail->next = new iNode<elemType>(name, point);
>             tail = tail->next;
>         }
>     }
> 
>     void i_pop()
>     {
>         if (head == NULL)
>             return;
> 
>         iNode<elemType> *p = head;
>         head = head->next;
>         delete (p);
> 
>         if (head == NULL)
>             tail == NULL;
>     }
> 
>     int i_best()
>     {
>         if (!head)
>             return -1;
> 
>         iNode<elemType> *p = head;
>         int best = -1;
> 
>         while (p)
>         {
>             if (p->point > best)
>                 best = p->point;
>             p = p->next;
>         }
> 
>         return best;
>     }
> };
> ```
>
> 思路：其实就是实现STL的队列中的部分功能



#### 结束

That's all, thanks for reading!💐