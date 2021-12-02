const express = require('express');
const router = express.Router();
const homeC = require("../controllers/home")
const isAuth = require('../routes/authMiddlewares').isAuth;
const isAdmin = require('../routes/authMiddlewares').isAdmin;

router.get("/home", isAuth, homeC.homeGet);
router.get("/homeAdmin", isAuth, isAdmin, homeC.homeAdminGet);

module.exports = router;