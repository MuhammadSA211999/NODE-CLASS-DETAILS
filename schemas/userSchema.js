const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['block', 'open'],
        default: 'open'
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// create the todo model based on todoSchema 
// const Todo = mongoose.model('Todo', todoSchema)
module.exports = userSchema