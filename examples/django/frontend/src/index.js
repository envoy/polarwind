import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

/**
 * Maintain a simple map of React components to make it easier
 * for Django to reference individual components
 */
const pages = {
  App,
};

/**
 * If Django hasn't injected these properties into the HTML
 * template that's loading this script then we're viewing it
 * via the create-react-app liveserver
 */
window.component = window.component || "App";
window.props = window.props || { env: "Create-React-App" };
window.reactRoot = window.reactRoot || document.getElementById("root");

ReactDOM.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(pages[window.component], window.props)
  ),
  window.reactRoot
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
