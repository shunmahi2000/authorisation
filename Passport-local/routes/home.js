const express = require('express');
const router = express.Router();
const homeC = require("../controllers/home")

router.get("/home", homeC.homeGet);


module.exports = router;