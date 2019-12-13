### AJAX
    - Asynchronous([eɪˈsɪŋkrənəs]异步) Javascript(js) And(和) XML（标记预言，数据）

    - 它是一个前后台数据交互的一种技术（找后台拿数据的方式）

    - 难点：如何操作数据（各种数据类型的应用），异步，参数如何拼接（字段是什么东西?name=zf&age=10），如何开启服务

    -ajax获取数据并不难，拿到数据后怎么处理数据是难点（业务逻辑）

```
    工作中：
    $.ajax({})
    fetch('')
    axios.get('')
    wx.request('') //微信小程序
    jsonp_fetch('')

    ajax：
        <script src="data.js"></script> 
        let data = {
            "0":{
                "pid":-1,
                "id":0,
                "title":'我的文档',
                checked:false
            },
            "1":{
                "pid":-1,
                "id":1,
                "title":'我的音乐',
                checked:false
            },

        }

     XML -> json -> '[]' || '{name:"小明",age:18,info:"哈哈哈"}'

        可以拿到data

```
- ajax最大的优点->可以局部刷新，减轻服务器的压力，提升用户体验

### 如何启动服务器
- 点击服务器文件（hello world）(文件名千万不要设置中文)

- 看看有没有node_modules文件，有就不用管，没有要安装依赖文件

    - 第一种方式：shift + 鼠标右键 选择在此处打开终端
    - 第二种方式：把服务器文件拖到vscode中，点击软件左下角master*后面的三角！,软件会弹出一块区域，导航有个终端，点击终端
    - 终端中输入 npm install 安装依赖
        如果下载报错（报错地址https://registry.npmjs.org/...）可能是app.js文件中设置的端口号和其他项目冲突了，所以改下app.listen(端口号)，然后再cmd窗口中重新下载，输入npm install, 如果下载成功就走下面的运行服务器步骤，如果下载还失败，考虑是否是网速慢，毕竟镜像是国外的，下载nrm

        1.nrm

        nrm(npm registry manager )是npm的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在 npm 源间切换

        2.安装nrm

        在命令行执行命令，npm install -g nrm，全局安装nrm。

        3.使用

        执行命令nrm ls查看可选的源。

        nrm ls                                                                                                                              
        *npm ---- https://registry.npmjs.org/

        cnpm --- http://r.cnpmjs.org/

        taobao - http://registry.npm.taobao.org/

        eu ----- http://registry.npmjs.eu/

        au ----- http://registry.npmjs.org.au/

        sl ----- http://npm.strongloop.com/

        nj ----- https://registry.nodejitsu.com/

        其中，带*的是当前使用的源，上面的输出表明当前源是官方源。

        5.切换

        如果要切换到taobao源，执行命令nrm use taobao。

        6.增加

        你可以增加定制的源，特别适用于添加企业内部的私有源，执行命令 nrm add <registry> <url>，其中reigstry为源名，url为源的路径。

        nrm add registry http://registry.npm.frp.trmap.cn/

        7.删除

        执行命令nrm del <registry>删除对应的源。

        8.测试速度

        你还可以通过 nrm test 测试相应源的响应时间。

        nrm test npm   


- 运行服务器
    - 输入npm run start 或者输入 node app 按tab键（自动补齐文件名）


- *** 浏览器要输入localhost/xx.html(打开方式)，千万不要双击直接运行文件（不要在本地打开，要使用localhost的方式打开）
- 代码放到public文件夹下  请求的数据在路由文件夹中

### ajax交互模型
    - 创建一个XMLHttpRequest对象
    - 填写请求方式，和请求地址，是否异步
    - 发送请求
    - 监听数据响应
    - 接收到数据

### GET和POST
```
    GET是通过url进行请求（4步就发送请求了）
        http://www.baidu.com:88/get?user=lilei#age=18
            协议 域名 端口 接口 查询信息  hash信息

        GET的优势就是快 （可用于展示类的）

        相对不安全（在请求的时候会显示在地址栏或者历史记录里面查到）

        请求体积是有限的（会根据浏览器的标准来限制）传大的东西传不了

        在低版本IE下有缓存的问题（/get?user=chenli）
            为什么ie会有缓存呢？节省流量 同样的东西不用一遍遍重新下载 直接缓存中拿

            因为第一次和第二次请求的url是一模一样的那么第二次就会走第一次的缓存

            解决：
                - 第一种：不用get用post
                - 第二种：每次url不一致
                        /get?user=chenli&random=2342342
                        后面跟个随机数
                        随机数最好是date.now()


            当输入的内容是中文时，IE下会出现错误请求和返回，原因是IE的低版本在解析中文的时候解析会有问题

            解决方案：
                把中文转成URI编码
                    encodeURI('续')->%E7%BB%AD
                    encodeURIComponent('续')
                URI编码转中文
                    decodeURI('%E7%BB%AD') -> 续
                    decodeURIComponent('%E7%BB%AD')

    POST是通过服务器来发送请求的（跟用户相关的信息，发送体积比较大的文件）(至少6步才能成功发送请求)

        相对安全，因为它是通过服务器来发送请求的

        理论上体积可以是无限大（但是一般后端开发人员都会给予限制）

        比get要慢

        必须添加请求头

        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')   

```