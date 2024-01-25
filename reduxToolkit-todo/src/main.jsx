import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './app/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  /**Just like context API here also We are wrapping the whole app so that it is accessable globally... */
  <Provider store={store}> 
    <App />
  </Provider>
)
