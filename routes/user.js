const { Router } = require('express');
const express = require('express')
const User = require('../models/user')
const {route} = require('./todos')

const router = express.Router();

//get
router.get('/', async(req,res,next)=>{
    const users = await User.find().exec();
    res.json(users);
})
//create
router.post('/', async(req,res,next)=>{
    const user = req.body
    const newUser = await User.create(user)
    .then(data=> res.json(data))
    .catch(err=> next(err))
})

// patch  
router.patch('/:id' , async(req ,res ,next) =>{
    const cond = {_id:req.params.id};

    User.updateOne(cond,req.body)
    .then(doc =>{
        if(!doc){return res.status(404).end()}
        return res.status(200).json(doc)
    })
    .catch(err => next(err))

})

// delete  
router.delete('/:id' , async(req ,res ,next) =>{
    const cond = {_id:req.params.id};

    User.findOneAndDelete(cond)
    .then(doc =>{
        if(!doc){return res.status(404).end()}
        return res.status(200).json('delete done')
    })
    .catch(err => next(err))

})

//login
router.post('/login',(req,res)=>{
    const{userName,Email} = req.body;
    
    try{
        const user = await User.login(email, password);
        res.status(200).json("login successfully")
    }catch(err){
        res.status(400).json( "error, login faild" );
    }
})

module.exports = router;















