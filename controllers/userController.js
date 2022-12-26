
const User = require("../model/userModel");
const bycrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const asynHandler = require("express-async-handler");
require("dotenv").config();

//@desc sigup user
//@route POST /api/auth
const userSignup = asynHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // checking user enterd details
  if (!(name && email && password)) {
    res.status(400)
    throw new Error('All fields are required')
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

  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token : getToken(user._id)
    });
  } else {
    res.status(400).json({ message: "Inavalid user data" });
  }
});

//@desc login user
//@route POST /api/auth
const userLogin = asynHandler(async (req, res) => {
  const { email, password } = req.body;

  //checking user entered details
  if (!(email && password)) {
    res.status(400)
    throw new Error('Email and Password is required')
  }

  // validating user and comparing email and password
  const user = await User.findOne({ email });

  if (user && (await bycrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token : getToken(user._id)
    });
  } else {
    res.status(400).json({ message: "Invalid Credentials" });
  }
});


const getUser = (req, res) => {
  res.status(200).json({message : 'user Data'})
}


// token generation

const getToken = (id) => {
  return JWT.sign(
    {id},
    process.env.JWT_SECRETE,
    {
      expiresIn : process.env.TOKEN_EXPIRY
    }
  )
}

module.exports = {
  userSignup,
  userLogin,
  getUser
};
