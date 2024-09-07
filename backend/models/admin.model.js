const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

let schemaUser = mongoose.Schema({
    userName:String,
    email:String,
    password:String,
})

let url = process.env.MONGODB_URI;

let Admin = mongoose.model('Admin', schemaUser);

exports.registerAdmin = (username, email, password) => {
    return new Promise((resolve, reject)=>{
        mongoose.connect(url).then(()=>{

            return Admin.findOne({email:email});

        }).then((doc)=>{
            if(doc){
                mongoose.disconnect();
                reject('Email already exists');
            }else{

                bcrypt.hash(password, 10).then((hashedPassword)=>{

                    let newUser = new Admin({
                        userName:username,
                        email:email,
                        password:hashedPassword
                    })

                    newUser.save().then((doc)=>{
                        mongoose.disconnect();
                        resolve(doc);
                    }).catch((err)=>{
                        mongoose.disconnect();
                        reject(err);
                    })

                }).catch((err)=>{
                    mongoose.disconnect();
                    reject(err);
                })
                
            }
        })
    })
}

let privateKey = process.env.PRIVATE_KEY;

exports.loginAdmin = (email, password)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(url).then(()=>{

            return Admin.findOne({email:email});

        }).then((user)=>{
            if(!user){
                mongoose.disconnect();
                reject('User not found');
            }else{
                bcrypt.compare(password, user.password).then((same)=>{
                    if(same){
                        //send token
                        let token = jwt.sign({id:user._id, userName:user.userName}, privateKey, {expiresIn:'4h'})
                        mongoose.disconnect();
                        resolve({token:token, role:'admin'});
                    }else{
                        mongoose.disconnect();
                        reject('Password is incorrect');
                    }
                }).catch((err)=>{
                    mongoose.disconnect();
                    reject(err);
                })
            }
        })
    })
}