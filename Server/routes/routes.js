const express = require("express")
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const orderTemplateCopy = require('../models/OrderModels')
const mongoose = require('mongoose')
const { response, request } = require("express")
const mongoDB = "mongodb+srv://yqi_2002:Yuxuan02@cluster0.22647.mongodb.net/mytable?retryWrites=true&w=majority"
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

db.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });

router.post('/usercheck', (request, response) => {
    const userName_get = request.body.userName;
    signUpTemplateCopy.findOne({userName: userName_get})
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

router.post('/signup', async (request, response) => {
    const signedUpUser = new signUpTemplateCopy({
        userName:request.body.userName,
        password:request.body.password,
        phoneNumber: request.body.phoneNumber,
        finished_order_number: request.body.finished_order_number,
        rating: request.body.rating
    })

    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

router.post('/order', async (request, response) => {
    const order = new orderTemplateCopy({
        buyer:request.body.buyer,
        seller:request.body.seller,
        location:request.body.location,
        price:request.body.price,
        time:request.body.time,
        inProgress: request.body.inProgress,
        finished: request.body.finished,
        code: request.body.code,
    })

    order.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

router.post('/searchOrder', (request, response) => {
    const dinningHall = request.body.dinningHall;
    const startTime = request.body.startTime;
    const endTime = request.body.endTime;
    const startPrice = request.body.startPrice;
    const endPrice = request.body.endPrice;
    const order_seller = request.body.seller;

    orderTemplateCopy.find({ location: dinningHall, time: { $gte: startTime, $lte: endTime }, price: {$gte: startPrice, $lte: endPrice}, seller: {$ne: order_seller}, inProgress: {$ne: true}})
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

router.post('/update', (request, response) => {
    const _id = request.body._id;
    const in_progress_status = request.body.inProgress;
    const buyer_status = request.body.buyer;
    const confirm_code = request.body.code;
    orderTemplateCopy.findByIdAndUpdate(_id, {inProgress: in_progress_status, buyer: buyer_status, code: confirm_code})
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

router.post('/getRating', (request, response) => {
    const userName_get = request.body.userName;
    signUpTemplateCopy.findOne({userName: userName_get})
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

router.post('/getOnGoing', (request, response) =>{
    const user_get = request.body.user;
    orderTemplateCopy.find({$or:[{buyer: user_get}, {seller: user_get}]})
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

router.post('/cancel', (request, response) => {
    const _id = request.body._id;
    orderTemplateCopy.findByIdAndDelete(_id)
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

router.post('/finished', (request, response) => {
    const _id = request.body._id;
    orderTemplateCopy.findByIdAndUpdate(_id, {finished:true})
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});



module.exports = router