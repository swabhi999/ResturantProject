// CREATE CATEGORY

const categoryModel = require("../models/CategoryModel");
const { findByIdAndUpdate } = require("../models/userModel");

// CREATE CATEGORY

const createCategotyController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).send("PLEASE PROVIDE ALL THE FEILD");
    }
    const newCategory = await categoryModel.create({
      title,
      imageUrl,
    });
    console.log(newCategory);
    if (!newCategory) {
      return res.status(500).send("PLEASE PROVIDE ");
    }
    res.status(200).send("CREATED CATEGORY SUCCESSFULLY !");
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "ERROR IN CREATE CATEGORY API !",
    });
  }

};

// UPDATE THE CATEGORY 

const updateCategoryController = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const newCategory = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryID,
      newCategory,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedCategory) {
      return res.status(404).send("CATEGORY NOT FOUND !");
    }

    console.log(newCategory);
    res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).send({
      SUCCESS: false,
      message: "ERROR IN UPDATE CATEGORY API",
    });
  }
};

// DELETE CATEGORY 
const deleteCategoryController = async (req,res)=>{
  try {
     const catogeryId = req.params.id

     let deletedCatogery = await categoryModel.findByIdAndDelete(catogeryId)
      if(!deletedCatogery){
        res.status(404).send({
        message: "PLEASE PROVIDE VALID ID !",
        success: false,
      });
      }
     res.status(200).json({
      success: true,
      data: deletedCatogery,
      message:" DELETED SUCCESSFULLY !"
    });

  } catch (error) {
    res.status(500).send({
        success:false,
        message:"ERROR IN DELETE CATEGORY API"
    })
  }
}

module.exports = {
  createCategotyController,
  updateCategoryController,
  deleteCategoryController
};
