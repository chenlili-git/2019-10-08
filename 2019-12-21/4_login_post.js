const http = require('http');
const fs = require('fs');

/* 
    注册接口
    /register?user=123 有没有这个人
    1.有没有这个人
    //失败
    {
        code:0,
        msg:"有这个人了"
    }
    //成功
    {
        code:1,
        msg:'没有这个人'
    }
*/
let sql = [
    {
        id: '1',
        username: 'chenli',
        password: '123'
    },
    {
        id: '2',
        username: '陈丽',
        password: '123'
    }

];
function queryString(str) {
    let obj = {};
    str.replace(/([^=]+)=([^&]+)&?/g, ($0, $1, $2) => {
        obj[$1] = $2;

    })
    return obj
}

//get
http.createServer(function (req, res) {
    let url = req.url;
    if (url !== '/favicon.ico') {
        if (url.includes('/post')) {
            //接口
            let html = '';
            req.on('data', (data) => {
                html += data;
            });
            req.on('end', () => {
                let opt = queryString(html);
                let msg = {
                    code: 0,
                    msg: '可以注册'
                }
                let o = sql.find(item => item.username === decodeURI(opt.user));
                if (o) {
                    msg.code = 1;
                    msg.msg = '有这个人';
                }
                res.setHeader('content-type', 'text/html;charset=utf-8');
                res.write(JSON.stringify(msg));
                res.end();
            })
        }else{
            //文件
            try {
                if(url==='/'){
                    url='index.html';
                }
                let data=fs.readFileSync('www'+url);
                res.write(data.toString());
                res.end();
            } catch (error) {
                let data = fs.readFileSync('www/404.html');
                res.write(data.toString());
                res.end();
            }
        }
    }
}).listen(52)