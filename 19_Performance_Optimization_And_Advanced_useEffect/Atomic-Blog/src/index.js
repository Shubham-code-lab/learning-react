import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
// import App from "./App";
// import App from "./App-memo";
import App from "./App-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
