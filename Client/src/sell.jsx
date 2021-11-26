import React, { Component } from "react";

class Selling_form extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log(Number(this.state.price));
  }

  handleSubmit(event) {
    if (true) {
      document.getElementById("11").classList.add("hidden");
    }

    if (this.state.dinningHall === "--Please Select One Dinning Hall--") {
      alert("you need to selected one dinning hall");
      event.preventDefault();
    } else if (this.state.hour === "--Hour--") {
      event.preventDefault();
      alert("you need to selected hour");
    } else if (this.state.minute === "--Minute--") {
      alert("you need to selected minute");
      event.preventDefault();
    } else if (this.state.price === "" || isNaN(this.state.price)){
      alert("you need to enter a valid price");
      event.preventDefault();
    } else {
      alert("You have selected the dinning hall: " + this.state.dinningHall +
      " at the time time: " + this.state.hour +  " : " + this.state.minute);
      event.preventDefault();
    }
  }

  render() {
    return (
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
            <option value="De neve">De Neve</option>
            <option value="Epic">Epic</option>
            <option value="Bruin Plate">Bruin Plate</option>
            <option value="Feast">Feast</option>
          </select>
        </label>

        <p />
        <label>
          Please Select One Time：
          <select value={this.state.hour} onChange={this.handleHourChange}>
            <option value="--Hour--">--Hour--</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option id="11" value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select>
          <label>:</label>
          <select value={this.state.minute} onChange={this.handleMinuteChange}>
            <option value="--Minute--">--Minute--</option>
            <option value="00">00</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </select>
        </label>

        <p/>
        <label>
          Price:
          <input type="text" value={this.state.price} onChange={this.handlePriceChange} />
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Selling_form;
