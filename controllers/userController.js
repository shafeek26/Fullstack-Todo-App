/** @format */

const User = require("../model/userSchema");
const bycrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const asynHandler = require("express-async-handler");
const { use } = require("../routes/todoRoute");
require("dotenv").config();

//@desc sigup user
//@route POST /api/auth
const userSignup = asynHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // checking user enterd details
  if (!(name && email && password)) {
    res.status(400).json({ message: "All fields are required" });
  }

  //validating user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res
      .status(400)
      .json({ message: "This email is already registerd with us" });
  }
  // hashing password and storing in database
  const encryptedPassword = await bycrypt.hash(password, 10);

  // creating user in database

  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
  });

  // generating token

  const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });

  user.token = token;
  res.status(200).json({ user, token });
  console.log(token);
});

//@desc login user
//@route POST /api/auth
const userLogin = asynHandler(async (req, res) => {
  const { email, password } = req.body;

  //checking user entered details
  if (!(email && password)) {
    res.status(400).json({ message: "Email and Password is required" });
  }

  // validating user and comparing email and password
  const user = await User.findOne({ email });

  //if user not found
  if (!user) {
    res.status(400).json({ message: "user not exists" });
  }

  if (user && (await bycrypt.compare(password, user.password))) {
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRETE, {
      expiresIn: process.env.TOKEN_EXPIRY,
    });
    user.token = token;

    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

module.exports = {
  userSignup,
  userLogin,
};
