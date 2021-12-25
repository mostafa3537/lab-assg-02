const express = require('express');

const {validationtodo} = require('../middleWare/validation')
const Todo = require('../models/todo')
const router = express.Router()

// get data from todos rountiong
router.get('/' , async(req ,res ,next) =>{
    const todos = await Todo.find().populate('user');
    res.json(todos);
})

// create  
router.post('/' , async(req ,res ,next) =>{
    const todo = req.body;
    try{
        const doc = await Todo.create(todo);
        res.send(req.body)
    } catch(err){
        next(err)
    }
})

// patch  
router.patch('/:id' , async(req ,res ,next) =>{
    const cond = {_id:req.params.id};

    Todo.updateOne(cond,req.body)
    .then(doc =>{
        if(!doc){return res.status(404).end()}
        return res.status(200).json(doc)
    })
    .catch(err => next(err))

})

// patch  
router.patch('/:id' , async(req ,res ,next) =>{
    const cond = {_id:req.params.id};

    Todo.updateOne(cond,req.body)
    .then(doc =>{
        if(!doc){return res.status(404).end()}
        return res.status(200).json(doc)
    })
    .catch(err => next(err))

})

// delete  
router.delete('/:id' , async(req ,res ,next) =>{
    const cond = {_id:req.params.id};

    Todo.findOneAndDelete(cond)
    .then(doc =>{
        if(!doc){return res.status(404).end()}
        return res.status(200).json('delete done')
    })
    .catch(err => next(err))

})

module.exports = router;
    