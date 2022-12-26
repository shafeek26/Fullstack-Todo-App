const express = require('express');
const userRouter = express.Router();
const { userSignup, userLogin} = require('../controllers/userController')

userRouter.post('/signup', userSignup);
userRouter.post('/login', userLogin);

module.exports = userRouter