// import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';
// import reportWebVitals from './reportWebVitals';

import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

class App extends Component {
    constructor(){
        super()
        this.state = {
            fullName: '',
            userName: '',
            email: '',
            password: '',
            message: 'Please sign up.',
            is_signup: true,
            is_login: false,
            login_success: false,
        }
    }

    changeFullName = (event) => {
        this.setState({
            fullName:event.target.value
        })
    }

    changeUserName = (event) => {
        this.setState({
            userName:event.target.value
        })
    }

    changeEmail = (event) => {
        this.setState({
            email:event.target.value
        })
    }

    changePassword = (event) => {
        this.setState({
            password:event.target.value
        })
    }
    
    onClick_signup = (event) => {
        event.preventDefault()

        this.setState({is_signup: true, is_login: false})
    }

    onClick_login = (event) => {
        event.preventDefault()

        this.setState({is_signup: false, is_login: true})
    }


    onSubmit = (event) => {
        event.preventDefault()

        const registered = {
            fullName: this.state.fullName,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password,
        }

        axios.post("http://localhost:4000/app/usercheck", registered)
        .then(response => {
            if (response) {
                console.log("response.data: ", response.data)
                if (response.data && response.data.userName === registered.userName)
                {
                    if (this.state.is_signup)
                    {                    
                        this.setState({message: "Username exists. Please log in."})
                    }
                    else if (this.state.is_login)
                    {
                        if (response.data.password === registered.password)
                        {
                            this.setState({login_success: true})
                            this.setState({message: "Log in successful."})
                        }
                        else
                        {
                            this.setState({message: "Password incorrect."})
                        }
                    }
                }
                else
                {
                    if (this.state.is_signup)
                    {                    
                        axios.post("http://localhost:4000/app/signup", registered)
                        .then(response => console.log(response.data))
                        this.setState({message: "Sign up successful. Please log in."})
                    }
                    else if (this.state.is_login)
                    {
                        this.setState({message: "Username not registered."})
                    }
                }
            }
        })

        /*       
        axios.get("http://localhost:4000/app/fetch", {params: {userName: this.state.userName}})
        .then(response => {
            let user_name_exists = false
            if (response) {
                console.log("response.data: ", response.data)
                for (var i = 0; i < response.data.length; i++){
                    if (response.data[i].userName === registered.userName){
                        console.log("Username exists. Please log in.")
                        user_name_exists = true
                        break
                    }
                }
            }
            if (!user_name_exists) {
                axios.post("http://localhost:4000/app/signup", registered)
                    .then(response => console.log(response.data))
            }
        })
        */

        this.setState({
            fullName: '',
            userName: '',
            email: '',
            password: '',
        })
    }

    render(){
        var fullName_email_visibility = this.state.is_signup ? 'visible' : 'hidden'
        var heading = this.state.is_signup? 'Sign Up' : 'Log In'
        
        return(
            <div>
                <div className='container'>
                    <p className='h3 text-center'>{heading}</p>

                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type='button' id='signup' onClick={this.onClick_signup} className='btn btn-block' value='Sign Up'/>
                            <input type='button' id='login' onClick={this.onClick_login} className='btn btn-block' value='Log in'/>

                            <input type='text'
                            placeholder='Full Name'
                            onChange={this.changeFullName}
                            value={this.state.fullName}
                            className='form-control form-group'
                            style={{visibility: fullName_email_visibility}}
                            />

                            <input type='text'
                            placeholder='Username'
                            onChange={this.changeUserName}
                            value={this.state.userName}
                            className='form-control form-group'
                            />
                            
                            <input type='text'
                            placeholder='E-mail'
                            onChange={this.changeEmail}
                            value={this.state.email}
                            className='form-control form-group'
                            style={{visibility: fullName_email_visibility}}
                            />
                            
                            <input type='password'
                            placeholder='Password'
                            onChange={this.changePassword}
                            value={this.state.password}
                            className='form-control form-group'
                            />
                            
                            <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
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

export default App


ReactDOM.render(<App />, document.getElementById('root'))
