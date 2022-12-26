const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [ true, 'Enter Your Name']
    },
    email : {
        type : String,
        required : [ true, 'Enter Your Email'],
        unique : true
    },
    password : {
        type : String,
        required : true
    }
},
{
    timestamps : true
}
);

module.exports = mongoose.model('User', userSchema)