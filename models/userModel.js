const express = require('express')
const mongoose = require('mongoose')


//user schema

const userSchema = new mongoose.Schema({
  userName: {
    type:String,
    required:[true,"Please provide username !" ]
  },
  email:{
    type:String,
    required:[true, "please provide email !"]
  },
  password:{
    type:String,
    required:[true,"password is required !"]
  },
  Address:{
    type:Array,
    required:[true,"please provide address !"]
  },
  phoneNumber:{
    type:String,
    required:[true,"please provide phone number !"]
  },
  userType:{
    type:String,
    default:"client",
    enum:["client","admin","vendor","driver"]
  },
  profilePicture:{
    type:String,
    default:"https://onlinetools.com/image/generate-random-image"
  }


},{timestamps:true})


//export 
const userModel = mongoose.model("users",userSchema)
module.exports = userModel