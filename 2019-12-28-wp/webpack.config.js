// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');//css 最小输出
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const optimizeCss = require('optimize-css-assets-webpack-plugin'); //压缩成一行

// const obj = {
//     mode: 'production',
//     entry: { index: './index.js' }, //入口文件
//     output: {
//         filename: '[name].js',
//         path: path.resolve(__dirname, 'build')
//     },

//     module: {
//         rules: [
//             {
//                 test: /\.css$/,
//                 use: [
//                     {
//                         loader: MiniCssExtractPlugin.loader,
//                         options: {

//                         }

//                     },
//                     'css-loader'
//                 ]
//             },
//             {
//                 test: /\.html$/,
//                 use: [
//                     {
//                         loader: 'html-loader',
//                         options: {
//                             publicPath: "./"
//                         }

//                     }
//                 ]
//             },
//             {
//                 test: /.(jpg|jpeg|png|gif|svg)$/,
//                 use: [
//                     {
//                         loader: "url-loader",
//                         loader: 'file-loader',
//                         options: {
//                             esModule: false, // 这里设置为false
//                             limit: 620890,
//                             name: '[name].[ext]',
//                             publicPath: "../",
//                             outputPaht:'img/'
//                         }
//                         /* 
//                         1. limit = 后面跟的是数字，加上这个参数，图片文件大小（单位为byte）将小于620890byte的图片转成base64编码的形式，减少http请求。
//                         //下面打包的时候 可以用
//                         2. name 是表示文件被处理之后再目录中的路径和图片生成规则

//                         3. 以下三个参数可以自由组合，改变图片被处理有生成的文件名等信息
//                         [name]表示图片文件的文件名
//                         [ext]表示图片文件的扩展名
//                         [hash]表示图片文件的哈希值 */

//                     }
//                 ]
//             },
//             // {
//             //     test: /\.(htm|html)$/i,
//             //     use: [
//             //         { 
//             //             loader: 'html-withimg-loader', 
//             //         }
//             //     ]
//             // }

//         ]
//     },
//     // 导入在内存中生成的HTML插件  只要是插件都一定要放在plugin插件中去
//     plugins: [
//         new MiniCssExtractPlugin({
//             filename: './css/[name].css',
//         }),
//         //解析html
//         new HtmlWebpackPlugin({
//             title: 'Hello World',
//             minify: {
//                 removeComments: true, // 移除HTML中的注释
//                 collapseWhitespace: true, // 删除空白符与换行符
//                 minifyCSS: true// 压缩内联css

//             },
//             template: path.resolve(__dirname, './index.html'),// 指定模板页面, 将来会根据指定的页面路径, 去生成内存中的页面
//             filename: 'index.html'// 指定生成内存中的页面
//         }),
//         new optimizeCss(),
//     ]
// }
// module.exports = obj;

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //css 最小输出
const HtmlWebpackPlugin = require("html-webpack-plugin");
const optimizeCss = require("optimize-css-assets-webpack-plugin"); //压缩成一行
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const obj = {
    mode: "production",
    entry: { index: "./index.js" }, //入口文件
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build")
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../"   //css的中用到的路徑
                        }
                    },
                    "css-loader"
                ]
            },
            // {
            //     test: /\.html$/,
            //     use: [
            //         {
            //             loader: "html-loader",
            //             options: {
            //                 publicPath: "./"    //html中 用的路徑
            //             }
            //         }
            //     ]
            // },
            {
                test: /.(jpg|jpeg|png|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        loader: "file-loader",
                        options: {
                            esModule: false, // 这里设置为false
                            limit: 620890,
                            name: "img/[name].[ext]", //所有圖片都放在img下面
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
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        //解析html
        new HtmlWebpackPlugin({
            title:"Hello World",
            minify: {
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true // 压缩内联css
            },
            // template: path.resolve(__dirname, "./index.html"), // 指定模板页面, 将来会根据指定的页面路径, 去生成内存中的页面
            filename: "index.html" // 指定生成内存中的页面
        }),
        new optimizeCss()
    ]
};
module.exports = obj;