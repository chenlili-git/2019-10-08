const express = require('express');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './pic' }).array('image'));


app.post('/upload', (req, res) => {
    //当前图片的名字 req.files[0].originalname
    let num = 0;
    console.log(req.files);//也要匹配多张 

    req.files.forEach(element => {
        let writePath = __dirname + "/img/" + element.originalname;//写的路径
        //访问的路径
        fs.readFile(element.path, (error, data) => {
            if (error) {
                console.log('404');
            } else {
                let o = fs.writeFileSync(writePath, data);
                num++;
                //当所有的图片都上传完成 才返回客户端成功标志
                if (num === req.files.length) {
                    res.json({ code: 0 });
                }

            }
        });
    });

    // console.log();
})



app.listen(8082);