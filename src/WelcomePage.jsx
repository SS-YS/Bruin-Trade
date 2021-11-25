import React from "react";

const WelcomePage = () => {
  var userName = sessionStorage.getItem("username");  
  return <h1>Welcome to BruinTrade, {userName}</h1>;
};

export default WelcomePage;