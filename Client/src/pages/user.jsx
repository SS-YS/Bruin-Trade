import axios from "axios";
import React, { Component } from "react";
import Comment from "../components/Comments";
import NavigationBar from "../components/NavigationBar";

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      username: sessionStorage.getItem("username"),
      userDisplayed: sessionStorage.getItem("userDisplayed"),
      comments: [],
    };
    this.getComment();
    this.generateComment = this.getComment.bind(this);
    //this.displayComments = this.displayComments.bind(this);
  }

  redirect() {
    if (sessionStorage.getItem("username") === null) {
      window.location.href = "/";
    }
  }

  getComment() {
    const userInfo = {
      user: this.state.userDisplayed,
    };

    let user_comment = this.state.comments;
    user_comment = Object.assign([], user_comment);

    axios
      .post("http://localhost:4000/app/getComment", userInfo)
      .then((response) => {
        let comments = response.data.comment;
        if (response.data.comment.length === 0)
        {
          user_comment = "NONE"
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
        }
        this.setState({
          comments: user_comment,
        });
      });
  }

  render() {
    this.redirect();
    return (
      <div>
        <NavigationBar/>
        <h5 className="homePageTitle">Comments for: {this.state.userDisplayed}</h5>
        <p />
        <div className="homePageCommentsContainer">
        {(() => {
          const comments = [];
          if (this.state.comments === "NONE")
          {
            comments.push(<h5>No comments have been posted to this user yet.</h5>);
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
export default UserInfo;
