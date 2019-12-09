## flex布局
> 弹性盒模型：
    使用方便，pc端不一定兼容，移动端基本兼容

    当父级写了flex之后就等同于左浮动（所有的子级），之前的浮动就没有效果了;

+ justify-content:flex-start|flex-end|center|space-between|space-around|space-evenly
    可以理解为一行时 各个子级块的行内样式

![justify](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png)

```
默认方向是左对齐：
    justify-content:flex-start;
右对齐:
    justify-content:flex-end;
居中对齐：
    justify-content：center;
两端对齐：
    第一和最后一个子级顶着父级的边，中间平均分
    justify-content:space-between;

平均分配剩余的空间：
    justify-content:space-around;

间距平均分配：
    justify-content:space-evenly;



```

+ flex-wrap:nowrap|wrap|wrap-reverse

    当子级的宽度大于父级时，如果不换行，就会让子级都缩小宽度从而一行展示；强制换行时，超过一行的就会折行

    默认是一行显示不换行

![flex-wrap](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071006.png)

```
不换行：
flex-wrap:nowrap; 

![flex-wrap:nowrap](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png)

换行：
flex-wrap：wrap;

![flex-wrap:wrap](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071008.jpg)

行颠倒：最后一行 倒数第二行。。。。

flex-wrap:wrap-reverse;

![flex-wrap:wrap-reverse](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071009.jpg)
```

+ flex-direction:row|column|row-reverse|column-reverse
    定义主轴方向 默认是X轴

![flex-direction](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071005.png)
```
主轴为X轴  
    flex-direction:row;  
主轴为X轴并翻转  
    flex-direction:row-reverse;  
主轴为Y轴  
    flex-direction:column;  
主轴为y轴并翻转  
    flex-direction:column-reverse;

 ``` 

 + align-items:flex-end|flex-start|flex-stretch|center|baseline 

    定义项目在交叉轴上如何对齐。

![align-items](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png)

```
默认左上对齐：
    align-items:flex-start;
底部对齐：
    align-items:flex-end;
居中对齐：
    align-items:center;
文本对齐：
    align-items:baseline;
拉伸：
    align-items:stretch(没有设置高度的会被拉伸，按同级最高的元素高拉伸)


```
+ align-content:flex-start|flex-end|center|space-between|space-around|stretch
    
![align-content](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png)

```javascript

与交叉轴的起点对齐
    align-content:flex-start;

与交叉轴的终点对齐
    align-content:flex-end;

与交叉轴的中点对齐
    align-content:center;

与交叉轴两端对齐，轴线之间的间隔平均分布
    align-content:space-between;

每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
    align-content:space-around;

轴线占满整个交叉轴
    align-content:stretch;

    
```
