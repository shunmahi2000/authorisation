const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

router.get('/home', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    // res.render("home");
    res.status(200).json({ success: true, message: 'You are authoridesd to dee this resource' });
})
// TODO
router.get('/login', (req, res, next) => {
    res.render("login");
});
router.get("/register", (req, res, next) => {
    res.render("register");
})
// TODO
router.post("/login", function (req, res, next) {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                res.status(401).json({ success: false, msg: "could not find user" });
            }
            // Function defined at bottom of app.js
            const isValid = utils.validPassword(
                req.body.password,
                user.hash,
                user.salt
            );
            if (isValid) {
                const tokenObject = utils.issueJWT(user);
                // res.redirect('/home');
                res.status(200).json({
                    success: true,
                    token: tokenObject.token,
                    expiresIn: tokenObject.expires,
                });
            } else {

                res
                    .status(401)
                    .json({ success: false, msg: "you entered the wrong password" });
            }
        })
        .catch((err) => {
            next(err);
        });
});

// TODO
router.post('/register', function (req, res, next) {
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.email,
        hash: hash,
        salt: salt
    })
    newUser.save()
        .then((user) => {
            const id = user._id;

            const jwt = utils.issueJWT(user);
            res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expiresIn });
        })
        .catch(err => next(err));
});

module.exports = router;