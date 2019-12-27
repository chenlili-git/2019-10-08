const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');//数据库模块引用
const mongoo = require('../mongoo');

router.post('/', (req, res) => {

    let msg = {
        code: 0,
        msg: '1111'
    }

    if (req.body.user && req.body.pw) {
        //数据库查询 匹配
        mongoo.getByConditions({
            username: req.body.user
        }, (d) => {
            if (d.length) {
                msg.code = 1;
                msg.msg = '用户名已存在'
            } else {
                msg.code = 0;
                msg.msg = '注册成功';
                mongoo.insert({
                    username: req.body.user, //用户账号 
                    userpwd: req.body.pw, //密码
                    logindate: Date.now() //最近登录时间 
                });
            }
            res.json(msg);
        });

    } else {
        msg.code = 2;
        msg.msg = '用户名和密码格式错误'
        res.json(msg);
    }


})

module.exports = router;//导出路由