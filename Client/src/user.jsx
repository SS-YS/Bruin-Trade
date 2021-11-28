import axios from "axios";
import React, { Component } from "react";


class UserInfo extends Component {
    constructor() {
        super()
        this.state = {
            username: sessionStorage.getItem("username"),
            userDisplayed: sessionStorage.getItem("userDisplayed")
        }
    }

    redirect() {
        if (sessionStorage.getItem("username") === null) {
            window.location.href = "/";
        }
    }
    render() {
        this.redirect();
        return(
            <div>
                {this.state.userDisplayed}
                <label></label>
            </div>
        );
    }
}

export default UserInfo;