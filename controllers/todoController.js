// @desc fetching todo
// @route GET /todo/getTodo
const getTodo = (req, res) => {
    res.status(200).json({message : 'get todo'})
}
// @desc adding todo
// @route POST /todo/addTodo
const addTodo = (req, res) => {
    res.status(200).json({message : 'Add todo'})
}
// @desc updating todo
// @route PUT /todo/updateTodo
const updateTodo = (req, res) => {
    res.status(200).json({message : `updated todo ${req.params.id}`})
}
// @desc fetching todo
// @route DELETE /todo/deleteTodo
const deleteTodo = (req, res) => {
    res.status(200).json({message : `deleted todo ${req.params.id}`})
}

module.exports = {
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
}