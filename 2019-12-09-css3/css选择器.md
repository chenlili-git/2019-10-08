### 选择器
* 选择器比重
> !important （10000） > style （1000） > # 100 > .和伪类 （10） > targName 伪元素 （1）> *+~ (0)

通用选择器（*）、子选择器（>）、相邻选择器（+）、同胞选择器（~）、权重值为0

> div[class|='a'] class要么是a 要么是a开头的

> nth-child(n) 选择父元素的第N个子元素，N是整数（1，2，3）、关键字（even、odd）、公式（2n+1）

> nth-last-child(n) 选择父元素的倒数第N个子元素（所有子元素中查找）

> nth-of-type(n) 只在同一种类型的原型上查找，第N个元素

> :only-child 选择父元素只包含一个子元素

> only-of-type 选择父元素只包含一个同类型的子元素

>empty 选择没有子元素的元素，并且该元素没有任何文本节点


