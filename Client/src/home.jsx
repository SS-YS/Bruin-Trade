import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import NavigationBar from "./components/NavigationBar"

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      username: sessionStorage.getItem("username"),
    }
  }

  redirect() {
    if (sessionStorage.getItem("username") === null) {
      window.location.href = "/";
    }
  }

  render() {
    this.redirect();
    return (
      <div>
        <NavigationBar />
      </div>
    );
  }
};

export default HomePage;