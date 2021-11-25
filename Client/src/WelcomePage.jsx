import React, { Component } from "react";

class WelcomePage extends Component {
  constructor(){
    super()
    this.state={
      userName: sessionStorage.getItem("username"),
    }
  }

  redirect(){
    if(this.state.userName === null) {
      window.location.href = "/";
    }
  }

  render(){
    this.redirect();
    return(
      <h1>Welcome to BruinTrade {this.state.userName}</h1>
    );
  }
};

export default WelcomePage;