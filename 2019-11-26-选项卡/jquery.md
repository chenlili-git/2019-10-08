### jquery对象转普通对象  普通对象转jquery对象
```
$('#id')   //普通转jquery

$('#id').get(0)  //jquery 转普通
$('#id')[0]


```
### DOM操作
```
插入到某个元素的前面
$('#box').before($('<div>2</div>'))

关系：
父子  兄弟

parentNode=>parent()

previousElementSibling=>prev() 

nextElementSibling=>next()

parents()=> 某个元素的所有祖先节点，括号中可以精确匹配

$("div").siblings() =>div的所有兄弟节点和下兄弟节点

index('button') 方法 顺序默认基于父级 也可以精确匹配


```

### 事件
```
click 
mouseover
mouseout
...

事件三大部分：
1.事件流
2.有哪些事件，他们干嘛的
3.事件对象

hover:
    实际就是原生的onmouseenter  onmouseleave

    $('#box').hover(function(){
        console.log('移入')
    },function(){
        console.log('移除')
    })

JQ中所有的事件对象，都是二次封装的，如果要拿到真正的原生js事件对象 ev.originalEvent

jq中阻止冒泡和默认行为，直接return false 即可

。


事件监听
    $('#box').on('click','li',function(){
        console.log('点击'+this.innerText);
    })
    
    let ary=[2,2,4,6,7,8];
    ary.forEach((item,i)=>{
        let $li=$('<li>'+ (i+1) +'</li>')
        $li.on('click',{data:item},function(ev){

            console.log(ev)
            console.log(ev.data.data)
        })
        $('ul').append($li);
    })





    $('#box').delegate('li','click',function(){
        console.log($(this).text());
    })
//mouseover和mouseout 有穿透的问题  所以最好用mouseenter mouseleave
    $('#box').mouseover(function(){
        $(this).css({
            background:'skyblue'
        });
        $('button').click(function(){
            console.log('发起一次请求')
        })
    })

    $('#box').mouseout(function(){
        $(this).css({
            background:'red'
        })
    })

<!-- 

问题：触发一次hover 就会添加一个button 的click事件 触发多次就绑定了多次事件   当触发一次click事件就会执行多次
解决：绑定一次就解绑一次，保持始终一次的click

 -->
    $('#box').hover(function(){
        $(this).css({
            background:'skyblue'
        })
        $('button').off().click(function(){
            console.log('发起了一次请求')
        })
    },function(){
        $(this).css({background:'red'})
    })


解绑事件
    元素.off()
```



### 动画


```
*** jq 做动画的时候，记得使用stop(),把前面的动画清掉

hide(500)  隐藏
show(1000) 括号里面可以放东西  有动画  展示

slideToggle(200) 改变高度

fadeToggle(200) 渐隐渐现

delay(1000) 延迟一秒

animate({
    left:400,
    opacity:0
},3000)



```


### 工具 $.

```
$.each
$.ajax()

$.ajax({
    method:'post',
    url:'https://www.baidu.com/s',
    data:{
        id:12345,
        user:'天气',
        pass:123
    },
    success.:function(data){

    }

})

*jsonp

$.ajax({
    method:'post',
    url:'https://www.baidu.com/s',
    data:{
        id:12345,
        user:'天气',
        pass:123
    },
    dataType:'jsonp',
    success.:function(data){
        //处理数据
    }

})


***  $.extend()  深浅拷贝 扩展方法
    let obj={
        name:'小明'
    }

    let obj2=$.extend({},obj); //浅拷贝
    console.log(obj2===obj)//false

    let ary=[11,[2,3],4];
    let ary2=$.extend(true,[],ary)//true 就代表深拷贝
    ary2[1].push(5);
    console.log(ary[1],ary2[1])//[2,3],[2,3,5]



```

### jquery 扩展方法（功能和工具）

```
$.extend  工具方法 => $.xx()
$.fn.extend 功能方法 => $().xx()

*** 实现trimLeft 扩展插件使用 extend里面写对象，对象的属性就是扩展方法名称，值为函数

$.extend({
    trimLeft:function(str){
        return str.replace(/^\s+/,'');
    }
})
console.log($.trimLeft('   12345'))


*** 功能方法

$.fn.extend({
    scrollH:function(){
        return this[0].scrollHeight;
    }
})

$(document).click(function(){
    // console.log($('#txt').height())
    // console.log($('#txt').innerHeight())
    console.log($('#txt').scrollH());
});



```

