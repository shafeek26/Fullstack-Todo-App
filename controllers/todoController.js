/** @format */

const Todo = require("../model/todoModel");
const asyncHandler = require("express-async-handler");

// @desc fetching todo
// @route GET /todo/getTodo
const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.find();
  res.status(200).json(todo);
});
// @desc adding todo
// @route POST /todo/addTodo
const addTodo = asyncHandler(async (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    res.status(400).json("Todo field is required");
  }

  const newTodo = await Todo.create({ todo });
  res.status(200).json(newTodo);
});
// @desc updating todo
// @route PUT /todo/updateTodo
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400).json("Todo not found");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(todo._id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTodo);
});
// @desc fetching todo
// @route DELETE /todo/deleteTodo
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400).json("There is no todo to delete");
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
