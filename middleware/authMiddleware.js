const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


module.exports.authMiddelware = async (req,res,next)=>{
    try {
     if(!req.cookies.token){
        res.status(4001).send("You have to login first !")
     }

     const decoded = jwt.verify(req.cookies.token,process.env.SECRET_KEY)

     const user = await userModel.findOne({_id:decoded.id}).select("-password")
     if(!user){
        res.send("error User not found. Please log in again.")
     }
     console.log(user);
   req.user = user
     next()
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            success:false,
            message:"Error in auth middleware",

            error:error.message
        })
    }
}