let express = require('express');
let app = express();
const session = require("express-session");
const bp = require('body-parser');
const path = require('path');
const fs = require('fs');
const mongo=require('./mongo');
console.log(mongo.mongoDb());

// 安装npm install express-session
/* 
实现 用户已登录过的存储在session中  就直接欢迎回来  

如果没登录过 直接地址栏输入用户页地址 应该是直接跳转登录页
*/
app.use(express.static('www'));
app.use(bp.urlencoded({ extended: false }));


//express-session https://www.cnblogs.com/xiashan17/p/5897282.html
app.use(session({
    secret: '12期',// 用来注册session id 到cookie中，相当与一个密钥。建议使用 128 个字符的随机字符串
    name: 'session_id',//这里是cookie的name，默认是session_id
    cookie: { maxAge: 60000 },//生命周期
    resave: true,//是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
    saveUninitialized: true,//强制将“未初始化”的会话保存到存储中。会话是新会话但未修改时未初始化。选择false对于实现登录会话，减少服务器存储使用或遵守设置cookie之前需要获得许可的法律很有用。选择false还有助于解决争用条件，即客户端在没有会话的情况下发出多个并行请求。 默认值为true，但是不建议使用默认值，因为将来会更改默认值。请研究此设置，然后选择适合您的用例的内容。
    rooling: true  //是否按照原设定的maxAge值重设session同步到cookie中，要保证session有操作的时候必须设置这个属性为true
}))

app.use('*',(req,res)=>{
    let data=fs.readFileSync(path.resolve('./www/404.html'));
    res.send(data.toString());
})


app.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        console.log(err);
    })
    res.send({
        code: 0
    })
})



let sql = [
    {
        user: 'chenli1',
        pw: '123',
        id: 0
    },
    {
        user: 'chenli2',
        pw: '123',
        id: 1
    }
]
app.use(express.static('www'));//中间键 指定静态文件的位置

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json())
// bodyParser.urlencoded 用来解析 request 中 body的 urlencoded字符， 只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib。

// 返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
let msg = {
    code: 0,
    msg: '1111'
}

app.post('/getName', (req, res) => {
    if (req.body.user) {
        let o = sql.find(item => item.user === req.body.user);
        if (o) {
            msg.code = 1;
            msg.msg = '用户名已存在'
        } else {
            msg.code = 0;
            msg.msg = '可以注册'
        }
    } else {
        msg.code = 2;
        msg.msg = '用户名不能为空'
    }

    res.json(msg);
})


app.post('/register', (req, res) => {
    if (req.body.user && req.body.pw) {
        let o = sql.find(item => item.user === req.body.user);
        console.log(111)
        if (o) {
            msg.code = 1;
            msg.msg = '用户名已存在'
        } else {
            msg.code = 0;
            msg.msg = '注册成功';
            sql.push({
                user: req.body.user,
                pw: req.body.pw,
                id: Date.now()
            })
            //insertOne(mogodb)
            console.log(sql)
        }
    } else {
        msg.code = 2;
        msg.msg = '用户名和密码格式错误'
    }

    res.json(msg);
})
//登录
app.post('/login', (req, res) => {
    console.log(req.body)
    let { user, pw } = req.body;
    console.log(user, pw)
    if (!user || !pw) {
        msg.code = 2;
        msg.msg = '用户信息有误'
    }
    let o = sql.find(function (item) {
        if (item.user === user && item.pw === pw) {
            return true;
        } else {
            return false;
        }
    });
    console.log(o)
    if (o) {
        msg.code = 0;
        msg.msg = '登录成功';
        req.session.userinfo = user;
    } else if (o == undefined || o == false) {
        msg.code = 3;
        msg.msg = '用户名和密码错误'
    }

    res.json(msg);
})
app.get('/islogin', (req, res) => {
    if (req.session.userinfo) {
        res.json({
            code: 0,
            msg: '已登录'
        })

    } else {
        res.json({
            code: 1,
            msg: '请登录'
        })
    }
})
app.listen(50)
