import React, { Component } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default class NavigationBar extends Component {
    goHome = () => {
        window.location.href = 'home';
    }

    goBuy = () => {
        window.location.href = 'buy';
    }

    goSell = () => {
        window.location.href = 'sell';
    }

    logout() {
        sessionStorage.removeItem("username")
        window.location.href = '/';
    }

    render() {
        return (
            <div className="navbar">
                <div className="navHeading">
                    <p className='h3 text-center'> Bruin Trade </p>
                    <p className='h6 text-center'> Make the most out of your meal plan! </p>
                </div>
                <ButtonGroup size="large" aria-label="large button group">
                    {window.location.href.includes('home') ? (
                        <Button style={{ fontFamily: 'Customized-Font' }} variant="contained" onClick={this.goHome}>Home</Button>
                    ) : (
                        <Button style={{ fontFamily: 'Customized-Font' }} onClick={this.goHome}>Home</Button>
                    )}
                    {window.location.href.includes('buy') ? (
                        <Button style={{ fontFamily: 'Customized-Font' }} variant="contained" onClick={this.goBuy}>Buy</Button>
                    ) : (
                        <Button style={{ fontFamily: 'Customized-Font' }} onClick={this.goBuy}>Buy</Button>
                    )}
                    {window.location.href.includes('sell') ? (
                        <Button style={{ fontFamily: 'Customized-Font' }} variant="contained" onClick={this.goSell}>Sell</Button>
                    ) : (
                        <Button style={{ fontFamily: 'Customized-Font' }} onClick={this.goSell}>Sell</Button>
                    )}
                    <Button style={{ fontFamily: 'Customized-Font' }} variant="outlined" color="error" onClick={this.logout}>Logout</Button>
                </ButtonGroup>
            </div>
        )
    }
}