import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import reducers from "./redux/reducers";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <ToastContainer
          bodyClassName="font-primary text-sm "
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        ></ToastContainer>
      </Router>
    </Provider>
  </React.StrictMode>
);
