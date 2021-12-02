const express = require('express');

const homeGet = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render("home");
    } else {
        res.redirect("/");
    }

}
module.exports = { homeGet };