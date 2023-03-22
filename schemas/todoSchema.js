const mongoose = require('mongoose')
const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'in-active'],
        default: 'active'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})
// create the todo model based on todoSchema 
const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo