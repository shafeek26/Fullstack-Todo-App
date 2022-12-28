const express = require('express');
const router = express.Router();
const { userSignup, userLogin, getUser} = require('../controllers/userController');
const { protect } = require('../middleware/authMidlleware')


router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/me', protect, getUser);

module.exports = router