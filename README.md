# My webpack test

|- package.json
|- webpack.config.js
|- index.html
|- /dist
  |- main.js
  |- index.html
|- /src
  |- icon.png
  |- style.css
  |- index.js
|- /node_modules

## Install
```npm install --save-dev webpack webpack-cli```

## bundle src to dist
```npx webpack```  
or(需要在package.json => "scripts" add "build": "webpack")  
```npm run build```

## index.html
### Import your Js & Library
```
<script src="https://unpkg.com/lodash@4.16.6"></script>
<script src="./src/index.js"></script>
```
## src/index.js
### Import Library
```
import _ from 'lodash'
```
## Import css
```npm install --save-dev style-loader css-loader```
### index.js
```
import './style.css'
```
### webpack.config.js => module:{} => rules:[]
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
### index.js
```
import Icon from './icon.png'
```
### webpack.config.js => module:{} => rules:[]
```
{
    test: /\.(png|svg|jpg|gif)$/,
    use: [
        'file-loader'
    ]
}
```

## Import fonts
### webpack.config.js => module:{} => rules:[]
```
{
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
        'file-loader'
    ]
}
```
### Then can use @font-face in .css 
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
## package.json


## webpack.config.js

