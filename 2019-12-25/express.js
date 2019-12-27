const express = require('express');
const app = express();
const session = require("express-session");//设置服务器cookie
const bp = require('body-parser');//引入post的body数据处理模块
const path = require('path');//引入路径
const fs = require('fs');//引入文件系统
const mongoose = require('mongoose');//数据库模块引用
const mongoo = require('./router/mongoo');//数据库方法
const multer = require('multer');

app.use(bp.urlencoded({ extended: false }));//解决乱码问题
app.use(bp.json())////解决axios不能用对象的问题



/***  删除  ***/

// const mongo=require('./mongo'); 原生mongo注入
// console.log(mongo.mongoDb());

// 安装npm install express-session
/* 
实现 用户已登录过的存储在session中  就直接欢迎回来  
 
如果没登录过 直接地址栏输入用户页地址 应该是直接跳转登录页
*/



//express-session https://www.cnblogs.com/xiashan17/p/5897282.html
app.use(session({
    secret: '12期',// 用来注册session id 到cookie中，相当与一个密钥。建议使用 128 个字符的随机字符串
    name: 'session_id',//这里是cookie的name，默认是session_id  不设置时默认是connect_sid

    cookie: { maxAge: 600000 },//生命周期
    resave: true,//是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
    saveUninitialized: true,//强制将“未初始化”的会话保存到存储中。会话是新会话但未修改时未初始化。选择false对于实现登录会话，减少服务器存储使用或遵守设置cookie之前需要获得许可的法律很有用。选择false还有助于解决争用条件，即客户端在没有会话的情况下发出多个并行请求。 默认值为true，但是不建议使用默认值，因为将来会更改默认值。请研究此设置，然后选择适合您的用例的内容。
    rooling: true  //是否按照原设定的maxAge值重设session同步到cookie中，要保证session有操作的时候必须设置这个属性为true
}))

//静态文件托管
app.use('/', express.static('www'));//中间键 指定静态文件的位置
app.use('/public', express.static('./public'));//中间键 指定静态文件的位置

app.use(multer({ dest: './public/img/uploads/' }).array('filename'));//single单个，array数组

// bodyParser.urlencoded 用来解析 request 中 body的 urlencoded字符， 只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib。

// 返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。




//使用路由 把接口放入其他位置 这样启动的nodejs就会很轻量级   
//注册
app.use('/register', require('./router/user/register'));
// 检测用户名
app.use('/getName', require('./router/user/getName'));

//登录
app.use('/login', require('./router/user/login'))

//检测是否登录
app.use('/islogin', require('./router/user/islogin'));

//退出登录
app.use('/logout', require('./router/user/logout'));

//上传
app.use('/upload', require('./router/upload/upload'));

app.get('/a', (req, res) => {
    console.log(2222)
    res.json({
        code: 0,
        msg: '成功',
        user:req.session.userinfo
    })

})
//把通配符放于最后处理。这样没有经过路由的所有页面默认由 404.html 来接管。
app.use('*', (req, res, next) => {
    let data = fs.readFileSync(path.resolve('./www/404.html'));
    res.send(data.toString());

    // next();
})



app.listen(50);
