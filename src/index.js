import _ from 'lodash';
import $ from 'jquery';

import './style.css';
import Icon from './webpack-icon.png';
import './wallpaper.jpg';
import JsonData from './data.json'

import printMe from './print.js';
import { cube } from './math.js';

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack', '2'], ' ');
    
    // CSS
    element.classList.add('hello');

    // Image
    let myIcon = new Image(180); // new Image(width, height)
    myIcon.src = Icon;
    // element.appendChild(myIcon);

    // Json(data)
    console.log(JsonData);
    console.log(JsonData[0].id, JsonData[0].name)

    // custom js
    btn.innerHTML = 'Print me(see console.log)';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

let element = component();
document.body.appendChild(element);
console.log(cube(5));

if (module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated "printMe" module!');
        document.body.removeChild(element); // 刪除
        element = component(); // Re-render the "component" to update the click handler
        element = component(); // 重新渲染 component，剎車更新單擊事件處理函數
        document.body.appendChild(element);
    }),
    module.hot.accept('./math.js', function() {
        console.log('Accepting the updated "math" module!');
    })
}