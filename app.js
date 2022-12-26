const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use('/api/todo', require('./routes/todoRoute'))
app.use('/api/auth', require('./routes/userRoutes'))

module.exports = app;