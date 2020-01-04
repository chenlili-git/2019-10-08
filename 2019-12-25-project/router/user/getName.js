const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');//数据库模块引用
const mongoo = require('../mongoo');

router.post('/', (req, res) => {
    let msg = {
        code: 0,
        msg: '1111'
    }
    if (req.body.user) {
        mongoo.getByConditions({
            username: req.body.user
        }, (d) => {
            let o = d.find(item => item.username === req.body.user);
            if (o) {
                msg.code = 1;
                msg.msg = '用户名已存在'
            } else {
                msg.code = 0;
                msg.msg = '可以注册'
            }
            res.json(msg);
        })

    } else {
        msg.code = 2;
        msg.msg = '用户名不能为空';
        res.json(msg);
    }
})

module.exports=router;