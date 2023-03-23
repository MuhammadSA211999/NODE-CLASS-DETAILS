const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const authGurd = require('../middlewares/authGurd')
const todoSchema = require('../schemas/todoSchema')

//create ongoose instance model
const Todo = new mongoose.model('Todo', todoSchema)
//user Schema and Model need to populate
const userSchema = require('../schemas/userSchema')
const User = new mongoose.model('User', userSchema)

//get all todos 
router.get('/', authGurd, async (req, res) => {
    try {
        const todos = await Todo.find({})
            .populate('user', 'name username phone -_id')
            .select({ _id: 0, date: 0 })
            .limit(3)
        // console.log(todos);

        res.status(200).json({ message: 'success', data: todos })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'server side error' })
    }
})

//get all active todos 
router.get('/active', async (req, res) => {
    try {
        const todo = new Todo()
        const todos = await todo.findActive()
            .select({ _id: 0, date: 0 })
            .limit(3)
        console.log(todos);

        res.status(200).json({ message: 'success', data: todos })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'server side error' })
    }
})

//get all todos mathecs with title
router.get('/title', async (req, res) => {
    try {
        // no need to create below todo instance or document
        // const todo = new Todo()
        const todos = await Todo.findInTitle()
            .select({ _id: 0, date: 0 })
            .limit(3)
        console.log(todos);

        res.status(200).json({ message: 'success', data: todos })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'server side error' })
    }
})

//query method to get all matches todos
router.get('/language', async (req, res) => {
    try {
        // no need to create below todo instance or document
        // const todo = new Todo()
        const todos = await Todo.find().findByLanguage('redux')
            .select({ _id: 0, date: 0 })
            .limit(3)
        console.log(todos);

        res.status(200).json({ message: 'success', data: todos })
    } catch (error) {
        console.log(error);
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
router.post('/', authGurd, async (req, res) => {
    try {
        // const newTodo = new Todo(req.body)
        // await newTodo.save()
        const newTodo = { ...req.body, user: req?.user?.id }
        console.log('neTo', newTodo);

        const todo = await Todo.create(newTodo)
        // console.log(todo);
        //user info from authGurd req property
        const id = req?.user?.id
        const userResult = await User.updateOne(
            { _id: id },
            { $push: { 'todos': todo?._id } },
            { new: true }
        )
        res.status(200).json({ message: 'todo succesfully inserted', data: userResult })
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