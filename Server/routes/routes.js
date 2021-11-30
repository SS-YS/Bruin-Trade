const express = require("express")
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const orderTemplateCopy = require('../models/OrderModels')
const mongoose = require('mongoose')
const { response, request } = require("express")
const SignUpModels = require("../models/SignUpModels")
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

    if (dinningHall === ''){
        if (startPrice === -Infinity){
            if(endPrice === Infinity){
                orderTemplateCopy.find({time: { $gte: startTime, $lte: endTime }, seller: {$ne: order_seller}, inProgress: {$ne: true}})
                .then(data => {
                    response.json(data)
                })
                .catch(error => {
                    response.json(error)
                })            
            }
            else{
                orderTemplateCopy.find({  time: { $gte: startTime, $lte: endTime }, price: {$lte: endPrice}, seller: {$ne: order_seller}, inProgress: {$ne: true}})
                .then(data => {
                    response.json(data)
                })
                .catch(error => {
                    response.json(error)
                })            
            }
        }
        else{
            if(endPrice === Infinity){
                orderTemplateCopy.find({  time: { $gte: startTime, $lte: endTime }, price: {$gte: startPrice}, seller: {$ne: order_seller}, inProgress: {$ne: true}})
                .then(data => {
                    response.json(data)
                })
                .catch(error => {
                    response.json(error)
                })            
            }
            else{
                orderTemplateCopy.find({ time: { $gte: startTime, $lte: endTime }, price: {$gte: startPrice, $lte: endPrice}, seller: {$ne: order_seller}, inProgress: {$ne: true}})
                .then(data => {
                    response.json(data)
                })
                .catch(error => {
                    response.json(error)
                })                          
            }
        }
    }
    else{
        if (startPrice === -Infinity){
            if(endPrice === Infinity){
                orderTemplateCopy.find({ location: dinningHall, time: { $gte: startTime, $lte: endTime },  seller: {$ne: order_seller}, inProgress: {$ne: true}})
                .then(data => {
                    response.json(data)
                })
                .catch(error => {
                    response.json(error)
                })            
            }
            else{
                orderTemplateCopy.find({ location: dinningHall, time: { $gte: startTime, $lte: endTime }, price: {$lte: endPrice}, seller: {$ne: order_seller}, inProgress: {$ne: true}})
                .then(data => {
                    response.json(data)
                })
                .catch(error => {
                    response.json(error)
                })            
            }
        }
        else{
            if(endPrice === Infinity){
                orderTemplateCopy.find({ location: dinningHall, time: { $gte: startTime, $lte: endTime }, price: {$gte: startPrice}, seller: {$ne: order_seller}, inProgress: {$ne: true}})
                .then(data => {
                    response.json(data)
                })
                .catch(error => {
                    response.json(error)
                })            
            }
            else{
                orderTemplateCopy.find({ location: dinningHall, time: { $gte: startTime, $lte: endTime }, price: {$gte: startPrice, $lte: endPrice}, seller: {$ne: order_seller}, inProgress: {$ne: true}})
                .then(data => {
                    response.json(data)
                })
                .catch(error => {
                    response.json(error)
                })                            
            }
        }
    }
});

router.post('/update', (request, response) => {
    const _id = request.body._id;
    const in_progress_status = request.body.inProgress;
    const buyer_status = request.body.buyer;
    const confirm_code = request.body.code;
    orderTemplateCopy.findByIdAndUpdate(_id, {inProgress: in_progress_status, buyer: buyer_status, code: confirm_code, hasRated: false})
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

router.post('/getOrder', (request, response) => {
    const _id = request.body._id;
    orderTemplateCopy.findById(_id)
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

router.post('/change_password', (request, response) => {
    const userName = request.body.userName;
    const password = request.body.password;
    signUpTemplateCopy.findOneAndUpdate({userName:userName}, {password:password})
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

router.post('/buyerUpdateRating', (request, response) =>{
    const incoming_rating = Number(request.body.rating);
    const user = request.body.user;
    const order_id = request.body._id;
    signUpTemplateCopy.findOne({userName: user}).then(data =>{
        const old_rating = Number(data.rating);
        const num = Number(data.finished_order_number);
        const newNum = Number(num+1);
        const new_rating = Number((old_rating * num + incoming_rating)/(newNum))
        const query = {userName: user};
        signUpTemplateCopy.findOneAndUpdate(query, {rating: new_rating, finished_order_number: newNum})
        .then(data => {
            orderTemplateCopy.findByIdAndUpdate(order_id, {buyerHasRated: true})
            .then(data => {
                response.json(data)
            })
            .catch(error => {
                response.json(error)
            })
        })
    });
})

router.post('/sellerUpdateRating', (request, response) =>{
    const incoming_rating = Number(request.body.rating);
    const user = request.body.user;
    const order_id = request.body._id;
    signUpTemplateCopy.findOne({userName: user}).then(data =>{
        const old_rating = Number(data.rating);
        const num = Number(data.finished_order_number);
        const newNum = Number(num+1);
        const new_rating = Number((old_rating * num + incoming_rating)/(newNum))
        const query = {userName: user};
        signUpTemplateCopy.findOneAndUpdate(query, {rating: new_rating, finished_order_number: newNum})
        .then(data => {
            orderTemplateCopy.findByIdAndUpdate(order_id, {sellerHasRated: true})
            .then(data => {
                response.json(data)
            })
            .catch(error => {
                response.json(error)
            })
        })
    });
})

router.post('/postComment', (request, response) => {
    const user= request.body.user;
    const user_rating = Number(request.body.rating);
    const user_comment = request.body.comment;
    const query = {userName:user};
    comment_obj = {rating: user_rating, content: user_comment}
    signUpTemplateCopy.findOneAndUpdate(query, {$push:{"comment": comment_obj}})
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

module.exports = router