const mongoose = require("mongoose");
const signUpTemplate = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  finished_order_number: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comment: {
    type: [
      {
        rating: Number,
        anonymous: String,
        content: { type: String, default: "That user didn't post a comment" },
      },
    ],
    required: false,
  },
});

module.exports = mongoose.model("myusernames", signUpTemplate);
