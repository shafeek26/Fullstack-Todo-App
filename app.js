const express = require('express');
const app = express();
const router = require('./routes/todoRoute')

app.use('/api/todo', router)

module.exports = app;