const http = require('http'),
    jquery = require('jquery'),
    fs = require('fs'),
    urlModel = require('url'),
    qs = require('querystring');

const app = http.createServer((req, res) => {

    let originAry = ['http://localhost:51'];//跨域的地址
    if (originAry.includes(req.headers.origin)) {
        //跨域
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8',
            'Access-Control-Allow-Origin': req.headers.origin//跨域白名单
        })
    }
    //console.dir(urlModel.parse(req.url));
    const { pathname, query } = urlModel.parse(req.url);
    const lastName = ['\.js$', '\.html$', '\.css$', '\.less$', '\.jpg$',];
    let re = new RegExp(lastName.join('|'));
    //判断访问的是根路径  代表访问的是文件
    if (pathname === '/') {
        let data = fs.readFileSync('www/index.html');
        res.end(data.toString());
    } else if (re.test(pathname)) {
        //访问的是静态文件
        try {
            let data = fs.readFileSync('www' + pathname);
            res.end(data.toString());
        } catch (error) {
            let dat = fs.readFileSync('www/404.html');
            res.end(data.toString());
        }
    } else {
        //访问的是接口
        switch (pathname) {
            case '/add'://添加文件夹
                const { mkdirname } = qs.parse(query);
                fs.mkdir('www/' + mkdirname + '/', (err) => {
                    if (err) {
                        if (err.code === 'EEXIST') {
                            fs.readdir('www', (error, filesArr) => {
                                console.log(filesArr);

                                let num = 0;
                                let b = filesArr.includes(mkdirname);
                                let name = mkdirname;
                                while (b) {
                                    name = mkdirname.replace(/\(\d)+\)/, '');
                                    b = filesArr.includes(name + '(' + (++num) + ')');
                                    name = name + '(' + (num) + ')';
                                }
                                console.log('111')
                                fs.mkdir('www/' + name + '/', (err) => {
                                    console.log('创建成功1');
                                })
                                res.end(JSON.stringify({
                                    code: 1,
                                    msg: '创建文件夹成功0'
                                }))
                            })
                        }
                        console.log('创建失败');
                        console.log(err);
                        return;

                    }
                    res.end(JSON.stringify({ code: 1, msg: '创建文件夹成功' }));
                })
                break;
            case '/rename':
                //如果是post请求
                console.log('1111');
                if (/^post$/i.test(req.method)) {
                    let temp = '';
                    //post请求 数据是一段段的 所以需要监听拼接
                    req.on('data', (d) => {
                        temp += d;
                    })
                    req.on('end', () => {
                        let o = qs.parse(temp.toString());
                        fs.rename('www/' + o.oldname, 'www/' + o.newname, () => {
                            res.end(JSON.stringify({
                                code: 1,
                                msg: 'rename success!'
                            }))
                        })
                    })
                }
                break;
            case '/jsonp':
                console.log(111)
                let o = qs.parse(query.toString());
                console.log(o)
                if (o.wd == 1) {
                    let json = JSON.stringify({
                        code: 1,
                        ary: [1, 2, 3, 4, 5]
                    })
                    res.end(o.callback + '(' + json + ')');
                } else {
                    let json2 = JSON.stringify({
                        code: 1,
                        ary: [5, 4, 3, 2, 1]
                    })
                    res.end(o.callback + '(' + json2 + ")");
                }
                break;
            default:
                break;
        }
    }
}).listen(50)