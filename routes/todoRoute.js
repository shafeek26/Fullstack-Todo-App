const express = require('express');
const router = express.Router();
const { getTodo, addTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const { protect } = require('../middleware/authMidlleware');

router.get('/', protect, getTodo)
router.post('/', protect, addTodo)
router.put('/:id', protect, updateTodo)
router.delete('/:id', protect, deleteTodo)

module.exports = router;