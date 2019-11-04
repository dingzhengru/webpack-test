import _ from 'lodash';
import $ from 'jquery';

import './style.css';
import Icon from './webpack-icon.png';
import './wallpaper.jpg';
import JsonData from './data.json'

import printMe from './print.js';

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    
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

document.body.appendChild(component());