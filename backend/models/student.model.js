const mongoose = require('mongoose');
const Joi = require('joi');
require('dotenv').config();

const schemaValidation = Joi.object({
    firstName:Joi.string().alphanum().min(2).max(20).required(),
    lastName:Joi.string().alphanum().min(2).max(20).required(),
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    Age:Joi.number().integer().min(10).max(100).required(),
    phone:Joi.number().integer().min(10000).max(9999999999).required()
})



let studentSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    Age:Number,
    phone:Number
})

let studentModel = mongoose.model('student',studentSchema);
let url = process.env.MONGODB_URI;

exports.testConnect = ()=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(url).then(()=>{
            mongoose.disconnect();
            resolve('connected !')
        }).catch((err)=>reject(err))
    })
}


exports.postNewStudent = (firstName, lastName, email, Age, phone)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(async()=>{

            let validSchema = await schemaValidation.validateAsync({firstName:firstName, lastName:lastName, email:email, Age:Age, phone:phone})
            if(validSchema.error){
                mongoose.disconnect();
                reject(validSchema.error.details[0].message);
            }
            let student = new studentModel({
                firstName:firstName,
                lastName:lastName,
                email:email,
                Age:Age,
                phone:phone
            })
            student.save().then((doc)=>{
                mongoose.disconnect();
                resolve(doc);
            }).catch((err)=>{
                mongoose.disconnect();
                reject(err);
            })
        }).catch((err)=>reject(err))
    })
}


exports.getAllStudents = ()=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(url).then(()=>{
            studentModel.find().then((docs)=>{
                mongoose.disconnect();
                resolve(docs);
            }).catch((err)=>{
                mongoose.disconnect();
                reject(err);
            })
        }).catch((err)=>reject(err))
    })
}

exports.getStudentById = (id)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(url).then(()=>{
            studentModel.findById(id).then((doc)=>{
                mongoose.disconnect();
                resolve(doc);
            }).catch((err)=>{
                mongoose.disconnect();
                reject(err);
            })
        }).catch((err)=>reject(err))
    })
}

exports.updateStudent = (id, firstName, lastName, email, Age, phone)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(url).then(async ()=>{

            let validSchema = await schemaValidation.validateAsync({firstName:firstName, lastName:lastName, email:email, Age:Age, phone:phone})
            if(validSchema.error){
                mongoose.disconnect();
                reject(validSchema.error.details[0].message);
            }

            studentModel.findByIdAndUpdate(id, {
                firstName:firstName,
                lastName:lastName,
                email:email,
                Age:Age,
                phone:phone
            }).then((doc)=>{
                mongoose.disconnect();
                resolve(doc);
            }).catch((err)=>{
                mongoose.disconnect();
                reject(err);
            })
        })
    })
}

exports.deleteStudentById = (id)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(url).then(()=>{
            return studentModel.deleteOne({ _id: mongoose.Types.ObjectId.createFromHexString(id) })}).then((doc)=>{
                mongoose.disconnect();
                resolve(doc);
            }).catch((err)=>{
                mongoose.disconnect();
                reject(err);
            })
        })
    
}