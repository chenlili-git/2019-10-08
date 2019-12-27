const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');//数据库模块引用
const mongoo = require('../mongoo');

router.post('/', (req, res) => {
    let { user, pw } = req.body;

    let msg = {
        code: 0,
        msg: '1111'
    }

    if (!user || !pw) {
        msg.code = 2;
        msg.msg = '用户信息有误'
    }
    mongoo.getByConditions({
        username: user
    }, (d) => {
        if (d[0].userpwd === pw) {
            msg.code = 0;
            msg.msg = '登录成功';
            req.session.userinfo = user;
        } else {
            msg.code = 3;
            msg.msg = '用户名和密码错误'
        }

        res.json(msg);
    })

})

module.exports = router;//导出路由
