let express=require('express');
let app=express();
const bp=require('body-parser');
const fs=require('fs');
// 安装npm install express-session
/* 
实现 用户已登录过的存储在session中  就直接欢迎回来  

如果没登录过 直接地址栏输入用户页地址 应该是直接跳转登录页
*/ 
const es=require('express-session')

app.use(session({
    secret:'12期',
    name:'session_id',
    cookie:{maxAge:60000},
    rooling:true
}))
app.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        console.log(err);
    })
    res.send({
        code:0
    })
})



let sql=[
    {
        user:'chenli1',
        pw:'123',
        id:0
    },
    {
        user:'chenli2',
        pw:'123',
        id:1
    }
]
app.use(express.static('www'));//中间键 指定静态文件的位置

app.use(bp.urlencoded({extended:false}));
app.use(bp.json())
// bodyParser.urlencoded 用来解析 request 中 body的 urlencoded字符， 只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib。

// 返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
let msg={
    code:0,
    msg:'1111'
}
app.post('/register',(req,res)=>{
    console.log(req.body)
    let o=sql.find(item=>item.user===req.body.user1);
    if(o){
        msg.code=0;
        msg.msg='用户名已存在'
    }
    res.json(msg);
})



app.listen(50)
