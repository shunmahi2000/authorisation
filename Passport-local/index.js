const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session')
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require("./models/user")
const LocalStrategy = require('passport-local').Strategy;

//IMPORT routes
const registerRoutes = require("./routes/register")
const loginRoutes = require("./routes/login")
const homeRoutes = require("./routes/home")
const logOutRoutes = require("./routes/logout")

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: "qwertyuiop",
    resave: false,
    saveUninitialized: false
}))
require('./controllers/passport');

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize())
app.use(passport.session());




app.use("/", registerRoutes);
app.use("/", loginRoutes);
app.use("/", homeRoutes);
app.use("/", logOutRoutes);



//mongodb connection

mongoose.connect("mongodb://localhost:27017/practicedb", { useNewUrlParser: true });

app.listen(3000, function () {
    console.log('Server started on port 3000');
});