const http = require('http');//http.js可以缩写http  commonjs规范   node_moduldes中的文件也不用路径就可以引入
//1_server.js要引入2_server.js
/* const {fn}=require('./2_server.js');
console.log(fn); */

/* 
 request 请求   ajax
 response 响应  {}
*/
//我人生中的第一个接口诞生了
let app = http.createServer(function (request, response) {
    //console.log('来了');
    //console.log(request);
    //console.log(response);

    let url = request.url;
    console.log('1111111'+url);
    if (url !== '/favicon.ico') {
        let num = (/user=(\d)/.exec(url.split('?')[1]))[1];
        let name;
        console.log(num);
        //解析url
        //console.log(url);///post?user=0
        response.setHeader("content-type", "text/html;charset=UTF-8");//响应头 不写响应头中文就会乱码
        if (num === '0') {
            name = 'chenli'
        } else {
            name = '陈丽';

        }
        response.write(name);
        response.end();
    }

})
app.listen(50);