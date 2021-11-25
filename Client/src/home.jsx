import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      username: sessionStorage.getItem("username"),
    }
  }

  redirect() {
    if (this.state.username === null) {
      window.location.href = "/";
    }
  }

  render() {
    this.redirect();
    return (
      <div className="navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <span>Bruin Trade/Home Page</span>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="buy"> Buy </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="sell"> Sell </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};

export default HomePage;