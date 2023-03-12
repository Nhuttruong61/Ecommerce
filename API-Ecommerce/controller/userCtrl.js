const User = require("../models/userModel");
const asyncHanler = require("express-async-handler");
const { generateToken } = require("../config/jsonToken");
const createUser = asyncHanler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exists");
  }
});

const loginUserCtrl = asyncHanler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists
  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new Error("User not found");
  }
  // check if password matches
  if (await findUser.isPasswordMatch(password)) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// get all users
const getAllUser = asyncHanler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error("Error");
  }
});

// get single users
const getaUser = async function (req, res) {
  const { id } = req.params;
  try {
    const getaUser = await User.findById(id);
    res.json(getaUser);
  } catch (error) {
    throw new Error("Error");
  }
};
// delete single users
const deleteaUser = async function (req, res) {
  const { id } = req.params;
  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json(deleteaUser);
  } catch (error) {
    throw new Error("Error");
  }
};

module.exports = {
  createUser,
  loginUserCtrl,
  getAllUser,
  getaUser,
  deleteaUser,
};
