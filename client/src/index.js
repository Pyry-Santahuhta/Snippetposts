import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./ocean.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

//Rendering the app, wrapped by router here so it can be used everywhere
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
