import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import PageNotFound from "./404";
import SignupPage from "./Signup";
import './Signup.css'

class App extends Component{
    render(){
    return(
    <Router>
       <Routes>
		      <Route exact path="/" element={<SignupPage/>}/>
                <Route exact path="/404" element = {<PageNotFound/>}/>
                <Route exact path="/WelcomePage" element = {<WelcomePage/>}/>
                <Route element = {<PageNotFound/>}/>
	    </Routes>
    </Router>
    );
}
}


export default App;