const express = require("express");
const hashPassword = require("../utils/hashedpass");
const comparePassword = require("../utils/comparePass");
const generateToken = require("../utils/generateToken");

const userModel = require("../models/userModel");

const registerController = async (req, res) => {
  console.log(req.body);
  try {
    const { userName, email, password, phoneNumber, Address } = req.body;

    //validation
    if (!userName || !email || !password || !phoneNumber || !Address) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the fields !",
      });
    }
    // user check
    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists !",
      });
    }

    let hashedPassword = await hashPassword(password);

    let createdUser = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      phoneNumber,
      Address,
    });
    console.log(createdUser);
    res.status(201).send("user register successfully !");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error: error.message,
    });
  }
};

// login controller

const loginUserController = async (req, res) => {
  try {
    let { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the fields !",
      });
    }

    let user = await userModel.findOne({ email });

    // checking if user exists or not
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found !",
      });
    }

    // comparing password
    const isMatch = await comparePassword(user.password, password);

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid password !",
      });
    }
    // checking password
    // if (user.password !== password) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Invalid password !",
    //   });
    // }

    // token generate
    const token = generateToken(user._id);

    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    res.status(200).send({
      success: true,
      message: "Login successfully !",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error: error.message,
    });
  }
};

module.exports = { registerController, loginUserController };
