const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});


module.exports = router;