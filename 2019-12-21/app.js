const http = require('http');
const fs = require('fs');
// let app = http.createServer(function (req, res) {})
/* //读取文件
fs.readFile('1.txt', function (err, data) {
    if (err) {
        console.log('读取失败')
    }
    console.log(data.toString());
}) */
/* //写文件
fs.writeFile('2.txt','陈丽',function(err){
    if(err) throw err;
    console.log('文件已建成');
}) */

/* //删除文件

fs.unlink('2.txt',function(err){
    if(err) throw err;
    console.log('文件删除成功');
}) */

//新建文件夹 mkdir