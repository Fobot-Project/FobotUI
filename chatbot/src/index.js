import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
// Css
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './assets/css/animate.min.css';
import './assets/css/style.css';

ReactDOM.render(
  <BrowserRouter basename={'/chatbot'}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
