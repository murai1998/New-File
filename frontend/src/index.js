import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Main";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
