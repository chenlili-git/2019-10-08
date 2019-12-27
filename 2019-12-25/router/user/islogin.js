const express=require('express');
const router=express.Router();


router.get('/', (req, res) => {
    let msg = {
        code: 0,
        msg: '1111'
    }
    if (req.session.userinfo) {
        res.json({
            code: 0,
            msg: '已登录',
            user:req.session.userinfo
        })

    } else {
        res.json({
            code: 1,
            msg: '请登录'
        })
    }
})
module.exports=router;