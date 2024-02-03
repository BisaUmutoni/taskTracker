import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './index.css'
import index from './index.jsx'
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import Dashboard from './pages/Dashboard.jsx';
import taskTracker from './pages/taskTracker.jsx';
import Home from './pages/Home/HomePage.jsx';
import HomePage from './pages/Home/HomePage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <HomePage />
  </Provider>
)
