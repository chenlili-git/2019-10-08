const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const obj = {
    mode: 'development',
    entry: { index: './index.js' }, //入口文件
    devServer: {
        hot: true,//热更新
        open: true,//自动打开浏览器预览
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                ]
            },
            {
                test: /.(jpg|jpeg|png|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: { limit: 620800, //name:img/[name].[hash:5].[ext], publicPath: "../" 
                        }
                        /* 
                        1. limit = 后面跟的是数字，加上这个参数，图片文件大小（单位为byte）将小于620890byte的图片转成base64编码的形式，减少http请求。
                        //下面打包的时候 可以用
                        2. name 是表示文件被处理之后再目录中的路径和图片生成规则

                        3. 以下三个参数可以自由组合，改变图片被处理有生成的文件名等信息
                        [name]表示图片文件的文件名
                        [ext]表示图片文件的扩展名
                        [hash]表示图片文件的哈希值 */

                    }
                ]
            }

        ]
    },
   // 导入在内存中生成的HTML插件  只要是插件都一定要放在plugin插件中去
    plugins: [
        //解析html
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),// 指定模板页面, 将来会根据指定的页面路径, 去生成内存中的页面
            filename: 'index.html'// 指定生成内存中的页面
        })
    ]
}
module.exports = obj;