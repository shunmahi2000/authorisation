const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



require('dotenv').config();
var app = express();
require('./models/user');
require('./config/passport')(passport);


app.use(passport.initialize());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes/users'));


mongoose.connect("mongodb://localhost:27017/practicedb", { useNewUrlParser: true });

app.listen(3000, function (req, res) {
    console.log("Server Connected");
});
