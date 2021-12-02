const express = require('express');
const passport = require('passport');
const router = express.Router();
const loginC = require("../controllers/login")
const validPassword = require('../controllers/passportUtils').validPassword;

router.get("/", loginC.loginGet);
router.post("/", passport.authenticate('local', { failureRedirect: '/', successRedirect: '/home' }));

module.exports = router;