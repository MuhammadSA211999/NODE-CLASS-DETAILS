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
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

//create coustom method of todoSchema::: before (initialize a model)
todoSchema.methods = {
    //actual method
    findActive: function () {
        return mongoose.model('Todo').find({ status: 'active' })
    }
}

//coustom static methods 
todoSchema.statics = {
    findInTitle: function () {
        return this.find({ title: /js/i })
    }
}

//coustom query methods 
todoSchema.query = {
    findByLanguage: function (lang) {
        return this.find({ title: new RegExp(lang, "i") })
    }
}
// create the todo model based on todoSchema 
// const Todo = mongoose.model('Todo', todoSchema)
module.exports = todoSchema