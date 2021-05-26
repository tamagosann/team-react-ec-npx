import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import createStore from './redux/store/store';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './assets/css/reset.css'
import './index.css';
import './assets/css/style.css'

export const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
