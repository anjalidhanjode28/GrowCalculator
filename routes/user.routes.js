const express = require("express")
const bcrypt = require("bcrypt")
const UserModel  = require("../models/User.model")
const jwt = require("jsonwebtoken")
const userController = express.Router();
require("dotenv").config();

userController.post("/register",  (req, res) => {

    const {name, email, password} = req.body;
    
    bcrypt.hash(password,10, async function(err, hash){

        if(err){
            res.send("internal error occurred")
        }


        const user = new UserModel({
            name,
            email,
            password: hash
        })

        try {
            const result = await user.save();
            console.log(result)
            res.send("signup Sucessful")
        } catch (error) {
            console.log(error)
            res.send("Internal error occured ")
        }
    })
    
})

userController.post("/login", async (req, res) => {

    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    console.log(user)
    const {_id} = user
    
    if(!user){
        return res.send("Your account is not registered yet!")
    }
    const hash = user.password;
    const userId = user._id

    bcrypt.compare(password, hash, function(err, result){

        console.log(result)
       if(result){
        var token = jwt.sign({email, userId}, process.env.SECRET_KEY)
        return res.send({"message": "Login sucess", "token": token,"id":_id})
       }
       else{
        return res.send({"message": "Login failed", "token": ""})
       }
    })
   
})



module.exports = userController