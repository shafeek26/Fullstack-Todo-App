const express = require('express');
const app = express();
const router = require('./routes/todoRoute');
const userRouter = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use('/api/todo', router)
app.use('/api/auth', userRouter)

module.exports = app;