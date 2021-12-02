const express = require('express');
const router = express.Router();
const registerC = require("../controllers/register")

router.get("/register", registerC.registerGet);
router.post("/register", registerC.registerPost);

module.exports = router;