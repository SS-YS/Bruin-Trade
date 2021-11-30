import React, { Component } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import NavigationBar from "./components/NavigationBar"
import Rating from '@mui/material/Rating';
import Notification from "./components/Notification";

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
      comment: "",
      input_verification: "",
      verified: false,
      rating: 0,
      sellerHasRated: false,
      buyerHasRated: false,
      alert : false,
      alertMessage : null,
      alertType : null,
    };

    this.getOrderInfo();
    this.handle_enter_verification = this.handle_enter_verification.bind(this);
    this.handle_verification_submit = this.handle_verification_submit.bind(this);
    this.enter_verification = this.enter_verification.bind(this);
    this.display_verification = this.display_verification.bind(this);
    this.handle_rating_submit = this.handle_rating_submit.bind(this);
    this.enter_rating = this.enter_rating.bind(this);
    this.cancel = this.cancel.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  redirect() {
    if (sessionStorage.getItem("username") === null) {
      window.location.href = "/";
    }
  }

  cancel() {
    return (
      <Button type="submit" onClick={this.handleCancel} sx={{ height: 40 }} variant="contained">Cancel</Button>
    );
  }

  handleCancel() {
    this.setState({ 
      alert : true,
      alertMessage : "This order has been cancelled.",
      alertType : "success"
    });
    const cancel = {
      _id: this.state.order,
    }
    axios
      .post("http://localhost:4000/app/cancel", cancel)
      .then((response) => console.log(response.data));
    window.location.href = "home"
  }

  enter_rating() {
    let name = "";
    if (this.state.username === this.state.buyer) {
      name = "seller";
    } else {
      name = "buyer";
    }
    return (
      <form>
        <label>
          Please rate the {name}: &nbsp;
        </label>
        <div>
          <Rating sx={{ marginTop: 1, marginLeft: -0.3 }} size="medium" value={this.state.rating} onChange={(event, newValue) => { this.setState({ rating: newValue }); }} />
        </div>
        <textarea 
                placeholder='Input any comments here.'
                onChange={(event)=>{this.setState({comment:event.target.value})}}
                value={this.state.comment}
                            />
        <p />
        <Button type="submit" onClick={this.handle_rating_submit} sx={{ marginTop: -1, height: 40 }} variant="contained">Submit</Button>
      </form>
    );
  }


  handle_rating_submit(event) {
    let name = "";
    if (this.state.username === this.state.buyer) {
      name = this.state.seller;
    } else {
      name = this.state.buyer;
    }
    this.setState({ 
      alert : true,
      alertMessage : "You have entered the rating for " + name,
      alertType : "success"
    });
    const updateRating = {
      rating: this.state.rating,
      user: name,
      _id: this.state.order,
    };
    const updateComment = {
      rating: this.state.rating,
      user: name,
      _id: this.state.order,
      comment: this.state.comment,
    };

    if (this.state.username === this.state.seller) {
      this.setState({ sellerHasRated: true });
      axios
        .post("http://localhost:4000/app/sellerUpdateRating", updateRating)
        .then((response) => console.log(response.data));
      axios.post("http://localhost:4000/app/postComment", updateComment)
      .then((response) => console.log(response.data));
    } else if (this.state.username === this.state.buyer) {
      this.setState({ buyerHasRated: true });
      axios
        .post("http://localhost:4000/app/buyerUpdateRating", updateRating)
        .then((response) => console.log(response.data));
      axios.post("http://localhost:4000/app/postComment", updateComment)
        .then((response) => console.log(response.data));
    }

    event.preventDefault();
  }

  enter_verification() {
    return (
      <form>
        <label>
          Please enter the verification code:
        </label>
        <input
          id='orderPageInput'
          value={this.state.input_verification}
          onChange={this.handle_enter_verification}
        />
        <p />
        <Button type="submit" onClick={this.handle_verification_submit} sx={{ marginTop: 1, height: 40 }} variant="contained">Submit</Button>
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
      this.setState({ 
        alert : true,
        alertMessage : "You have entered the correct verification code.",
        alertType : "success"
      });
      this.setState({ verified: true });
      const finish = {
        _id: this.state.order,
      };
      axios
        .post("http://localhost:4000/app/finished", finish)
        .then((response) => console.log(response.data));
    } else {
      this.setState({ 
        alert : true,
        alertMessage : "You have entered the wrong verification code.",
        alertType : "error"
      });
      event.preventDefault();
    }
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
          sellerHasRated: response.data.sellerHasRated,
          buyerHasRated: response.data.buyerHasRated,
        });
      });
  }

  closeAlert() {
    this.setState({ alert : false });
  }

  render() {
    this.redirect();
    let verification;
    if (this.state.order_status === "finished") {
      verification = null;
    }
    else if (
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
    if (this.state.verified || this.state.order_status === "finished") {
      if (
        this.state.seller === this.state.username &&
        !this.state.sellerHasRated
      ) {
        rating = <this.enter_rating />;
      } else if (
        this.state.buyer === this.state.username &&
        !this.state.buyerHasRated
      ) {
        rating = <this.enter_rating />;
      } else {
        rating = null;
      }
    } else {
      rating = null;
    }

    let cancel_button;
    if (this.state.order_status === "onSale") {
      cancel_button = this.cancel();
    }
    else {
      cancel_button = null;
    }

    return (
      <>
        <Notification alert={this.state.alert} 
          alertMessage={this.state.alertMessage} 
          alertType={this.state.alertType} 
          closeAlert={this.closeAlert} />
        <NavigationBar />
        <div className="container">
          <label>Seller: {this.state.seller}</label>
          <p />
          <label>Buyer: {this.state.buyer}</label>
          <p />
          <label>Location: {this.state.dinning_hall}</label>
          <p />
          <label>Time: {this.state.time}</label>
          <p />
          <label>Price: {this.state.price}</label>
          <p />
          <label>Status: {(this.state.order_status === "onSale") ? "On Sale" : ((this.state.order_status === "inprogress") ? "In Progress" : "Completed")}</label>
          <p />
          {verification}
          {rating}
          {cancel_button}
        </div>
      </>
    );
  }
}

export default OrderPage;
