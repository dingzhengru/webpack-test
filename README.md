# My webpack test
## Webpack: webpack幫我們做的事情很簡單，就是幫我們編譯我們的Preprocess成瀏覽器看得懂的內容然後打包成一包的完成檔案然後拿去server上傳上去。  
```
|- package.json
|- webpack.config.js
|- server.js
|- /dist
  |- main.js
  |- index.html
|- /src
  |- icon.png
  |- style.css
  |- index.js
|- /node_modules
```
## Install
```npm install --save-dev webpack webpack-cli```
## bundle src to dist
```npx webpack```  
or(需要在package.json => "scripts" add "build": "webpack")  
```npm run build```

## Plugins(優先引入的Plugin)
### html-webpack-plugin
自動產生html至dist  
```npm install --save-dev html-webpack-plugin```  
webpack.config.js    
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
    new HtmlWebpackPlugin({
        title: 'html title'
    })
]
```
### clean-webpack-plugin
自動產生html至dist  
```npm install --save-dev clean-webpack-plugin```  
webpack.config.js    
```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
plugins: [
    new CleanWebpackPlugin()
]
```
## webpack-dev-server
### 簡單的 web server，具有 live reloading
```npm install --save-dev webpack-dev-server```
webpack.config.js  
```
devServer: {
    contentBase: './dist'
},
```
package.json  
```
"scripts": {
    "start": "webpack-dev-server --open",
}
```
執行```npm start```

## webpack-dev-middleware
### 是一個封裝器(wrapper)，它可以把webpack處理過的文件發送到一個 server
### 需自己創建一個server.js去serve這個專案
```npm install --save-dev express webpack-dev-middleware```
webpack.config.js  
```
output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
+   publicPath: './'
}
```
server.js  
```
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// 告訴 express 使用 webpack-dev-middleware，
// 以及將 webpack.config.js 作為基礎設置
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});
```
package.json(添加一個script, 方便運行)
```
"scripts": {
    "server": "node server.js"
}
```

## src/index.js
### Import Library
```
import _ from 'lodash'
```
## Import css
```npm install --save-dev style-loader css-loader```
index.js  
```
import './style.css'
```
webpack.config.js => module:{} => rules:[]  
```
{
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader'
    ]
}
```
## Import image
```npm install --save-dev file-loader```
index.js  
```
import Icon from './icon.png'
```
webpack.config.js => module:{} => rules:[]  
```
{
    test: /\.(png|svg|jpg|gif)$/,
    use: [
        'file-loader'
    ]
}
```

## Import fonts
webpack.config.js => module:{} => rules:[]  
```
{
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
        'file-loader'
    ]
}
```
Then can use @font-face in .css  
```
@font-face {
    font-family: 'MyFont';
    src:  url('./my-font.woff2') format('woff2'),
        url('./my-font.woff') format('woff');
    font-weight: 600;
    font-style: normal;
}

.hello {
    font-family: 'MyFont';
  }
```
## Import data(JSON, XML, CSV, TSV)
### json是不用另外引用Library的，內建引用就可以
```import JsonData from './data.json'```
### csv
```npm install --save-dev csv-loader```
```
{
    test: /\.(csv|tsv)$/,
    use: [
        'csv-loader'
    ]
}
```
```
import CsvData from './data.csv';
```
### xml
```npm install --save-dev xml-loader```
```
{
    test: /\.(.xml)$/,
    use: [
        'xml-loader'
    ]
}
```
```
import XmlData from './data.xml';
```

## 啟用HMR(hot module replacement)
### 刪除print.js的入口起點，因為現在已經在 index.js 模塊中引用它
webpack.config.js
```
const webpack = require('webpack');
entry: {
    app: './src/index.js'
},
devServer: {
    contentBase: './dist',
    hot: true
},
plugins: [
    new webpack.HotModuleReplacementPlugin()
],
```
## 通過Node.js API 啟用HMR
dev-server.js 跟server.js不同，這只是另一種啟用HMR的方式  
server.js是用express讀取webpack的設定，表示剛剛的設定已經加進server.js了
```
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000');
});
```
## 代碼分離
入口起點：使用 entry 配置手動地分離代碼(現在用的)  
防止重複：使用 SplitChunksPlugin 去重和分離chunk(會將重複引入的module放在chunk)
動態導入：通過模塊中的內聯函數調用來分離代碼  

### 防止重複: 可以防止重複引入重複的library(ex: lodash)
webpack.config.js  
```
optimization: {
    splitChunks: {
        chunks: 'all'
    }
}
```

## package.json
### Watch mode 存代碼自動重新編譯(不用再一直修改完手動打包)
### 開發可以用此自動打包，或是用webpack-dev-server(live reloading)
```
"scripts": {
    "watch": "webpack --watch",
}
```
執行```npm run watch```

## webpack.config.js

### devtool: 避免在production中使用 inline-... 和 eval-...，會增加bundle體積大小，降低整體性能。

### Multi Bundle
webpack.config.js  
```
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
```
index.html (bundle.js -> app.bundle.js)  
```<script src="./app.bundle.js"></script>```

## Plugins(Other)
### webpack-manifest-plugin: This will generate a manifest.json file
```npm install --save-dev webpack-manifest-plugin```

### webpack-merge: 可以把webpack.config.js分成多個.js檔
```npm install --save-dev webpack-merge```

webpack.common.js  
```
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Production'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    }
};
```
webpack.dev.js  
```
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    }
});
```
webpack.prod.js  
```
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
});
```
package.json  
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "watch": "webpack --watch",
    "start": "webpack-dev-server --open",
    "start-dev": "webpack-dev-server --open --config webpack.dev.js",
    "build-prod": "webpack --config webpack.prod.js",
    "server": "node server.js"
}
```