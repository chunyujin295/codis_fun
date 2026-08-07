---
title: C++_异常处理
date: '2022-10-1 1:16'
tag:
  - C++
category:
  - 编程日志
  - C&C++
abbrlink: 68c7819c
---



### 异常处理

> 前言：此类笔记仅用于个人复习，内容主要在于记录和体现个人理解

[toc]

#### 什么是异常处理

> 在程序中可能会出现各种各样的异常，比如出现了错误，常见错误主要分为语法错误和编译错误，有的错误编译器是可以检查出来的，有的错误编译器检查不出来，；又比如违背正常情况，比如要求输入小写字母，但是实际输入大写的或者数字等，这种错误编译器一般不会检查出来。
>
> 在设计程序之前，应当分析各种可能出现的异常情况，并设定相应的识别、处理方式，这就是异常处理的任务
>
> 比如如果某个数除以0，这就是一个异常，要根据除数为0的这种异常情况进行一个判断和处理（比如报错并结束程序）
>
>  
>
> 当然，也可以通过断言等方式来处理一些错误，当assert中的判别式结果为false的时候，就直接异常退出程序

#### C++中如何实现异常处理

C++的异常处理机制是由三个部分组成的：检查（try）、抛出（throw）、捕捉（catch）

"异常情况“是设计者人为认定判定的：如果想要检查一段代码，在这个代码段里面出现了我们不想要的异常情况，就需要抛出”这是一个异常情况“的信号，然后由相应的捕捉代码进行捕捉，一旦捕捉到抛出的异常，就会进入到用来处理这个异常的代码。

跟assert相比，异常处理机制显然更为温和，不会直接断死代码直接退出程序

##### throw语句

> 形式：
>
> ````c++
> throw 表达式
> ````
>
> throw关键字抛出的表达式是什么样的数据由设计者自己定，可以是常规的变量，也可以是一串字符，也可以是自定义的变量
>
> throw的关键在于表达式的结果的类型，而不是表达式的具体的值，但还是会将表达式作为“异常信号/信息”（异常）整个抛出去，包括值
>
> >一旦throw抛出异常，就会在进行异常处理之后，立即跳出throw所在的函数，回到上一级函数（比如main函数）

##### try-catch结构

> try关键字负责划定需要检查的代码区域，在区域内的代码段会接受检查，try和被检查的代码段被合称为try块
>
> catch关键字用于接收throw抛出的异常，并针对异常进行相应处理，catch和被检查的代码段被合称为catch块
>
> 形式：
>
> ````c++
> try
> {	
> 	被检查的代码段
> }catch(异常信息类型 变量名·一般情况下不写变量名·){
> 	处理异常的代码段
> }
> ````
>
> 注意
>
> > 1. 如果throw的表达式是类的话，可以不用单独实例化出一个对象，直接使用匿名对象，因为有的时候会定义一些空类来专门作为异常信息用，没必要为了异常信息实例化一个对象
> >
> > ```c++
> > class outofsize{}；//这是一个空类，专门用来当异常信息的
> > ......
> > throw outofsize();//使用的outofsize的匿名对象，格式是"类名"+"()",其中()里面为初始化参数，跟正常类的定义不同，匿名对象再没有初始化参数的时候也要跟()
> > try
> > {}
> > catch(outofsize)
> > {}
> > ```
> >
> > 
> >
> > 2. 被检查的代码段必须放在try里，否则不起作用
> >
> > 3. try-catch结构是一个整体，catch块必须紧跟try块，catch不能脱离try单独使用，且两者之间不能夹杂其他语句；但是try块是可以单独使用的，即只检查不处理，catch块在另一个函数里面
> >
> > 4. 花括号不能省略
> >
> > 5. 由于一段代码中可能存在多种错误情况，所以允许一个try块后面接多个catch块，以便匹配不同的异常信息
> >
> > ````cpp
> > try
> > {}
> > catch()
> > {}
> > catch()
> > {}
> > //以上省略了内容，主要体现结构
> > ````
> >
> > 6. catch也只检查异常信息的类型，而不检查异常信息的值，根据异常信息的类型匹配相应的catch块，无论doule类型的值是多少，都只会匹配catch(double)；所以一般的catch写法括号内只有异常信息类型
> >
> > ````c++
> > catch( double )
> > {}
> > ````
> >
> > > 这里发现，在函数的定义的时候也可以只写类型，不写变量，因为参数从左到右依次传入函数  
> >
> > ​	catch括号内还有另一种写法，即除了指定类型之外还指定变量名
> >
> > ````c++
> > catch(double d)
> > {
> > 	cout << d << endl;
> > }
> > ````
> >
> > ​	这样catch在捕捉异常信息的时候，除了捕捉变量类型，还会捕捉变量的值，这样就可以在catch中使用这个值（当然，是拷贝的）
> >
> > 7. 如果catch括号内没有写变量类型，而是写了catch(...)，这表示这个catch块可以接受任何类型的异常信息
> >
> > 8. throw语句和try-catch块在同一个函数中，也可以不在同一个函数中。throw抛出异常信息之后，会先在本函数内让catch捕捉，如果本函数没有try-catch或者没有可以匹配的catch，则跳出本函数到上一个函数，直到找到最近的可匹配的catch
> >
> > 9. 某些情况下，throw后面可以不加表达式，比如如果在catch块里有throw，则catch里的throw会将catch捕捉到的catch外的throw抛出的异常原样抛出，表示“本级函数的catch不处理这个异常，给上一级的catch块处理”
> >
> > ```c++
> > catch(int)
> > {				//其他语句
> >     throw;		//将以捕获的异常信息再次原样抛出
> > }
> > ```
> >
> > 
> >
> > 10. 如果throw抛出的异常到最后都没有catch与之匹配，系统会调用一个系统函数terminate终止程序进行

#### 几个例子

> ``` c++
> #include<iostream>
> #include<cmath>
> 
> using namespace std;
> 
> double triangle(double,double,double);
> 
> int main()
> {
>      double a,b,c;
>      cin>>a>>b>>c;
>      try
>      {
>          while(a>0&&b>0&&a>0)
>          {
>              cout<<triangle(a,b,c)<<endl;		//try里包含了要被检查的函数
>              cin>>a>>b>>c;
>             }
>         }catch(double)
>      {
>          cout << "a=" << a << ",b=" << b << ",c=" << c << ",that is not a triangle" <<endl;
>         }
>      cout<< "end" <<endl;
>      return 0;
> }
> 
> double triangle(double a,double b,double c)
> {	
>      double s = ( a+b+c )/2;
>      if( a + b <= c || b + c <= a || a + c <= b )
>          throw a;
>      return sqrt( s + (s-a) * (s-b) * (s-c) );	//如果在上面的throw中抛出了异常信息，则直接跳到上一级函数，这一行代码就不会生效
> }
> ```
>
> 
>
> ```c++
> #include <iostream>
> using namespace std;
> 
> double division(int a, int b)
> {
> 	if( b == 0 )
> 	{
>    		throw "Division by zero condition!";		//表达式的类型本质是上是字符串，也就是char指针
> 	}
> 	return (a/b);
> }
> 
> int main ()
> {
> 	int x = 50;
> 	int y = 0;
> 	double z = 0;
> 
> 	try 
>     {
>  		 z = division(x, y);
>   		cout << z << endl;	
> 	}catch (const char* msg)			 	//既有变量类型又有变量名，就可以在下面使用捕捉到的异常信息
> 	{
>   		cerr << msg << endl;
> 	}
> 
> 	return 0;
> }
> ```
>
>  
>
> ``````c++
> #include<iostream>
> #define SIZE 10
> using namespace std;
> 
> class outOfSize {};//这里定义了一个空outOfSize类，只用作异常信号，不用与其他作用
> class illegalType {};//同上
> 
> void addWord(int&, char*, char);
> 
> int main()
> {
>     char a[SIZE];
>     char b;
>     int x = 0;
> 
>     try
>     {
>         while (1)
>         {
>             cout << "Please keyonte a~z"<<endl;
>             cin >> b;
>             addWord(x, a, b);
>         }
>     }
>     catch (outOfSize)
>     {
>         cout << "Outofsize!" << endl;
>     }
>     catch (illegalType)
>     {
>         cout << "IllegalType!" << endl;
>     }
>     return 0;
> }
> 
> void addWord(int& x, char* a, char b)
> {
>     if (x >= SIZE)
>         throw outOfSize();//抛出的是outOfSize类的匿名对象
>     if (b < 'a' || b>'z')
>         throw illegalType();
>     a[x] = b;
>     x++;
> }
> ``````
>
> 

#### 结束

That's all, thanks for reading!💐







