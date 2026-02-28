const express = require('express');
const router = express.Router();


const { authMiddelware } = require('../middleware/authMiddleware');
const { createCategotyController,
     updateCategoryController, 
     deleteCategoryController
     } = require('../controllers/categoryController');

     

//CREATE CATEGORY || POST 

router.post("/createCategory",authMiddelware,createCategotyController)

//UPDATE CATEGORY || PUT
router.put("/updateCategory/:id",authMiddelware,updateCategoryController)

// DELETE CATOGERY || DELETE

router.delete("/deleteCategory/:id",authMiddelware,deleteCategoryController)

module.exports = router