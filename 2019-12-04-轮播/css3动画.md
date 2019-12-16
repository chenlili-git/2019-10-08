### transform
> translate
+ translate(x,y) x,y方向移动的位移
```
transform:translate(100px,100px);
transform:translateX(100px);
transform:translateY(100px);
```
> rotate

+ rotate3d(x, y, z, a) 注意用3D的时候一定在父级上设置透视perspective
```
值
x
 <number> 类型，可以是0到1之间的数值，表示旋转轴X坐标方向的矢量。
y
<number> 类型， 可以是0到1之间的数值，表示旋转轴Y坐标方向的矢量。
z
<number> 类型， 可以是0到1之间的数值，表示旋转轴Z坐标方向的矢量。
a
 <angle> 类型，表示旋转角度。正的角度值表示顺时针旋转，负值表示逆时针旋转。

```
+ rotate2D(x,y) 两个轴

```
transform:rotateZ(50deg);
transform:rotateX(50deg);
transform:rotateY(50deg);
transform:rotate(50deg);
transform:rotate3D(1,1,1,50deg)
```
