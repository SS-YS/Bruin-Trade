const mongoose = require("mongoose")
const orderTemplate = new mongoose.Schema({
    buyer:{
        type: String,
        required: true,
    },

    seller:{
        type: String,
        require: true,
    },

    location:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

    startTime:{
        type: Number,
        required: true
    },

    endTime:{
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('myorders', orderTemplate)