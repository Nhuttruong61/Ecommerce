const User = require("../models/userModel");
const asyncHanler =require("express-async-handler");
const { generateToken } = require("../config/jsonToken");
const createUser = asyncHanler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
      //create a new user
      const newUser = await User.create(req.body);
      res.json(newUser);
    } else {
      throw new Error('User already exists')
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
        token: generateToken(findUser?._id)
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  });

module.exports = { createUser, loginUserCtrl };
