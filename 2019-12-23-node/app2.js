const http=require('http'),
jquery=require('jquery'),
fs=require('fs'),
urlModel=require('url'),
qs=require('querystring');

const app=http.createServer((req,res)=>{
    const {pathname,query}=(urlModel.parse(req.url));
    let lastName=['\.js$','\.html$','\.css$','\.less$','\.jpg$'];
    let re=new RegExp(lastName.join('|'));
    if(pathname==='/'){
        let data=fs.readFileSync('www2/index.html');
        res.end(data.toString());
    }
}).listen(51)