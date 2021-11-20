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
            already_signup: 'Please sign up.',
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
                    console.log("Username exists. Please log in.")
                    this.setState({already_signup: "Username exists. Please log in."})
                }
                else
                {
                    axios.post("http://localhost:4000/app/signup", registered)
                    .then(response => console.log(response.data))
                    this.setState({already_signup: "Sign up successful. Please log in."})
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
        
        return(
            <div>
                <div className='container'>
                    <p className='h3 text-center'>Sign up</p>

                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type='text'
                            placeholder='Full Name'
                            onChange={this.changeFullName}
                            value={this.state.fullName}
                            className='form-control form-group'
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
                    {this.state.already_signup}
                    </small>
                    </p>
                </div>
            </div>
        );  
    }
}

export default App