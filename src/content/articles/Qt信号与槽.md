---
title: Qt信号与槽
date: '2024-9-2 11:08'
tag:
  - Qt
category:
  - Qt
cover: 'https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202408041153746.png'
abbrlink: 96fd26bb
---



## 信号与槽

`信号源`发出(某种类型的)`信号`，由`槽`接收信号，并执行对应的`信号处理方式`

步骤：

1. 将槽与信号关联起来
2. 编写好对于信号的响应行为/处理方式(槽)
3. 触发信号，槽接收到，执行设定好的处理方式

### connect

QObject提供的静态的成员函数，用于将信号和槽进行关联

> Qt中提供的这些类，本身是存在一定的继承关系的
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/81ec1050ac35b96bb35ca8981980404.jpg" alt="81ec1050ac35b96bb35ca8981980404" style="zoom:80%;" />

原型
```C++
connect(const QObject *sender,
       	const char *signal,
       	const QObject *receiver,
       	const char *method,
       	Qt::ConnectionType type = Qt::AutoConnection)
//sender:信号源，信号是由那个空间发送出来的
//signal:发送的信号(信号函数)；函数指针
//receiver:槽，也就是信号接收对象，处理信号的对象(控件)
//method:接收信号的槽函数，处理信号的对象提供的处理方式(成员函数)；函数指针
//type:用于指定关联方式，通常不需要手动指定，有默认关联方式
```

example：

```C++
//widget.cpp
#include "widget.h"
#include "ui_widget.h"

#include <QPushButton>

Widget::Widget(QWidget *parent)
    : QWidget(parent)
    , ui(new Ui::Widget)
{
    ui->setupUi(this);

    QPushButton *button = new QPushButton(this);
    //创建一个pushbutton对象，并初始化挂到对象树上，指明父对象是this

    button->setText("关闭");
    button->move(200, 200);

    connect(button, &QPushButton::clicked, this, &Widget::close);
    //第二、四个参数应该是函数指针，成员函数取地址，得到的就是函数的指针了
}

Widget::~Widget()
{
    delete ui;
}


```

> 1. connect中第二个参数，是信号发出的信号，必须是信号源类(或其父类)中的成员函数(信号函数)，不能是无关类的成员函数。
>
>    本例中，信号源设置为了`QPushButton`类对象`button`，因此信号函数必须是`QPushButton`类(或其父类)中的成员函数，不能是别的类
>
> 2. connect中第三个参数，是槽，即接收信号的对象
>
>    此处设置为`this`，即`Widget`本身
>
> 3. connect中第四个参数，是槽函数，必须是槽(或其父类)中的成员函数(槽函数)，不能是无关类的成员函数
>
>    本例中，槽为`this`，即`Widget`，因此槽函数必须是`Widget`类(或其父类)中的成员函数。`close`为`QWidget`内置的槽函数，`Widget`继承自`QWidget`，也就继承了父类的槽函数
>
> 4. `QPushButton::click`和`QPushButton::clicked`的区别：
>
>    1. `click`是模拟''按钮点击''的动作，`clicked`是接收''按钮点击''这一行为。
>
>       在本例中，我们是想要在”按钮被点击后，执行关闭窗口的行为”，也就是说要捕获到“按钮被点击了”这一行为，然后发出信号，进而被槽接收，在执行对应的处理行为。所以说应该用`clicked`。
>
>    2. `click`是槽函数，`clicked`是信号函数。前者是用于执行动作的，后者适用于捕捉动作和行为、发出信号的。这也是槽函数和信号函数的不同的作用和用途。
>
>    3. tips：在Qt Creator中，可以通过查看代码补全时左侧的小图标来得知函数是 信号函数 还是 槽函数。
>
>       <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240807135314848.png" alt="image-20240807135314848" style="zoom:80%;" />
>
>       > 信号函数：图标很像是(遥控器)发送信号(电波)的样子
>       >
>       > 槽函数：图标上有凹槽
>
> 5. 三个问题：
>
>    1. 怎么知道控件类里面有什么槽函数什么信号函数的？Qt里都提供了哪些内置的信号和槽可以让用户直接使用呢？
>
>       **多看文档！！**
>
>       在翻阅文档的时候，如果在当前类中没有找到对应的线索，不妨看看这个类的父类（的父类的父类...）
>
>       <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240807141156575.png" alt="image-20240807141156575" style="zoom:80%;" />
>
>       <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240807141553836.png" alt="image-20240807141553836" style="zoom:80%;" />
>
>       QPushButton中没有找到click和clicked，去看看它的父类
>
>       <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240807141339271.png" alt="image-20240807141339271" style="zoom:80%;" />
>
>       <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240807141348894.png" alt="image-20240807141348894"  />
>
>       查阅文档的信号的时候，最重点的就是关注信号的发送时机（用户进行了啥样的操作，就能产生这个信号）
>
>    2. 为什么`connect(const QObject *sender, const char *signal, const QObject *receiver, const char *method, Qt::ConnectionType type = Qt::AutoConnection)`原型中，函数指针是char*？不应该是根据函数不同，而设置不同的指针类型吗？
>
>       因为这个写法是Qt5之前的写法，在以前书写的时候，需要在信号函数指针和槽函数指针之前加上宏，将其转化为char*，长下面这样：
>       ```C++
>       connect(button, SIGNAL(&QPushButton::clicked), this, SLOT(&Widget::close));
>       ```
>    
>       Qt5开始，对上述写法进行了简化，不需要写SIGNAL和SLOT宏了，给connect提供了重载版本，在崇拜版本中，第二、四个参数变成了泛型参数，允许转入任意类型的<u>函数指针</u>了
>    
>       ![image-20240808092507878](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240808092507878.png)
>    
>       > 画横线的地方，是Qt封装的类型萃取器，
>    
>    3. 信号函数和槽函数不取地址可以吗？
>    
>       函数名取地址之后就是函数指针了。
>    
>       在C中，如果要使用函数指针，可以直接用函数名，也可以取地址，尽管两个类型是不同的，但是地址值都是函数的首地址。
>    
>       但是在C++和Qt中，强调了指针的类型了，函数名和函数指针的类型是不同的（如果函数类型为`void (int)`的话，那么对应的函数指针类型就是`void (*)(int)）`，尽管两个保存的地址值都相同，但是C++和Qt对类型加了限制，所以是不能通过的，必须取地址才可以。
>    
>       > 详细可以参考C++下的文章[C-指针进阶](https://chunyujin.top/chunyujin/f389ecbc)





### 自定义信号和槽

##### 自定义槽

两种方式：

> 1. 手动编写声明定义
>
>    在头文件的类中加入槽的声明，在源文件中进行定义
>
>    ```cpp
>    //widget.h
>    class Widget : public QWidget
>    {
>        Q_OBJECT//某个类中如果要使用信号槽，那么类的开始必须要写上这个宏（Qt中的硬性规定，否则类在编译时会出错）
>    
>    public:
>        Widget(QWidget *parent = nullptr);
>        ~Widget();
>    
>    public slots:
>        void handleMySignal();
>        //自定义的槽的声明；slots为Qt中的关键字，用于说明下面的函数为槽函数；
>        //slots前面可以根据情况添加public或private
>    private:
>        Ui::Widget *ui;
>    };
>    ```
>
>    ```cpp
>    //widget.cpp
>    Widget::Widget(QWidget *parent)
>        : QWidget(parent)
>        , ui(new Ui::Widget)
>    {
>        ui->setupUi(this);
>    
>        connect(ui->pushButton, &QPushButton::clicked, this, &Widget::handleMySignal);
>    	//将ui界面中创建的对象"pushButton"的clicked信号与当前对象(widget)的自定义槽手动关联起来
>    }
>    
>    Widget::~Widget()
>    {
>        delete ui;
>    }
>    
>    void Widget::handleMySignal()
>    {
>        this->setWindowTitle("自定义槽已经接收到了信号！！");
>        //自定义槽的定义
>    }
>    
>    ```
>
> 2. 在ui界面中自动生成某控件对象的信号转到的自定义槽
>
>    在ui界面中右击控件对象，弹出”转到槽“，点击之后进入选择界面
>
>    <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240815135908956.png" alt="image-20240815135908956" style="zoom:80%;" />
>
>    <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240815135929008.png" alt="image-20240815135929008" style="zoom:80%;" />
>
>    这个界面含义是”为下面的信号生成相关的自定义槽“，如：选择了`QAbstractButton`类的`clicked()`，则自动生成一个自定义槽，与此信号<mark>自动关联</mark>起来，此信号一发出，自定义槽则响应。
>
>    选择之后，头文件和源文件中自动生成了该自定义槽：
>
>    <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240815140813601.png" alt="image-20240815140813601" style="zoom:80%;" />
>
>    <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240815141508087.png" alt="image-20240815141508087" style="zoom:80%;" />
>
>    > 通过ui界面的方式自动生成的槽，是与ui控件对象的信号自动关联的，所以不需要再使用`connect`进行手动关联了
>



**Qt中也允许自定义信号，但是槽函数作为响应，会更倾向于自定义，但是信号的触发一般就固定的几种（在GUI中，用户能进行哪些操作，是可以穷举的~），所以自定义信号相对较少**

##### 自定义信号

自定义信号用户只需要声明就可以了，自定义信号要放在关键字`signals`之下，这样Qt自动认为该函数为信号，并在内部自动生成函数定义(元编程)，用户无需干涉

```c++
//widget.h
class Widget : public QWidget
{
    Q_OBJECT//某个类中如果要使用信号槽，那么类的开始必须要写上这个宏（Qt中的硬性规定，否则类在编译时会出错）
public:
    Widget(QWidget *parent = nullptr);
    ~Widget();

signals://Qt自己扩展出来的关键字，会自动认为下面包含的函数为信号，并自动生成函数定义
    void mySignal();//自定义信号，只需声明，无需实现，剩下的交给Qt来做
    
private:
    Ui::Widget *ui;
};
```

由于是自定义信号，并不是和Qt自带信号一样将行为与触发绑定起来(例如`PushButton类`自带的`clicked`信号，识别到按钮被点击，`clicked`信号就被自动发送出去)，所以自定义信号需要借助其他的方式进行”发射/触发”，比如将自定义信号在函数中进行发射。在信号前面添加`emit`关键字，即可手动发射信号。

> 1. 由于自定义信号并非Qt自带的信号，因此无法通过ui界面自动生成自定义槽函数，所以只能手动使用`connect`与槽进行关联。
>
> 2. 信号与槽通过`connect`进行关联，只是建立了连接，使二者“产生了关系”，不代表信号已经发出来了。
> 3. `emit` 手动发出信号，不止适用于自定义信号。
>    其实Qt5中`emit`什么都没做，真正的操作已经都包含在信号函数内部自动生成的定义中了；即使不写`emit`，函数也能发射出去。
>    即使如此，在实际开发中，还是建议加上`emit`，增加代码的可读性，可以明显地标识出：这里是发射自定义信号



下面一个例子：通过ui界面生成了一个`pushButton`对象的`clicked`信号转到的自定义槽，自定义槽执行的行为是发送一个自定义信号，该自定义信号再与另一个自定义槽手动关联起来

```C++
//widget.cpp
Widget::Widget(QWidget *parent)
    : QWidget(parent)
    , ui(new Ui::Widget)
{
    ui->setupUi(this);

    connect(this, &Widget::mySignal, this, &Widget::handleMySignal);
    //建立连接，不代表信号已经发出来了
}

Widget::~Widget()
{
    delete ui;
}

void Widget::on_pushButton_clicked()//ui界面生成的转到槽，关联的信号是pushButton的clicked
{
    emit mySignal();//发送信号的行为可以在任意合适的代码中，不只可以在构造函数中
}

void Widget::handleMySignal()
{
    this->setWindowTitle("自定义槽已经接收到自定义信号了");
}

```

> `pushButton`被点击之后，发送`clicked`信号，`on_pushButton_clicked`槽接收之后，执行发送`mySignal`信号的行为；`handleMySignal`槽接收到`mySignal`信号之后，更改窗口标题。

### 信号与槽的关联是多对多的

一个信号可以关联多个槽，一个槽也可以响应多个信号

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240815155439479.png" alt="image-20240815155439479" style="zoom:80%;" />



### 带参数的信号和槽

信号和槽是可以带参数的，Qt自带的一些信号和槽是可以传参的；自定义信号和槽也是可以传参。

信号的参数列表会直接传递到connect关联的槽的参数列表，通过这种机制，就实现了从信号向槽传输数据

> 在使用带信号信号和槽时，要确保：
>
> 1. 关联的信号和槽参数类型一致
> 2. 关联的信号和槽参数数量可以不一样，但一定要确保信号参数>=槽参数，反之不行
>        //为什么：因为槽可能会绑定多个信号，允许信号参数多于槽参数，使得槽可以兼容多个信号
>        //个数不一致时，槽会根据参数顺序，拿到信号的前N个参数；至少会确保槽函数的每个参数都是有值的

更改一下上面的代码

```C++
//widget.cpp
Widget::Widget(QWidget *parent)
    : QWidget(parent)
    , ui(new Ui::Widget)
{
    ui->setupUi(this);

    connect(this, &Widget::mySignal, this, &Widget::handleMySignal);
    //建立连接，不代表信号已经发出来了
}

Widget::~Widget()
{
    delete ui;
}

void Widget::on_pushButton_clicked()//ui界面生成的转到槽，关联的信号是pushButton的clicked
{
    emit mySignal(""自定义槽已经接收到自定义信号了"， "hello");
}

void Widget::handleMySignal(QString text)//槽函数参数可以少于关联的信号参数，槽根据顺序取前N个
{
    this->setWindowTitle(text);
}

```

### disconnect

虽然说信号和槽可以多对多，但是有些场景下，多个信号和多个槽同时关联，可能会造成一些混乱，因此可以在适当的时机断开先前的关联，进而再创建新的关联

> 主动断开，往往就是为了新的绑定

```C++
Widget::Widget(QWidget *parent)
    : QWidget(parent)
    , ui(new Ui::Widget)
{
    ui->setupUi(this);
    connect(ui->pushButton, &QPushButton::clicked, this, &Widget::handlemyclick1);
}

Widget::~Widget()
{
    delete ui;
}

void Widget::handlemyclick1()
{
    this->setWindowTitle("现在按钮1关联的槽1");
    qDebug() << "slot1 works";
}

void Widget::handlemyclick2()
{
    this->setWindowTitle("现在按钮1关联的槽2");
    qDebug() << "slot2 works";
}


void Widget::on_pushButton_2_clicked()
{
    disconnect(ui->pushButton, &QPushButton::clicked, this, &Widget::handlemyclick1);
    connect(ui->pushButton, &QPushButton::clicked, this, &Widget::handlemyclick2);
}
 
```

> `on_pushButton_2_clicked()`为`pushButton2`的`clicked`信号（简称信号2）转到槽，作用是断开`pushButton1`的`clicked`信号（简称信号1）与`handlemyclick1`槽（简称槽1）的连接，将`pushButton1`的`clicked`信号（简称信号2）与`handlemyclick2`槽（简称槽2）连接。这样的话，下次点击`pushButton1`，就是槽2响应，而不是槽1响应了。
>
> 最开始，信号1与槽1关联，点击按钮1，槽1响应；信号2与其转到槽关联，点击按钮2，转到槽响应，断开了信号1与槽1，关联了信号1与槽2；因此第二次点击按钮1时，信号1发出，槽2响应。
>
> > 如果不断开信号1与槽1，则信号1发出时，槽1与槽2都会响应，会很混乱，特别是涉及到同一种行为的，窗口标题不知道到底是按照槽1显示，还是按照槽2显示
>
> ![test1](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/test1.gif)
>
> 点击button1，显示”关联槽1”，点击button2之后，断开了button1与槽1的连接，将button1与槽2连接，此时点击button1，显示”关联槽2“，并且槽2会断开button1与自己的连接，将button1与槽1连接；再点击button1，显示“关联槽1”

