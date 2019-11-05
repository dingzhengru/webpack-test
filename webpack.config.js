
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
// devtool: "source-map" 打包設定，inline-source-map選項有助於解釋說明錯誤在哪裡
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
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    optimization: {
      usedExports: true
    },
    entry: {
        app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'html title'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },
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