import React, { Component } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import makeStyles from "@mui/styles"

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
        const styles = 
        {
            "&.MuiButton-root": {
                border: "2px #756e5f solid"
            },
            "&.MuiButton-text": {
                color: "#756e5f",
            },
            "&.MuiButton-contained": {
                backgroundColor: "#d4c8b0",
                color: "#756e5f"
            },
            "&.MuiButton-outlined": {
                color: "#756e5f"
            }
        }

        const logout_styles =
        {
            "&.MuiButton-root": {
                border: "2px solid"
            },
            "&.MuiButton-text": {
                color: "error",
            },
            "&.MuiButton-contained": {
                backgroundColor: "#d4c8b0",
                color: "error",
            },
            "&.MuiButton-outlined": {
                color: "error"
            }
        }

        return (
            <div className="navbar">
                <div className="navHeading">
                    <p className='h3 text-center'> Bruin Trade </p>
                    <p className='h6 text-center'> Make the most out of your meal plan! </p>
                </div>
                <ButtonGroup size="large" aria-label="large button group">
                    {window.location.href.includes('home') ? (
                        <Button className="normal_but" sx={styles} style={{ fontFamily: 'Customized-Font' }} variant="contained" onClick={this.goHome}>Home</Button>
                    ) : (
                        <Button className="normal_but" sx={styles} style={{ fontFamily: 'Customized-Font' }} variant="outlined" onClick={this.goHome}>Home</Button>
                    )}
                    {window.location.href.includes('buy') ? (
                        <Button className="normal_but" sx={styles} style={{ fontFamily: 'Customized-Font' }} variant="contained" onClick={this.goBuy}>Buy</Button>
                    ) : (
                        <Button className="normal_but" sx={styles} style={{ fontFamily: 'Customized-Font' }} variant="outlined" onClick={this.goBuy}>Buy</Button>
                    )}
                    {window.location.href.includes('sell') ? (
                        <Button className="normal_but" sx={styles} style={{ fontFamily: 'Customized-Font' }} variant="contained" onClick={this.goSell}>Sell</Button>
                    ) : (
                        <Button className="normal_but" sx={styles} style={{ fontFamily: 'Customized-Font' }} variant="outlined" onClick={this.goSell}>Sell</Button>
                    )}
                    <Button className="logout_but" sx={logout_styles} style={{ fontFamily: 'Customized-Font' }} variant="outlined" color="error" onClick={this.logout}>Logout</Button>
                </ButtonGroup>
            </div>
        )
    }
}