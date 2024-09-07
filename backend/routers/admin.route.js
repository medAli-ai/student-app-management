const route = require('express').Router();
const adminModel = require('../models/admin.model');


route.post('/registerAdmin', (req, res, next) => {
    let userName = req.body.userName;
    let email = req.body.email;
    let password = req.body.password;

    adminModel.registerAdmin(userName, email, password).then((user) => {
        res.status(201).json({user: user, msg: 'Admin registered successfully'});
    }).catch((err) => {
        next(err);
    })
});

route.post('/loginAdmin', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    adminModel.loginAdmin(email, password).then((token) => {
        res.status(200).json(token);
    }).catch((err) => {
        next(err);
    })
});

module.exports = route;