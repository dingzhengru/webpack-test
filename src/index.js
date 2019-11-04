import _ from 'lodash';

import './style.css';
import Icon from './webpack-icon.png';
import './wallpaper.jpg';

function component() {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    let myIcon = new Image(180); // new Image(width, height)
    myIcon.src = Icon;

    element.appendChild(myIcon);

    return element;
}

document.body.appendChild(component());