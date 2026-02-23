const express = require('express')
const mongoose = require('mongoose')

const router = express.Router();
const { registerController, loginUserController } = require('../controllers/authController')

//resgister || POST

router.post('/register',registerController)

// login || post 
router.post('/login',loginUserController)


module.exports = router