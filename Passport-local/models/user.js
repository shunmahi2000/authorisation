const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    salt: String,
    hash: String,
    admin: Boolean
})
userSchema.plugin(passportLocalMongoose);
module.exports = new mongoose.model("User", userSchema);