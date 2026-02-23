const express = require('express')
const mongoose = require('mongoose')

const userModel = require('../models/userModel')

const registerController = async(req,res)=>{
  try {
      const {userName,email,password,phoneNumber,Address} = req.body

    //validation
    if(!userName || !email || !password || !phoneNumber || !Address){
        return res.status(400).send({
            success:false,
            message:"Please provide all the fields !"
        })
    }   
    // user check
    let existingUser = await userModel.findOne({email})

    if(existingUser){
        return res.status(400).send({
            success:false,
            message:"User already exists !"
        })  
    }

  let createdUser = await userModel.create({
    userName,
    email,
    password,
    phoneNumber,
    Address
  })
  console.log(createdUser);
  res.status(201).send('user register successfully !')
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
        success:false,
        message:"Error in Register API",
        error:error.message
    })
  }
}
   

// login controller

const loginUserController = async (req,res)=>{
   try {
    let {email,password} = req.body
    // validation
    if(!email || ! password){
        return res.status(400).send({
            success:false,
            message:"Please provide all the fields !"
        })
    }

    let user = await userModel.findOne({email})
    
    // checking if user exists or not
  if(!user){
    return res.status(404).send({
        success:false,
        message:"User not found !"
    })  
  }
  // checking password
    if(user.password !== password){
        return res.status(400).send({
            success:false,
            message:"Invalid password !"
        })  
    }
    res.status(200).send({
        success:true,
        message:"Login successfully !",
        user
    })        
   } catch (error) {
    res.status(500).send({
        success:false,
        message:"Error in login API",
        error:error.message
    })  
   }
}

module.exports = {registerController,loginUserController}