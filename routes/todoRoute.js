const express = require('express');
const router = express.Router();
const { getTodo, addTodo, updateTodo, deleteTodo } = require('../controllers/todoController')

router.get('/', getTodo)
router.post('/', addTodo)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)

module.exports = router;