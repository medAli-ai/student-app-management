const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


let schemaUser = new mongoose.Schema({
    userName:String,
    email:String,
    password:String,
})

let url = process.env.MONGODB_URI;

let user = mongoose.model('user', schemaUser);

exports.register = (userName, email, password)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(url).then(()=>{

            return user.findOne({email:email});

        }).then((doc)=>{
            if(doc){
                mongoose.disconnect();
                reject('Email already exists');
            }else{

                bcrypt.hash(password, 10).then((hashedPassword)=>{

                    let newUser = new user({
                        userName:userName,
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

exports.login = (email, password)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(url).then(()=>{

            return user.findOne({email:email});

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
                        resolve(token);
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