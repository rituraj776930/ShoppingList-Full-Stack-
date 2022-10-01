const express = require('express')
const userController = express.Router()
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");
const SECRET = "MOCK10"

// ---------------------------SignUp----------------------------------------------------->

userController.post("/signup", async (req, res)=>{
    const {email, password} = req.body
    const userList = await UserModel.findOne({email})
    if(userList){
        return res.status(200).send({message:"Account already exists"})
    }
    else{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if(err){
                    return res.status(400).send({message:"Some Error occured"})
                }
                else{
                    const user = await new UserModel({
                        email,
                        password:hash,
                    })
                    user.save()
                    return res.status(200).send({message:"Sign up successful"})
                }
            });
        });
    }
})

// ---------------------------Login------------------------------------------------------->

userController.post('/login', async(req, res)=>{
    const {email, password} = req.body
    const userList = await UserModel.findOne({email})
    if(!userList){
        return res.status(400).send({message:"Invalid Credentials"})
    }
    else{
        const hash = userList.password
        bcrypt.compare(password, hash, function(err, result) {
            if(result){
                var token = jwt.sign({email, userId:userList._id}, SECRET);
                return res.status(200).send({message:"Login Successful", token})
            }
            else{
                return res.status(400).send({message:"Invalid Credentials"})
            }
        });
    }
})

module.exports = userController