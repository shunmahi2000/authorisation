const session = require('express-session')
const passport = require('passport');
const User = require('../models/user');
const genPassword = require('./passportUtils').genPassword;



const registerGet = (req, res, next) => {

    res.render("register");
}
const registerPost = (req, res, next) => {
    console.log("working");

    // User.register({ username: req.body.email }, req.body.password, function (err, user) {
    //     if (err) {
    //         console.log(err);

    //     }
    //     res.redirect("/");
    // })
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.email,
        hash: hash,
        salt: salt,
        admin: false
    })
    newUser.save().then((user) => {
        console.log(user);
    })
    res.redirect("/");

}

module.exports = { registerGet, registerPost };