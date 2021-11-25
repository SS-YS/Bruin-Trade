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
        type: String,
        required: true
    },

    startTime:{
        type: String,
        required: true
    },

    endTime:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('myorders', orderTemplate)