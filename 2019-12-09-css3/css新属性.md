###  border-radius: 左上 右上  右下  左下

border-radius:10px 10px 0 0 / 10px 10px 0 0;
 前面是x方向的四个值 后面是y方面的四个值
```
border-top-left-radius：0 10px;
border-top-right-radius:5px;
border-bottom-left-radius:0 10px;
border-bottom-right-radius:5px;
border-radius:20% 10%/100%;

border-radius: 2em 1em 4em / 0.5em 3em;
等价于
border-top-left-radius: 2em 0.5em;
border-top-right-radius: 1em 3em;
border-bottom-right-radius: 4em 0.5em;
border-bottom-left-radius: 1em 3em;

```

###  text-shadow|box-shadow: x y r color;
    第一个数字代表 水平方向 x
    第二个数字代表 垂直方向 y
    第三个数字模糊半径 
    颜色
```
    text-shadow:1px 1px 2px #fff;
    box-shadow:1px 1px 1px #000 ;
```

###  border-image:url(border.png) 30 30 round;
border-image-source	用在边框的图片的路径。	
border-image-slice	图片边框向内偏移。	
border-image-width	图片边框的宽度。	
border-image-outset	边框图像区域超出边框的量	
border-image-repeat	图像边框是否应平铺(repeated)、铺满(rounded)或拉伸(stretched)

### background-size:length|percentage|cover|contain;
规定背景图像的尺寸
> length	
设置背景图像的高度和宽度。

第一个值设置宽度，第二个值设置高度。

如果只设置一个值，则第二个值会被设置为 "auto"。

> percentage	

以父元素的百分比来设置背景图像的宽度和高度。

第一个值设置宽度，第二个值设置高度。

如果只设置一个值，则第二个值会被设置为 "auto"。

> cover	
把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。

背景图像的某些部分也许无法显示在背景定位区域中。


> contain	
把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。


### filter: none | blur() | brightness() | contrast() | drop-shadow() | grayscale() | hue-rotate() | invert() | opacity() | saturate() | sepia() | url();
滤镜

[filter各项属性值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
