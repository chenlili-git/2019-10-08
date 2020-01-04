const express=require('express');
const router=express.Router();

router.get('/', (req, res) => {
    req.session.destroy(function (err) {
        console.log(err);
    })
    res.send({
        code: 0,
        msg:'退出成功'
    })
})

module.exports=router;