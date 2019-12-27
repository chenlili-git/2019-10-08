const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
router.post('/', (req, res, next) => {
    let files = req.files;
    let num = 0;
    files.forEach(file => {
        let oldpath = path.resolve(file.path);
        let newpath = path.resolve(file.destination, file.originalname);
        fs.rename(oldpath, newpath);
        num++;
    })
    if(num>=files.length){
        res.json({
            code:0,
            msg:'上传成功'
        })
    }
})
module.exports = router;