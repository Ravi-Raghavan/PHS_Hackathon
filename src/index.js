import React from 'react';
import ReactDOM from 'react-dom';
//import '/Users/raviraghavan/phs-project/src/index.css';
//import Main from '/Users/raviraghavan/phs-project/src/Main/Main.js';
import * as serviceWorker from './serviceWorker';
//import Shelter from '/Users/raviraghavan/phs-project/src/Shelter/Shelter.js'
//import Donate from '/Users/raviraghavan/phs-project/src/Donate/Donate.js'
import App from '/Users/raviraghavan/phs-project/src/App/App.js'
ReactDOM.render(<App/>, document.getElementById('main'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
