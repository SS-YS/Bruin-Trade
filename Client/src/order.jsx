import React, { Component } from "react";

class OrderPage extends Component {
    constructor() {
      super()
      this.state = {
        username: sessionStorage.getItem("username"),
        order: sessionStorage.getItem("order"),
      }
    }

    render() {
        return(
            <div>
                {this.state.order}
            </div>
        )
    }
}

export default OrderPage;