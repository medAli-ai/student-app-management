const studentModel = require('../models/student.model');
const route = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();


route.get('/', (req, res) => {
    res.send('Welcome to student route');
})

let privateKey = process.env.PRIVATE_KEY;

let verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        jwt.verify(token, privateKey)
        next();
    } else {
        res.status(403).json({ msg: 'Unauthorized' });
    }

}

let verifyTokenAdmin = (req,res,next)=>{
    let token = req.headers.authorization;
    let role = req.headers.role;
    if(!token || role != 'admin'){
        res.status(403).json({msg:'Unauthorized'});
    }

    try{
        jwt.verify(token, privateKey);
        next();
    }
    catch(err){
        res.status(403).json({msg:err});
    }

}


let secretKey = process.env.SECRET_KEY;
let clientKey = process.env.CLIENT_KEY;

let verifySecretClient = (req, res, next)=>{
    let sk = req.query.secretKey;
    let ck = req.query.clientKey;

    if(sk == secretKey && ck == clientKey){
        next();
}else{
    res.status(403).json({msg:'Unauthorized'});
}}
    

route.post('/addStudent', verifyToken, verifySecretClient, (req,res,next)=>{

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let Age = req.body.Age;
    let phone = req.body.phone;

    studentModel.postNewStudent(firstName, lastName, email, Age, phone).then((doc)=>{
        res.status(200).json(doc);
    }).catch((err)=>next(err))
})

route.get('/allStudents', verifyToken, verifySecretClient, (req,res,next)=>{
    let token = req.headers.authorization;
    let users = jwt.decode(token, {complete:true});
    studentModel.getAllStudents().then((docs)=>{
        res.status(200).json({students:docs, users:users});
    }).catch((err)=>next(err))
})


route.get('/student/:id', verifyToken, verifySecretClient, (req,res,next)=>{
    studentModel.getStudentById(req.params.id).then((doc)=>{
        res.status(200).json(doc);
    }).catch((err)=>next(err))
})

route.put('/student/:id', verifyToken, verifySecretClient, (req,res,next)=>{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let Age = req.body.Age;
    let phone = req.body.phone;

    studentModel.updateStudent(req.params.id, firstName, lastName, email, Age, phone).then((doc)=>{
        res.status(200).json(doc);
    }).catch((err)=>next(err))
})

route.delete('/student/:id', verifyToken, verifySecretClient, (req,res,next)=>{
    studentModel.deleteStudentById(req.params.id).then((doc)=>{
        res.status(200).json(doc);
    }).catch((err)=>next(err))
})

module.exports = route;