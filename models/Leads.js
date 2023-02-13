var mongoose = require("mongoose");

var leadsSchema = new mongoose.Schema({

name: String,
phone: String,
email: String,
message: String,
date: String,
googleID: String,
gclID: String,
leadIp:String
});

module.exports = mongoose.model("Leads", leadsSchema);



