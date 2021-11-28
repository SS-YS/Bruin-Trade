import React, { Component } from "react";
import axios from "axios";

class OrderPage extends Component {
  constructor() {
    super();
    this.state = {
      username: sessionStorage.getItem("username"),
      order: sessionStorage.getItem("order"),
      order_status: "",
      buyer: "",
      seller: "",
      dinning_hall: "",
      time: "",
      price: "",
      code: "",
      input_verification: "",
      verified: false,
      rating: 0,
    };

    this.getOrderInfo();
    this.handle_enter_verification = this.handle_enter_verification.bind(this);
    this.handle_verification_submit =
      this.handle_verification_submit.bind(this);
    this.enter_verification = this.enter_verification.bind(this);
    this.display_verification = this.display_verification.bind(this);
    this.handle_enter_rating = this.handle_enter_rating.bind(this);
    this.handle_rating_submit = this.handle_rating_submit.bind(this);
    this.enter_rating = this.enter_rating.bind(this);
  }

  redirect() {
    if (sessionStorage.getItem("username") === null) {
      window.location.href = "/";
    }
  }

  enter_rating() {
    let name = "";
    if (this.state.username === this.state.buyer) {
      name = "seller";
    } else {
      name = "buyer";
    }
    return (
      <form onSubmit={this.handle_rating_submit}>
        <label>
          Please enter your rating of {name}
          <input
            type="number"
            value={this.state.rating}
            onChange={this.handle_enter_rating}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  handle_enter_rating(event) {
    this.setState({ rating: event.target.value });
  }

  handle_rating_submit(event) {

    let name = "";
    if (this.state.username === this.state.buyer) {
      name = this.state.seller;
    } else {
      name = this.state.buyer;
    }

    alert("You have entered the rating for " + name);
    const updateRating = {
      rating: this.state.rating,
      user: name
    };

    axios
      .post("http://localhost:4000/app/updateRating", updateRating)
      .then((response) => console.log(response.data));

    event.preventDefault();
  }

  enter_verification() {
    return (
      <form onSubmit={this.handle_verification_submit}>
        <label>
          Verification Code
          <input
            type="text"
            value={this.state.input_verification}
            onChange={this.handle_enter_verification}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  display_verification() {
    return <label>Verification Code: {this.state.code}</label>;
  }

  handle_enter_verification(event) {
    this.setState({ input_verification: event.target.value });
  }

  handle_verification_submit(event) {
    if (this.state.code === this.state.input_verification) {
      alert("You have entered the correct varification code");
      this.setState({ verified: true });
    } else {
      alert("You have entered the wrong varification code");
    }
    event.preventDefault();

    const finish = {
      _id:this.state.order
    };

    axios
    .post("http://localhost:4000/app/finished", finish)
    .then((response) => console.log(response.data));

  }

  getOrderInfo() {
    const orderInfo = {
      _id: this.state.order,
    };

    axios
      .post("http://localhost:4000/app/getOrder", orderInfo)
      .then((response) => {
        var status = "onSale";
        if (response.data.inProgress) {
          status = "inprogress";
        }
        if (response.data.finished) {
          status = "finished";
        }

        let time_str = "";
        if (response.data.time >= 1000) {
          time_str =
            String(response.data.time).slice(0, 2) +
            ":" +
            String(response.data.time).slice(2, 4);
        } else {
          time_str =
            "0" +
            String(response.data.time).slice(0, 1) +
            ":" +
            String(response.data.time).slice(1, 3);
        }

        this.setState({
          order_status: status,
          buyer: response.data.buyer,
          seller: response.data.seller,
          dinning_hall: response.data.location,
          time: time_str,
          price: response.data.price,
          code: String(response.data.code),
        });
      });
  }

  render() {
    this.redirect();
    let verification;
    if (
      this.state.order_status === "inprogress" &&
      this.state.username === this.state.buyer
    ) {
      verification = <this.display_verification />;
    } else if (
      this.state.order_status === "inprogress" &&
      this.state.username === this.state.seller
    ) {
      verification = <this.enter_verification />;
    }
    let rating;
    if (this.state.verified) {
      rating = <this.enter_rating />;
    } else {
      rating = null;
    }
    return (
      <div>
        <label>seller: {this.state.seller}</label>
        <p />
        <label>buyer: {this.state.buyer}</label>
        <p />
        <label>location: {this.state.dinning_hall}</label>
        <p />
        <label>time: {this.state.time}</label>
        <p />
        <label>price: {this.state.price}</label>
        <p />
        <label>status: {this.state.order_status}</label>
        <p />
        {verification}
        {rating}
      </div>
    );
  }
}

export default OrderPage;
