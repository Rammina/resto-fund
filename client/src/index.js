import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./configureStore";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App data-test="component-app" />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
