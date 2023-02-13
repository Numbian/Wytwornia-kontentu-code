const compression = require('compression');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require('dotenv').config();

//app.disable('view cache');

/// aurentykacja i logowanine
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Leads = require("./models/Leads");
const User = require("./models/User");
const flash = require("connect-flash");
app.use(compression());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

// do przekazywania ip w req
app.set('trust proxy', true);
// konfiguracja passport passport-local

//app.use(require("express-session")({

app.use(require("cookie-session")({
	secret: process.env.MONGO_SECRET,
	resave: false,
	saveUninitialized: false,
	maxAge: 604800000
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
mongoose.connect("mongodb://localhost/Leads",  { useNewUrlParser: true,  useUnifiedTopology: true });
/// konfiguracja apki - middlewares
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.static('images'));
app.use(flash());

///global function middleware!
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
	next();
 })



///wywalennie routów do osobnych plików

var indexRoutes = require("./routes/Index");
app.use(indexRoutes);

app.listen(process.env.PORT_MAIN, function(){console.log("Server started on 8085 in " + process.env.NODE_ENV + " mode")});
