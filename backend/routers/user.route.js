const userModel = require('../models/user.model');
const route = require('express').Router();


route.post('/register', (req,res,next)=>{
    userModel.register(req.body.userName, req.body.email, req.body.password).then((user)=>{
        res.status(200).json({user:user, msg:'User registered successfully'});
    }).catch((err)=>next(err))
})

route.post('/login', (req,res,next)=>{
    userModel.login(req.body.email, req.body.password).then((token)=>{
        res.status(200).json({token:token});
    }).catch((err)=>next(err))
})

module.exports = route;