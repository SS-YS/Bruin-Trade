import axios from "axios";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

import BasicTimePicker from "./components/BasicTimePicker"
import SelectDiningHall from "./components/SelectDiningHall"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

class Selling_form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: sessionStorage.getItem("username"),
      dinningHall: null,
      time: null,
      hour: null,
      minute: null,
      price: null
    };
    this.handleDinningChange = this.handleDinningChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirect() {
    if (sessionStorage.getItem("username") === null) {
      window.location.href = "/";
    }
  }

  logout() {
    sessionStorage.removeItem("username")
  }

  checkTimeConflict() {
    const time = Number(this.state.hour + this.state.minute)
    if (
      (time < 700 || time > 2100) ||
      (time > 1000 && time < 1100) || 
      (time > 1500 && time < 1700)
    )
      return true; 

    switch (this.state.dinningHall) {
      case "Epicuria":
        if (time < 1100)
          return true;
        break;
      case "Feast":
        if (time < 1700)
          return true;
        break;
      default:
        break; 
    }
    return false;
  }

  handleDinningChange(event) {
    this.setState({ dinningHall: event.target.value });
  }

  handleTimeChange(time) {
    if (time === null) {
      this.setState({ 
        time: null, 
        hour: null,
        minute: null
      })
    }
    else {
      this.setState({ 
        time: time, 
        hour: ('0' + time.getHours()).slice(-2),
        minute: ('0' + time.getMinutes()).slice(-2)
      })
    }
  }

  handlePriceChange(event) {
    this.setState({ price: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.dinningHall === null) {
      alert("Please select a dinning hall.");
      event.preventDefault();
    } else if (this.state.time === null) {
      alert("Please choose a time.");
      event.preventDefault();
    } else if (this.state.price === null || isNaN(this.state.price)) {
      alert("Please enter a valid price.");
      event.preventDefault();
    } else if (this.checkTimeConflict()) {
      alert(this.state.dinningHall + " is not open at " + this.state.hour + ":" + this.state.minute + ". Please change your chosen time.");
      event.preventDefault();
    } else {
      alert("You have successfully posted a request to sell a swipe at the dinning hall " + this.state.dinningHall + " at time " + this.state.hour + ":" + this.state.minute + " for " + this.state.price + " dollars.");
      event.preventDefault();

      const orderInfo = {
        seller: this.state.seller,
        location: this.state.dinningHall,
        price: this.state.price,
        time: Number(this.state.hour + this.state.minute)
      }
      axios.post("http://localhost:4000/app/order", orderInfo)
        .then(response => console.log(response.data))
    }
  }

  render() {
    this.redirect();
    return (
      <div>

        <div className="navbar">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <span>Bruin Trade/Sell Page&nbsp;&nbsp;</span>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="home"> Home </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="buy"> Buy </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/" onClick={this.logout}> Logout </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <label> Please select a dining hall： </label>
            <p />
            <SelectDiningHall value={this.state.dinningHall} onChange={this.handleDinningChange}/>

            <p />
            <label> Please choose a time：</label>
            <p />
            <BasicTimePicker message="Choose a time" value={this.state.time} onChange={this.handleTimeChange} />

            <p />
            <label> Please enter a price：</label>
            <p />
            <TextField label="Enter a price" variant="outlined" value={this.state.price} onChange={this.handlePriceChange} />

            <p />
            <Button type="submit" sx={{ marginTop: 1, height: 40 }} variant="contained">Submit</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Selling_form;