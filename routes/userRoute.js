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

//UPDATE USER || PUT
router.put('/updateUser', authMiddelware,userUpdateController)

//UPDATE PASSWORD || POST
router.post('/updatePassword',authMiddelware,updatePasswordController)

// DELETE USER || DELETE
router.delete('/deleteUser/:id',authMiddelware,deleteUserController)

// LOGOUT || GET
router.get('/logout',authMiddelware,logoutController)
module.exports = router