const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URI
const connectDB = () => {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database is connected')
    })
    .catch((error) => {
        console.log(error);
        process.exit(1)
    })
};

module.exports = connectDB