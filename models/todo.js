//create Schema then document
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const todoSchema = new mongoose.Schema({
    title:{
        type:[String,'pleas enter valid title'],
        minlength:[5,'mimum title is 5 character'],
        maxlength:[15,'maximum title is 15 character'],
        required:true
    },
    status:{
        type:String,
        default: "to-do"
    },
    tags:{
        type:String,
        maxlength:[10,'maximum title is 10 character']
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,ref:'User'
    } 
})

const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;