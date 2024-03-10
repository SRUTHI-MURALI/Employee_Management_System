import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { ToastContainer } from 'react-toastify'; // Updated import
import 'react-toastify/dist/ReactToastify.css'; // Updated import
import 'bootstrap/dist/css/bootstrap.min.css'; // Updated import
import './css/style.css'; // Updated import
import store from './store/configureStore';
import { Provider } from "react-redux";
import { initAuth } from "./helper/auth"; 
import { getLoggedUser } from "./actions/userActions";

const loggedUser = localStorage.getItem("email") || null;
store.dispatch(getLoggedUser(loggedUser));

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// initAuth();
