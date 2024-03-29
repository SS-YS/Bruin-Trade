import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import Notification from "../components/Notification";

class ChangingPassword extends Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            password: '',
            old_password:'',
            confirm_password:'',
            message: '',
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

    changeOldPassword = (event) => {
        this.setState({
            old_password: event.target.value
        })
    }

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    changeConfirmPassword = (event) => {
        this.setState({
            confirm_password: event.target.value
        })
    }
    onSubmit = (event) => {
        event.preventDefault()
        if (
            this.state.userName === '' || this.state.old_password === '' || this.state.password === '' || this.state.confirm_password === ''
        ) {
            this.setState({ 
                alert : true,
                alertMessage : "Please fill out all fields.",
                alertType : "error"
            });
            return
        }
        const newpswd = {
            userName: this.state.userName,
            old_password: this.state.old_password,
            password: this.state.password,
        }
        const registered = {
            userName: this.state.userName,
        }
        axios.post("http://localhost:4000/app/usercheck", registered)
            .then(response => {
                console.log("response.data: ", response.data)
                if (response) {
                    if (response.data && response.data.userName === registered.userName) {
                        if (response.data.password === newpswd.old_password) {
                            if (this.state.confirm_password === this.state.password){
                                axios.post("http://localhost:4000/app/change_password", newpswd)
                                    .then(res => console.log(res.data));
                                this.setState({ 
                                    alert : true,
                                    alertMessage : "Password successfully changed.",
                                    alertType : "success"
                                });
                                window.location.href="home"
                            }
                            else{
                                this.setState({ 
                                    alert : true,
                                    alertMessage : "Two passwords entered do not match.",
                                    alertType : "error"
                                });
                            }
                        }
                        else 
                        {
                            this.setState({ 
                                alert : true,
                                alertMessage : "Username or old password is incorrect",
                                alertType : "error"
                            });
                        }
                    }
                    else{
                        this.setState({ 
                            alert : true,
                            alertMessage : "Username or old password is incorrect",
                            alertType : "error"
                        });
                    }
                }
            })
    }

    closeAlert() {
        this.setState({ alert : false });
    }

    render() {
        var heading = 'Change your password'
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
                    <p />
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <input type='text'
                                    placeholder='Username'
                                    onChange={this.changeUserName}
                                    value={this.state.userName}
                                    className='form-control form-group signupInputText'
                                />
                            </div>
                            <input type='password'
                                placeholder='Old Password'
                                onChange={this.changeOldPassword}
                                value={this.state.old_password}
                                className='form-control form-group'
                            />
                            <input type='password'
                                placeholder='New Password'
                                onChange={this.changePassword}
                                value={this.state.password}
                                className='form-control form-group'
                            />
                            <input type='password'
                                placeholder='Confirm Password'
                                onChange={this.changeConfirmPassword}
                                value={this.state.confirm_password}
                                className='form-control form-group'
                            />

                            <input type='submit' className='btn btn-block' value='Submit' />
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

export default ChangingPassword