//Model mongoose z autentykacją lokalną.

var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose"); 
var userSchema = new mongoose.Schema({

	username: String,
	isAdmin: Boolean,
	password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);