import './index.css';

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './App';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = 'https://binks-backend.sk02k1.repl.co';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
