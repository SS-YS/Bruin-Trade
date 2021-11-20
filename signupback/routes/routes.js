const express = require("express")
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
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
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    const signedUpUser = new signUpTemplateCopy({
        fullName:request.body.fullName,
        userName:request.body.userName,
        email:request.body.email,
        password:securePassword,
    })

    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
});

    /*
    router.get('/signup', (request, response) => {
        const userName_get = request.body.userName;
        mytable.findOne({userName: userName_get}, (err, user) => {
            if (!user) {
                signedUpUser.save()
                .then(data => {
                    response.json(data)
                })
                .catch(error => {
                    response.json(error)
                })
            }
            else {
                response.json("Username already registered");
            }
        })
    })
    */

module.exports = router