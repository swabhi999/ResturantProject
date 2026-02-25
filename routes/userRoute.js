const express = require('express')
const router = express.Router();


const {getUserController,
     userUpdateController,
     updatePasswordController,
     deleteUserController,
     logoutController} = require('../controllers/userController');
const { authMiddelware } = require('../middleware/authMiddleware');



// GET USER || GET

router.get('/getuser', authMiddelware,getUserController)

router.put('/updateUser', authMiddelware,userUpdateController)

router.post('/updatePassword',authMiddelware,updatePasswordController)

router.delete('/deleteUser/:id',authMiddelware,deleteUserController)

router.get('/logout',authMiddelware,logoutController)
module.exports = router