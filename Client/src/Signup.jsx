import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

class SignupPage extends Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            password: '',
            message: 'Please sign up.',
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

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onClick_signup = (event) => {
        event.preventDefault()
        this.setState({ is_signup: true, is_login: false })
    }

    onClick_login = (event) => {
        event.preventDefault()
        this.setState({ is_signup: false, is_login: true })
    }


    onSubmit = (event) => {
        event.preventDefault()
        const registered = {
            userName: this.state.userName,
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
                                window.location.href = "WelcomePage"
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
                    password: '',
                })
            })
    }

    render() {
        var heading = this.state.is_signup ? 'Sign Up' : 'Log In'

        return (
            <div>
                <div className='container'>
                    <p className='h3 text-center'>{heading}</p>

                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type='button' id='signup' onClick={this.onClick_signup} className='btn btn-block' value='Sign Up' />
                            <input type='button' id='login' onClick={this.onClick_login} className='btn btn-block' value='Log in' />

                            <input type='text'
                                placeholder='Username'
                                onChange={this.changeUserName}
                                value={this.state.userName}
                                className='form-control form-group'
                            />

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