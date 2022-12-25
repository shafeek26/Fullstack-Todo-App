const connectDB = require('./database/db')
const app = require('./app');
require('dotenv').config()
const Port = process.env.PORT || 5000


connectDB()
app.listen(Port, () => {
    console.log(`server is running on ${Port}`)
})