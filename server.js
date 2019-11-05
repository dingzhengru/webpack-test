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