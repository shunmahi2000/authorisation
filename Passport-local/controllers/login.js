const express = require('express');
const session = require('express-session')
const passport = require('passport');
const User = require('../models/user');
const validPassword = require('./passportUtils').validPassword;


const loginGet = (req, res, next) => {
    res.render("login")

}
const loginPost = (req, res, next) => {
    // const userNew = new User({
    //     username: req.body.email,
    //     password: req.body.password
    // })
    // console.log(req.body);
    // req.login(userNew, function (err) {

    //     if (err) {
    //         console.log(err);
    //     } else {
    //         var authenticate = User.authenticate();

    //         authenticate(req.body.email, req.body.password, function () {
    //             console.log("post login working")
    //             res.render("home");

    //         })
    //     }
    // })
    // passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/home' });

}
module.exports = { loginGet, loginPost };