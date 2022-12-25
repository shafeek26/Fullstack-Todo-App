const express = require('express');
const app = express();
const router = require('./routes/todoRoute')

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use('/api/todo', router)

module.exports = app;