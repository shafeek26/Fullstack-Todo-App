/** @format */

const Todo = require("../model/todoModel");
const asyncHandler = require("express-async-handler");
const User = require('../model/userModel');

// @desc fetching todo
// @route GET /todo/getTodo
const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.find({user : req.user.id});
  res.status(200).json(todo);
});
// @desc adding todo
// @route POST /todo/addTodo
const addTodo = asyncHandler(async (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    res.status(400)
    throw new Error('todo field is required')
  }

  const newTodo = await Todo.create({ todo, user: req.user.id });
  res.status(200).json(newTodo);
});
// @desc updating todo
// @route PUT /todo/updateTodo
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  
  if(!todo) {
    res.status(400)
    throw new Error('todo not found')
  }

  // checking user who is updating
  const user = await User.findById(req.user.id);

  //checking user exist or nor
  if(!user){
    res.status(401)
    throw new Error('user not found')
  }

  //mating todo user with  logged in user
  if(todo.user.toString() !== user.id){
    res.status(401)
    throw new Error('user not Authorized')
  }
 
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTodo);
});
// @desc fetching todo
// @route DELETE /todo/deleteTodo
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  console.log(todo)

  if (!todo) {
    res.status(400)
    throw new Error('todo not found')
  }

   //checking user who is updating
   const user = await User.findById(req.user.id);

   //checking user exist or nor
   if(!user){
     res.status(401)
     throw new Error('user not found')
   }
 
   //mating todo user with  logged in user
   if( todo.user.toString() !== user.id){
     res.status(401)
     throw new Error('user not Authorized')
   }
   
  await todo.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
