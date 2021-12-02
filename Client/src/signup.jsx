import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Notification from "./components/Notification";
import axios from 'axios'

class SignupPage extends Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            phoneNumber: '',
            password: '',
            is_signup: true,
            is_login: false,
            login_success: false,
            alert : false,
            alertMessage : null,
            alertType : null,
        }
        this.closeAlert = this.closeAlert.bind(this);
    }

    changeUserName = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    changePhoneNumber = (event) => {
        this.setState({
            phoneNumber: event.target.value
        })
    }

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onClick_signup = (event) => {
        event.preventDefault()
        document.getElementById("phoneNumber").classList.remove("hidden");
        document.getElementById("changePassword").classList.add("hidden");
        this.setState({ is_signup: true, is_login: false, message: "Please sign up." })
    }

    onClick_login = (event) => {
        event.preventDefault()
        document.getElementById("phoneNumber").classList.add("hidden");
        document.getElementById("changePassword").classList.remove("hidden");
        this.setState({ is_signup: false, is_login: true, message: "Please log in." })
    }


    onSubmit = (event) => {
        event.preventDefault()
        if (
            (this.state.is_signup && (this.state.userName === '' || this.state.phoneNumber === '' || this.state.password === ''))
            || (this.state.is_login && (this.state.userName === '' || this.state.password === ''))
        ) {
            this.setState({ 
                alert : true,
                alertMessage : "Please fill out all fields.",
                alertType : "error"
            });
            return
        }
        const registered = {
            userName: this.state.userName,
            phoneNumber: this.state.phoneNumber,
            password: this.state.password,
        }
        axios.post("http://localhost:4000/app/usercheck", registered)
            .then(response => {
                if (response) {
                    console.log("response.data: ", response.data)
                    if (response.data && response.data.userName === registered.userName) {
                        if (this.state.is_signup) {
                            this.setState({ 
                                alert : true,
                                alertMessage : "Username exists. Please log in.",
                                alertType : "error"
                            });
                        }
                        else if (this.state.is_login) {
                            if (response.data.password === registered.password) {
                                this.setState({ 
                                    alert : true,
                                    alertMessage : "Log in successful.",
                                    alertType : "success",
                                    login_success: true
                                });
                                sessionStorage.setItem("username", this.state.userName)
                                window.location.href = "home"
                            }
                            else {
                                this.setState({ 
                                    alert : true,
                                    alertMessage : "Password incorrect.",
                                    alertType : "error"
                                });
                            }
                        }
                    }
                    else {
                        if (this.state.is_signup) {
                            if ((this.state.phoneNumber.replace(/[- ]/g,'')).length !== 10) {
                                this.setState({
                                    alert : true,
                                    alertMessage : "Phone number must be 10-digit long.",
                                    alertType : "error",
                                })
                            } 
                            else if (isNaN((this.state.phoneNumber).replace(/[- ]/g,''))){
                                this.setState({
                                    alert : true,
                                    alertMessage : "Phone number must be all numbers.",
                                    alertType : "error",
                                })
                            }
                            else {
                                const new_user = {
                                    userName: this.state.userName,
                                    phoneNumber: (this.state.phoneNumber).replace(/[- ]/g,''),
                                    password: this.state.password,
                                    rating: 5,
                                    finished_order_number: 0,
                                }
                                axios.post("http://localhost:4000/app/signup", new_user)
                                    .then(response => console.log(response.data))
                                this.setState({ 
                                    alert : true,
                                    alertMessage : "Sign up successful. Please log in.",
                                    alertType : "success"
                                });
                            }
                        }
                        else if (this.state.is_login) {
                            this.setState({ 
                                alert : true,
                                alertMessage : "Username not registered.",
                                alertType : "error"
                            });
                        }
                    }
                }
                this.setState({
                    userName: '',
                    phoneNumber: '',
                    password: '',
                })
            })
    }

    closeAlert() {
        this.setState({ alert : false });
    }

    render() {
        var heading = this.state.is_signup ? 'Sign up' : 'Log in'
        return (
            <div>
                <Notification alert={this.state.alert} 
                    alertMessage={this.state.alertMessage} 
                    alertType={this.state.alertType} 
                    closeAlert={this.closeAlert} />
                <div className="heading">
                    <p className='h1 text-center'> Bruin Trade </p>
                    <p className='h5 text-center'> Make the most out of your meal plan! </p>
                </div>
                <div className='container'>
                    <p className='h4 text-center'>{heading}</p>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit} className="marginForm">
                            <input type='button' id='signup' onClick={this.onClick_signup} className='btn btn-block' value='Sign up' />
                            <input type='button' id='login' onClick={this.onClick_login} className='btn btn-block' value='Log in' />
                            <div>
                                <input type='text'
                                    placeholder='Username'
                                    onChange={this.changeUserName}
                                    value={this.state.userName}
                                    className='form-control form-group signupInputText'
                                />
                            </div>
                            <div id="phoneNumber">
                                <input type='text'
                                    placeholder='Phone Number'
                                    onChange={this.changePhoneNumber}
                                    value={this.state.phoneNumber}
                                    className='form-control form-group signupInputText'
                                />
                            </div>
                            <input type='password'
                                placeholder='Password'
                                onChange={this.changePassword}
                                value={this.state.password}
                                className='form-control form-group'
                            />
                            <input type='submit' className='btn btn-block' value='Submit' />
                            <input type='submit' id="changePassword" onClick={
                                (event) => {
                                    event.preventDefault()
                                    window.location.href = "change_password"
                                }
                            } className='btn btn-block hidden' value='Change Password' />
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default SignupPage