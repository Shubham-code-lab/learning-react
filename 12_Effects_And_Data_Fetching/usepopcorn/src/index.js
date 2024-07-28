import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App-v1";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // react strict mode will render our component two time
  // so you see two console log for single statement if you have any.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
