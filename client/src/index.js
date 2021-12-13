import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./ocean.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// if (process.env.NODE_ENV !== "production") {
//   import("react-axe").then((axe) => {
//     axe = require("react-axe");
//     axe(React, ReactDOM, 1000);
//   });
// }
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
