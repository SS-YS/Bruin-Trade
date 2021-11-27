const mongoose = require("mongoose")
const signUpTemplate = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }, 
    finished_order_number: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('myusernames', signUpTemplate)