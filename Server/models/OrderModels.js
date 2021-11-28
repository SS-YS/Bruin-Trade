const mongoose = require("mongoose")
const orderTemplate = new mongoose.Schema({
    buyer:{
        type: String,
        required: false,
    },

    seller:{
        type: String,
        required: false,
    },

    location:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

    time:{
        type: Number,
        required: true
    },

    inProgress:{
        type: Boolean,
        required: false
    },

    finished:{
        type: Boolean,
        required: false
    },

    code: {
        type: Number,
        required: false
    },

    hasRated:{
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.model('myorders', orderTemplate)