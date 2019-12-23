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
function queryString(str){
    let obj={};
    str.replace(/([^=]+)=([^&]+)&?/g,($0,$1,$2)=>{
        obj[$1]=$2;
      
    })
    return obj
}

//get
http.createServer(function (req, res) {
    let url = req.url;
    if (url !== '/favicon.ico') {
        if (url.includes('?')) {
            //接口
            let arr=url.split('?')
            let interface = arr[0];
            let opt=queryString(arr[1]);//user=123&
            switch (interface) {
                case '/searchname':
                    let msg={
                        code:0,
                        msg:'可以注册'
                    }
                    let o=sql.find(item=>item.username===decodeURI(opt.user));
                    if(o){
                        msg.code=1;
                        msg.msg='有这个人了';
                    }
                    res.setHeader('content-type','text/html;charset=utf-8');
                    res.write(JSON.stringify(msg));
                    res.end;
                    break;
                case '/register'://注册
                    console.log('11111');
                    let msg1={
                        code:1,
                        msg:'注册成功'
                    }
                    let o1=sql.find(item=>item.username===decodeURI(opt.user));
                    if(o){
                        msg1.code=0;
                        msg1.msg='有这个人了'
                    }else{
                        if(opt.password){
                            sql.push({
                                id:Date.now(),
                                username:decodeURI(opt.user),
                                password:opt.password
                            })
                        }else{
                            msg1.code=2;
                            msg1.msg='参数不正确';
                            res.writeHead(400,{'content-type':'text/html;charset=utf-8'});
                            res.write(JSON.stringify(msg1));
                            res.end();
                            return;
                        }
                    }
                    res.setHeader({'content-type':'text/html;charset=utf-8'});
                   
                    res.write(JSON.stringify(msg1));
                    res.end();
                    break;
            }
        } else {
            //文件
            try{
                if(url==='/'){
                    url='/index.html';
                }
                let data=fs.readFileSync('www'+url);
                res.write(data.toString());
                res.end();
            }catch(error){
                let data=fs.readFileSync('www/404.html');
                res.write(data.toString());
                res.end();
            }
        }
    }
}).listen(51)