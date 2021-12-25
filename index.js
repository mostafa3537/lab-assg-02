const express = require('express');
const mongoose = require('mongoose');
const todosRourte = require('./routes/todos')
const userRourte = require('./routes/user')

const app = express();


mongoose.connect('mongodb://localhost:27017/todolist');
app.use(express.json());

app.use('/todos',todosRourte);
app.use('/users',userRourte);

app.listen(3000,()=>{
    console.log('running on port 3000');
})