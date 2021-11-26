import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import React, { Component } from "react";

class Selling_form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: sessionStorage.getItem("username"),
      dinningHall: "--Please Select One Dinning Hall--",
      hour: "--Hour--",
      minute: "--Minute--",
      price: ""
    };

    this.handleDinningChange = this.handleDinningChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
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

    switch (this.state.dinningHall) {
      case "Epicuria":
        if (time < 1100)
          return true;
        break;
      case "De Neve":
        if (time > 1000 && time < 1100)
          return true;
        break;
      case "Bruin Plate":
        if (time > 1000 && time < 1100)
          return true;
        break;
      case "Feast":
        if (time < 1700)
          return true;
        break;
      default:
        return false
    }
    return false;
  }

  handleDinningChange(event) {
    this.setState({ dinningHall: event.target.value });
  }

  handleHourChange(event) {
    this.setState({ hour: event.target.value });
  }

  handleMinuteChange(event) {
    this.setState({ minute: event.target.value });
  }

  handlePriceChange(event) {
    this.setState({ price: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.dinningHall === "--Please Select One Dinning Hall--") {
      alert("you need to selected one dinning hall");
      event.preventDefault();
    } else if (this.state.hour === "--Hour--") {
      event.preventDefault();
      alert("you need to selected hour");
    } else if (this.state.minute === "--Minute--") {
      alert("you need to selected minute");
      event.preventDefault();
    } else if (this.state.price === "" || isNaN(this.state.price)) {
      alert("you need to enter a valid price");
      event.preventDefault();
    } else if (this.checkTimeConflict()) {
      alert(this.state.dinningHall + " is not open at " + this.state.hour + " : " + this.state.minute + ", please change your selected time");
    } else {
      alert("You have selected the dinning hall: " + this.state.dinningHall +
        " at the time time: " + this.state.hour + " : " + this.state.minute);
      event.preventDefault();

      const orderInfo = {
        buyer: "null",
        seller: this.state.seller,
        location: this.state.dinningHall,
        price: this.state.price,
        time: Number(this.state.hour + this.state.minute)
      }
      axios.post("http://localhost:4000/app/order", orderInfo)
        .then(response => console.log(response.data))

      this.setState({
        seller: sessionStorage.getItem("username"),
        dinningHall: "--Please Select One Dinning Hall--",
        hour: "--Hour--",
        minute: "--Minute--",
        price: ""
      });
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
            <label>
              Please Select One Dinning Hall：
              <select
                value={this.state.dinningHall}
                onChange={this.handleDinningChange}
              >
                <option value="--Please Select One Dinning Hall--">
                  --Please Select One Dinning Hall--
                </option>
                <option value="De Neve">De Neve</option>
                <option value="Epicuria">Epicuria</option>
                <option value="Bruin Plate">Bruin Plate</option>
                <option value="Feast">Feast</option>
              </select>
            </label>

            <p />
            <label>
              Please Select One Time：
              <select value={this.state.hour} onChange={this.handleHourChange}>
                <option value="--Hour--">--Hour--</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="20">21</option>
              </select>
              <label>&nbsp;:&nbsp;</label>
              <select value={this.state.minute} onChange={this.handleMinuteChange}>
                <option value="--Minute--">--Minute--</option>
                <option value="00">00</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
            </label>

            <p />
            <label>
              Price：
              <input class="px-1 py-1" type="text" value={this.state.price} onChange={this.handlePriceChange} />
            </label>

            <p />
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>

      </div>
    );
  }
}

export default Selling_form;