const express = require('express')
const router = express.Router();



const { authMiddelware } = require('../middleware/authMiddleware');
const { createRestaurantController, getAllRestaurantControlller, getRestaurantById, deleteRestaurantController } = require('../controllers/resturantController');



//ROUTES 

//CREATE RESTURANT 

router.post("/createRestaurant",authMiddelware,createRestaurantController)

//GET ALL RESTAURANT

router.get('/getAllRestaurant',authMiddelware,getAllRestaurantControlller)

//GET RESTAURANT BY ID
router.get('/getRestaurantBYId/:id',authMiddelware,getRestaurantById)

//DELETE RESTAURANT ||DELETE

router.delete("/deleteRestaurant/:id",authMiddelware,deleteRestaurantController)
module.exports = router