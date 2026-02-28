const resturantModel = require("../models/resturantModel");

//CREATE RESTURANT
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      food,
      imageUrl,
      time,
      pickUp,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coordinates,
    } = req.body;

    if (!title || !coordinates) {
      return res.status(500).send({
        success: false,
        message: "PLEASE PROVIDE TITLE AND CORDINATES !",
      });
    }

    const newResturant = new resturantModel({
      title,
      food,
      imageUrl,
      time,
      pickUp,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coordinates,
    });
    console.log(newResturant);
    await newResturant.save();
    res.status(200).send({
      success: true,
      message: "NEW RESTURANT CREATED SUCCESSFULLY ! ",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "ERROR IN CREATE RESTURANT API !",
      success: true,
    });
  }
};

//GET ALL RESTAURANT

const getAllRestaurantControlller = async (req, res) => {
  try {
    const Allrestaurant = await resturantModel.find({});
    if (!Allrestaurant) {
      return res.status(404).send("No Restaurant Available ");
    }
    res.status(200).send({
      success: true,
      restaurantCount: Allrestaurant.length,
      Allrestaurant,
    });
  } catch (error) {
    res.status(500).send({
      message: "ERROR IN GET ALL RESTAURANT API !",
    });
  }
};



//GET RESTAURANT

const getRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const resturant = await resturantModel.findById(restaurantId);
    console.log(resturant);
    if (!resturant) {
      res.status(401).send({
        message: " RESTAURANT DOES NOT EXIST !",
      });
    }
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "ERROR IN RESTAURANT ID API ! ",
    });
  }
};

//DELETE RESTAURANT

const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const deletedRestaurant =
      await resturantModel.findByIdAndDelete(restaurantId);
    if (!deletedRestaurant) {
      res.status(404).send({
        message: "PLEASE PROVIDE VALID ID !",
        success: false,
      });
    }
    res.status(200).send("RESTAURANT HAS BEEN DELETED SUCCESSFULLY ");
  } catch (error) {
    res.status(200).send({
      success: false,
      message: "ERROR IN DELETE API !",
    });
  }
};
module.exports = {
  createRestaurantController,
  getAllRestaurantControlller,
  getRestaurantById,
  deleteRestaurantController,
};
