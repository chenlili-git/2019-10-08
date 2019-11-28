```
js 按理来说是从上往下解读代码的，他是单线程的（同一时间只能做一件事）

事件调用=>把任务交给了事件引擎（所有的js事件全部都是异步的）

*** 同步 *** 
    代码从上往下依次执行，如果一个地方卡住了，下面的代码就不执行了


*** 异步 ***
    虽然代码是从上往下依次执行的，如果一个地方卡住了，是不会阻止代码向下执行的

    异步的方法：定时器、所有事件、Promise

    异步又分：宏任务和微任务
              Promise是微任务
              定时器、事件、window.setImmediate是宏任务


***事件循环***
js先执行主线程的代码，如果主线程有异步的代码，比如定时器、事件或者Promise等，那么会把异步代码放到异步队列中存储起来，当异步代码的条件成立的时候，才把异步代码押入主线程中执行，压入的方式是如果有微任务先执行微任务，执行完微任务再执行宏任务，当主线程空闲的时候执行压入的代码，执行完之后再从异步队列中压入异步代码到主线程中，这个过程叫做   ***事件循环***

setTimeout(function(){
    promise()
})

异步的操作是不容易进行维护开发的，同步操作才利于维护开发（上面的代码执行完才执行后面的代码）

Promise是解决异步编程顺序问题的（也就是说，让异步的代码同步执行）

```

### promise =>承诺
```

*为什么要用promise?
    promise解决了异步编程的问题
    在then里面就走“同步”（then是微任务）

*如何使用promise？

let p=new Promise((resolve,reject){
    //当主线程
    //当异步代码执行完，通过异步代码的结果去调用resolve或者reject
    //异步代码有可能报错或者错误，如果报错或者错误就执行reject
    //一般是resolve(放异步结果)
    resolve(5)
})

它有一个返回值，返回值是promise对象，这个对象有then方法 then(成功函数，失败函数)

p.then((d)=>{
    console.log(d,'promise');

}).then(){}

promise里面是个函数，函数有两个参数 resolve和reject
resolve是成功时执行
reject是失败时执行
成功和失败只能执行一个 要么成功要么失败 


promise执行完后会执行then方法
第一个then(成功函数，失败函数) （微任务）
    有两个函数一个接收成功，一个接受失败 
第二个then (微任务)
    第一个then的返回值

虽然Promise解决了异步编程的问题，但是在then的外面还是异步的，没有promise也能进行开发只不过维护起来麻烦点
then中包含2个函数，第一个函数时成功之后的回调，第二个函数是失败之后的回调函数

finally:不管是失败还是成功都会进的回调函数

如果代码有可能报错，下面的代码不会只想的，如果使用try,catch  那么try中的代码报错会进catch，报错是不会影响后面代码执行的

try{

}catch(e){

}
第一个then的返回值，是第二个then的参数。。。
fetch().then(function(d){
    return d.json();
}).then(function(){
    console.log(d);//d就是d.json()
})

当进第一个then的时候，d就是返回的数据，但是这个数据是被promise包了一层的 d.json（）=>'[]'=>[]

JSON=>长得像对象和数组点的字符串，本质是字符串

'[]'JSON=> [] 数组
'{}'JSON=> {} 对象


JSON取值是不方便的，可以使用JSON.parse()把JSON转成对象
parse必须为标准的JSON格式才能成功转化=>'{"name":"zf"}'
'[]'=>[]

对象转JSON=>JSON.stringify()的副作用是函数和undefined会被过滤掉
如：JSON.stringify({"name":"zf",fn:function(){},age:undefined})=>'{"name":"zf"}'


```





### promise.all([xx,xx,xx]).then().then()


```
把多个promise 包装在一起 作为一个promise   只有这所有的promise返回状态都是成功才能走成功的状态，否则一个失败所有的都得走失败状态   

应用场景：必须两个接口拿到的数据需要强制绑在一起 才能拿第三个数据的时候用，其他的时候还是尽量绕道




```

### promise.race([xx,xx,xx]).then().then()

```
把多个promise 包装在一起 作为一个promise  多个promise比赛 看谁跑的最快 最先有返回状态的就走该状态   

```
