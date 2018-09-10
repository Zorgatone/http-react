import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

axios.interceptors.request.use(
  request => {
    console.log(request);
    return request;
  },
  error => {
    console.error("An error occurred!", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    console.error("An error occurred!", error);
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
