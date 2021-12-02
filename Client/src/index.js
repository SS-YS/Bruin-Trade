import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import PageNotFound from "./pages/404";
import SignupPage from "./pages/signup";
import SellPage from "./pages/sell"
import BuyPage from "./pages/buy"
import ChangingPassword from "./pages/change-password";
import OrderPage from "./pages/order"
import UserInfo from "./pages/user"
import "./styles/index.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<SignupPage />} />
          <Route exact path="*" element={<PageNotFound />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/sell" element={<SellPage />} />
          <Route exact path="/buy" element={<BuyPage />} />
          <Route exact path="/change_password" element={<ChangingPassword/>} />
          <Route exact path="/order" element={<OrderPage />} />
          <Route exact path="/user_info" element={<UserInfo />} />
        </Routes>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);