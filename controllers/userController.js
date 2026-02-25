const userModel = require("../models/userModel");

const getUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(400).send({
        message: "user not Found !",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error !" });
  }
};

//USER UPDATE

const userUpdateController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    console.log(user);
    //validation

    if (!user) {
      return res.status(403).send({
        success: false,
        message: "User Not found !",
      });
    }
    // update

    const { userName, Address, phoneNumber } = req.body;
    if (userName) user.userName = userName;
    if (Address) user.Address = Address;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    await user.save();

    res.status(200).send({
      success: true,
      message: "User Updated successfully !",
    });
  } catch (error) {
    res.status(500).send({
      message: "userUpdate API error",
      success: false,
      error,
    });
  }
};

//update Password

const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user.id });
    console.log(user);
    if (!user) {
      return res.status(401).send("User Not found");
    }

    //GET DATA FROM USER

    const { oldPassword, newPassword } = req.body;

    // CHECK IF PASSWORD IS EMPTY OR NOT
    if (!oldPassword || !newPassword) {
      return res.send({
        success: false,
        message: "please provide new or old password !",
      });
    }

    // ADD PASSWORD STRENGTH VALIDATION
    if (newPassword.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    // PREVENT SAME PASSWORD USE
    if (oldPassword === newPassword) {
      return res.status(400).send({
        success: false,
        message: "New password cannot be same as old password",
      });
    }
    // CHECK AND COMPARE PASSWORD
    const comparedpass = require("../utils/comparePass");

    const isMatch = await comparedpass(oldPassword, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).send(" invalid old password !");
    }

    //HASH PASSWORD
    const hashedpassword = require("../utils/hashedpass");
    const hashedPassword = await hashedpassword(newPassword);

    user.password = hashedPassword;

    await user.save();
    res.status(200).send("password changed successfully !");
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something Went Wrong !",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;

    await userModel.findByIdAndDelete(userId);

    return res.status(200).send({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something Went Wrong On DELETE API ROUTE !",
    });
  }
};

const logoutController = async (req, res) => {
  console.log(req.user.id);
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, 
      sameSite: "strict"
    });
    res.status(200).send("logout successfully");
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "SOMETHING WENT WRONG !",
    });
  }
};
module.exports = {
  getUserController,
  userUpdateController,
  updatePasswordController,
  deleteUserController,
  logoutController,
};
