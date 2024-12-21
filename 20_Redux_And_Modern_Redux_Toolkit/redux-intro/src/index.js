import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//IMPORTANT
// import "./store";   //for version 1
import store from './store';

//IMPORTANT
import {Provider} from "react-redux"

// store.dispatch({type: "account/deposit", payLoad: 250});
// console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* IMPORTANT */}
    {/* we wrap our entire application around the Provider component given by react-redux */}
    {/* now all component can read data from the store and dispatch action to it  */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
