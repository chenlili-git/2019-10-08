/* 

实现 用户已登录过的存储在session中  就直接欢迎回来  

如果没登录过 直接地址栏输入用户页地址 应该是直接跳转登录页
*/ 

const express=require('express')
const app=express();
// 安装npm install express-session
const es=require('express-session')
const bp=require('body-parser')
const fs=require('fs');
app.use(express.static('www'));
app.use(bp.urlencoded({extended:false}))
app.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        console.log(err);
    })
    res.send({
        code:0
    })
})
app.listen(50)

