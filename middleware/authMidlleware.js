const JWT = require('jsonwebtoken');
const asynHandler = require('express-async-handler');
const User = require('../model/userModel');

const protect = asynHandler(async (req, res, next) => {
    let token

    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //extracting token from request headers
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decode = JWT.verify(token, process.env.JWT_SECRETE);

            //gettting user from token
            req.user = await User.findById(decode.id).select('-password');
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized, not token')
    }

    next()
})

module.exports = {protect}