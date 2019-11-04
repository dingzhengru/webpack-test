
// mode: "production" | "development" | "none"
// entry: 入口js檔
// output: 出口js擋  filename, publicPath, library, libraryTarget
/* module: 關於模板配置 rules
    rules:[
        {
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, "app")
            ],
            exclude:[
                path.resolve(__dirname, "app/demo-files")
            ]
            // 以上三個都是篩選用的條件
            // test是用正則表達式
            // include,exclude是用絕對路徑
            // exclude必是不匹配的選項(建議用include，不要用此)
            
            issuer: { test, include, exclude }
            // 導入條件
            
            loader: "babel-loader"
            options: {
                presets: ["es2015"]
            }
            // loader的選項
        }
    ]
*/
// resolve: {} 解析modules請求的選項
// performance: { hints: "warning" | "error" | false } 設定效能提示
// devtool: "source-map" 設定browser devtools的顯示訊息(source-map最詳細)
// context: __dirname webpack的主目錄
// target: "web" 設定運行環境
// externals
// serve: { port: 1337, content: './dist' //... } 為webpack-serve提供選項
// stats: "errors-only" 設定要顯示的bundle(打包)訊息
// devServer
// plugins
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'html title'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};