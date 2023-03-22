const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const todosRouter = require('./routesHandler/todosRoutes')
app.use(express.json())
app.use(cors())
const PORT = 9000

//connect database with mongoose 
mongoose.connect(`mongodb://localhost:27017/todo`, {
    //options
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log(`successfully connected to mongodb://localhost:27017/todo`);

}).catch(err => {
    console.log(`connection error=>`, err);

})

app.get('/', (req, res) => {
    res.json({ message: 'success', data: 'Todo app home route' })
})
//use todos routes
app.use('/todos', todosRouter)

const appErrorHandler = (err, req, res, next) => {
    console.log(err);
}
app.listen(PORT, () => {
    console.log(`todo app are running on port ${PORT}`);
})