const express = require('express');

const homeGet = (req, res, next) => {
    res.render("home");
}
const homeAdminGet = (req, res, next) => {
    res.render("homeAdmin");
}
module.exports = { homeGet, homeAdminGet };