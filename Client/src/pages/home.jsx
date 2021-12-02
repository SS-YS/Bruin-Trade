import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Comment from "../components/Comments";

const columns = [
  { field: "id", headerName: "No.", hide: true, disableColumnMenu: true },
  {
    field: "buysell",
    headerName: "Buyer/Seller",
    width: 120,
    disableColumnMenu: true,
  },
  {
    field: "diningHall",
    headerName: "Dining Hall",
    width: 140,
    disableColumnMenu: true,
  },
  { field: "time", headerName: "Time", width: 100, disableColumnMenu: true },
  { field: "price", headerName: "Price", width: 80, disableColumnMenu: true },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    disableColumnMenu: true,
  },
  {
    field: "detail",
    headerName: "Detail",
    sortable: false,
    disableColumnMenu: true,
    width: 120,
    renderCell(params) {
      const handleDetail = () => {
        const obj_id = params.getValue(params.id, "obj_id");
        sessionStorage.setItem("order", obj_id);
        window.location.href = "order";
        console.log(obj_id);
      };

      return (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginRight: 32, width: 100, height: 40, borderRadius: 5 }}
          onClick={handleDetail}
        >
          Details
        </Button>
      );
    },
  },
  { field: "obj_id", hide: true },
];

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      username: sessionStorage.getItem("username"),
      rows: [],
      buyer_or_seller: "",
      comments: [],
      rating: 0,
    };
    this.getInfo();
    this.getComment();
    this.generateComment = this.getComment.bind(this);
  }

  redirect() {
    if (sessionStorage.getItem("username") === null) {
      window.location.href = "/";
    }
  }

  getInfo() {
    const userInfo = {
      user: this.state.username,
    };
    axios
      .post("http://localhost:4000/app/getOnGoing", userInfo)
      .then((response) => this.generateRows(response.data));
  }

  generateRows(data) {
    var temp = this.state.rows;
    temp = Object.assign([], temp);
    temp = [];

    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      let time_str = "";
      if (data[i].time >= 1000) {
        time_str =
          String(data[i].time).slice(0, 2) +
          ":" +
          String(data[i].time).slice(2, 4);
      } else {
        time_str =
          "0" +
          String(data[i].time).slice(0, 1) +
          ":" +
          String(data[i].time).slice(1, 3);
      }

      var status = "On Sale";
      if (data[i].inProgress) {
        status = "In Progress";
      }
      if (data[i].finished) {
        status = "Completed";
      }

      var buyer_or_seller;
      if (data[i].buyer && data[i].buyer === this.state.username)
        buyer_or_seller = "Buyer";
      else buyer_or_seller = "Seller";

      temp = Object.assign([], temp);
      temp.push({
        id: i + 1,
        buysell: buyer_or_seller,
        diningHall: data[i].location,
        price: data[i].price,
        time: time_str,
        status: status,
        obj_id: data[i]._id,
      });
      this.setState({ rows: temp });
    }
  }

  getComment() {
    const userInfo = {
      user: this.state.username,
    };

    let user_comment = this.state.comments;
    user_comment = Object.assign([], user_comment);

    axios
      .post("http://localhost:4000/app/getComment", userInfo)
      .then((response) => {
        let comments = response.data.comment;
        if (comments.length === 0)
        {
          this.setState({comments: "NONE"});
        }
        else
        {
          for (let i = 0; i < comments.length; i++) {
            let user_rating = comments[i].rating;
            let user_contents = comments[i].content;
            let user_name = comments[i].anonymous;

            user_comment = Object.assign([], user_comment);
            user_comment.push({
              name: user_name,
              rating: user_rating,
              content: user_contents,
            });
            console.log(user_comment);
          }
          this.setState({
            comments: user_comment,
          });
        }
        
        let user_rating = response.data.rating;
        this.setState({
          rating: user_rating,
        });
      });
  }

  render() {
    this.redirect();
    return (
      <div>
        <NavigationBar />
        <h5 className="homePageTitle">{this.state.username}'s orders</h5>
        <div className="homePageOrdersContainer">
          <div style={{ height: 425 }}>
            <DataGrid 
              rows={this.state.rows}
              columns={columns}
              pageSize={6}
              rowsPerPageOptions={[6]}
            />
          </div>
        </div>
        <h5 className="homePageTitle">Overall rating:&nbsp;{this.state.rating.toFixed(1)}</h5>
        <h5 className="homePageTitle">Comments by other users</h5>
        <div className="homePageCommentsContainer">
          {(() => {
            const comments = [];
            if (this.state.comments === "NONE")
            {
              comments.push(<h5>No comments have been posted yet.</h5>)
            }
            else
            {
              for (let i = 0; i < this.state.comments.length; i++) {
                comments.push(
                  <Comment
                    user={this.state.comments[i].name}
                    content={this.state.comments[i].content}
                    rating={this.state.comments[i].rating}
                  />
                );
              }
            }
            return comments;
          })()}
        </div>
      </div>
    );
  }
}

export default HomePage;
