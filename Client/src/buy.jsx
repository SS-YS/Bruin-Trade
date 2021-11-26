import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

class BuyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seller: sessionStorage.getItem("username"),
      dinningHall: "--Please Select One Dinning Hall--",
      start_hour: "--Hour--",
      end_hour: "--Hour--",
      start_minute: "--Minute--",
      end_minute: "--Minute--",
      start_price: "",
      end_price: "",
    };
  }

  checkStartBeforeEnd() {
    const startTime = Number(this.state.start_hour + this.state.start_minute);
    const endTime = Number(this.state.end_hour + this.state.end_minute);

    if (startTime > endTime) {
      return true;
    }
    return false;
  }

  checkPrice() {
    if (this.state.end_price < this.state.start_price) {
      return true;
    }
    return false;
  }

  checkTimeConflict() {
    const startTime = Number(this.state.start_hour + this.state.start_minute);
    const endTime = Number(this.state.end_hour + this.state.end_minute);

    switch (this.state.dinningHall) {
      case "Epicuria":
        if (endTime < 1100)
          return true;
        break;
      case "De Neve":
        if ((endTime > 1000 && endTime < 1100) || startTime > 1000 && startTime < 1100)
          return true;
        break;
      case "Bruin Plate":
        if ((endTime > 1000 && endTime < 1100) || startTime > 1000 && startTime < 1100)
          return true;
        break;
      case "Feast":
        if (startTime < 1700)
          return true;
        break;
      default:
        return false
    }
    return false;
  }

  redirect() {
    if (sessionStorage.getItem("username") === null) {
      window.location.href = "/";
    }
  }

  logout() {
    sessionStorage.removeItem("username")
  }

  handleDinningChange(event) {
    this.setState({ dinningHall: event.target.value });
  }

  handleStartHourChange(event) {
    this.setState({ start_hour: event.target.value });
  }

  handleEndHourChange(event) {
    this.setState({ end_hour: event.target.value });
  }

  handleStartMinuteChange(event) {
    this.setState({ start_minute: event.target.value });
  }

  handleEndMinuteChange(event) {
    this.setState({ end_minute: event.target.value });
  }

  handleStartPriceChange(event) {
    this.setState({ start_price: event.target.value });
  }

  handleEndPriceChange(event) {
    this.setState({ end_price: event.target.value });
  }

  handleSearch(event) {
    if (this.state.dinningHall === "--Please Select One Dinning Hall--") {
      alert("you need to selected one dinning hall");
      event.preventDefault();
    } else if (this.state.start_hour === "--Hour--") {
      event.preventDefault();
      alert("you need to select a start hour");
    } else if (this.state.end_hour === "--Hour--") {
      event.preventDefault();
      alert("you need to select an end hour");
    } else if (this.state.start_minute === "--Minute--") {
      alert("you need to select a start minute");
      event.preventDefault();
    } else if (this.state.end_minute === "--Minute--") {
      alert("you need to select an end minute");
      event.preventDefault();
    } else if (this.state.start_price === "" || isNaN(this.state.start_price)) {
      alert("you need to enter a valid start price");
      event.preventDefault();
    } else if (this.state.end_price === "" || isNaN(this.state.end_price)) {
      alert("you need to enter a valid end price");
      event.preventDefault();
    } else if (this.checkStartBeforeEnd()) {
      alert("you need to enter a valid time interval");
      event.preventDefault();
    } else if (this.checkPrice()) {
      alert("you need to enter a valid price interval");
      event.preventDefault();
    } else if (this.checkTimeConflict()) {
      alert(this.state.dinningHall + " is not open at this time interval, please change your selected time");
      event.preventDefault();
    } else {
      alert("You have selected the dinning hall: " + this.state.dinningHall +
        " from " + this.state.start_hour + " : " + this.state.start_minute + "to"
        + this.state.end_hour + " : " + this.state.end_minute);
      event.preventDefault();
    }
  }

  render() {
    this.redirect();
    return (
      <div>
        <div className="navbar">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <span>Bruin Trade/Buy Page&nbsp;&nbsp;</span>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="home"> Home </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="sell"> Sell </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/" onClick={this.logout}> Logout </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="container">
          <form onSubmit={this.handleSearch}>
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
              Please Select a Time Range：
              <select value={this.state.start_hour} onChange={this.handleStartHourChange}>
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
              <select value={this.state.start_minute} onChange={this.handleStartMinuteChange}>
                <option value="--Minute--">--Minute--</option>
                <option value="00">00</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>

              <label>&nbsp;to&nbsp;</label>

              <select value={this.state.end_hour} onChange={this.handleEndHourChange}>
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
              <select value={this.state.end_minute} onChange={this.handleEndMinuteChange}>
                <option value="--Minute--">--Minute--</option>
                <option value="00">00</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
            </label>

            <p />
            <label>
              Price Range：
              <input type="text" value={this.state.start_price} onChange={this.handleStartPriceChange} />
              <label>&nbsp;to&nbsp;</label>
              <input type="text" value={this.state.end_price} onChange={this.handleEndPriceChange} />
            </label>

            <p />
            <button type="submit" class="btn btn-primary">Search</button>
          </form>
        </div>

      </div>
    );
  }
};

export default BuyPage;