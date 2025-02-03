import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from "./app/store";
import { Provider } from "react-redux";
import './index.css'
import axios from "axios";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
      <App />
    </Provider>

)
