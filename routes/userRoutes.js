const express = require('express');
const router = express.Router();
const { userSignup, userLogin, getUser} = require('../controllers/userController')

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/me', getUser);

module.exports = router