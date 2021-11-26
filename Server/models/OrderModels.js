const mongoose = require("mongoose")
const orderTemplate = new mongoose.Schema({
    buyer:{
        type: String,
        required: false,
    },

    seller:{
        type: String,
        require: false,
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

    ordered:{
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.model('myorders', orderTemplate)