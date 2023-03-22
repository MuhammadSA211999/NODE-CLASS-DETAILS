const express = require('express')
const router = express.Router()
const Todo = require('../schemas/todoSchema')

//get all todos 
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({})
            .select({ _id: 0, date: 0 })
            .limit(3)
        // console.log(todos);

        res.status(200).json({ message: 'success', data: todos })
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'server side error' })
    }
})

//get a todo by id
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const todo = await Todo.findById({ _id: id })
        res.status(200).json({ message: 'successfully got todo', todo: todo })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'cant get the todo' })
    }
})

// post a todos
router.post('/', async (req, res) => {
    try {
        // const newTodo = new Todo(req.body)
        // await newTodo.save()
        const newTodo = req.body
        const result = await Todo.create(newTodo)
        // console.log(result);
        res.status(200).json({ message: 'todo succesfully inserted' })
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'could not add todo' })
    }

})
//post multiple todos
router.post('/all', async (req, res) => {
    try {
        const newTodos = req.body
        await Todo.insertMany(newTodos)
        res.status(200).json({ message: 'todos succesfully inserted' })
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'could not add todos' })
    }
})

//put selected todo by id 
router.put('/selected', async (req, res) => {
    const { todos } = req.body
    try {
        const updatedTodo = await Todo.updateMany({ _id: ids }, { $set: {} })
        console.log(updatedTodo);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'cound not updated' })
    }
})


//put a todo by id 
router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const updatedTodo = await Todo.findByIdAndUpdate({ _id: id }, { $set: { title: 'Mosheeeennnnnn' } }, { new: true })
        res.status(200).json({ messages: 'updated successfully', data: updatedTodo })
        // console.log(updatedTodo);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'cound not updated' })
    }
})



// delete selected 
router.delete('/selected', async (req, res) => {
    const { ids } = req.body
    try {
        const deletingTodos = await Todo.deleteMany({ _id: ids })
        res.status(200).json({ message: 'success', data: deletingTodos })
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'cant delete' })
    }
})

//delete a todo by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletingTodo = await Todo.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: 'success', data: deletingTodo })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'cant delete' })
    }
})

module.exports = router