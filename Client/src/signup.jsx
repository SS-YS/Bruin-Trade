import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

class SignupPage extends Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            phoneNumber: '',
            password: '',
            message: 'Please sign up / log in.',
            is_signup: true,
            is_login: false,
            login_success: false,
        }
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
        this.setState({ is_signup: true, is_login: false, message: "Please sign up." })
    }

    onClick_login = (event) => {
        event.preventDefault()
        document.getElementById("phoneNumber").classList.add("hidden");
        this.setState({ is_signup: false, is_login: true, message: "Please log in." })
    }


    onSubmit = (event) => {
        event.preventDefault()
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
                            this.setState({ message: "Username exists. Please log in." })
                        }
                        else if (this.state.is_login) {
                            if (response.data.password === registered.password) {
                                this.setState({ login_success: true })
                                this.setState({ message: "Log in successful." })
                                sessionStorage.setItem("username", this.state.userName)
                                window.location.href = "home"
                            }
                            else {
                                this.setState({ message: "Password incorrect." })
                            }
                        }
                    }
                    else {
                        if (this.state.is_signup) {
                            axios.post("http://localhost:4000/app/signup", registered)
                                .then(response => console.log(response.data))
                            this.setState({ message: "Sign up successful. Please log in." })
                        }
                        else if (this.state.is_login) {
                            this.setState({ message: "Username not registered." })
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

    render() {
        var heading = this.state.is_signup ? 'Sign up' : 'Log in'

        return (
            <div>
                <p className='h2 heading text-center'> Bruin Trade </p>
                <div className='container'>
                    <p className='h4 text-center'>{heading}</p>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type='button' id='signup' onClick={this.onClick_signup} className='btn btn-block' value='Sign up' />
                            <input type='button' id='login' onClick={this.onClick_login} className='btn btn-block' value='Log in' />
                            <input type='text'
                                placeholder='Username'
                                onChange={this.changeUserName}
                                value={this.state.userName}
                                className='form-control form-group'
                            />
                            <div id="phoneNumber">
                                <input type='text'
                                    placeholder='Phone Number'
                                    onChange={this.changePhoneNumber}
                                    value={this.state.phoneNumber}
                                    className='form-control form-group'
                                />
                            </div>
                            <input type='password'
                                placeholder='Password'
                                onChange={this.changePassword}
                                value={this.state.password}
                                className='form-control form-group'
                            />
                            <input type='submit' className='btn btn-danger btn-block' value='Submit' />
                        </form>
                    </div>
                    <p className='h4 text-center' type='text'>
                        <small>
                            {this.state.message}
                        </small>
                    </p>
                </div>
            </div>
        );
    }
}

export default SignupPage