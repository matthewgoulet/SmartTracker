var express = require("express");
var logfmt = require("logfmt");
var app = express();
var redis = require('redis-url').connect(process.env.REDISTOGO_URL);
var mongoose = require("mongoose");

redis.set('foo', 'bar');

redis.get('foo', function(err, value) {
	console.log('foo is: ' + value);
});


var mongoUri = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://heroku_app22012954:SmartTracker1@ds027509.mongolab.com:27509/heroku_app22012954';

mongoose.connect(mongoUri, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + mongoUri + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + mongoUri);
  }
});


var userSchema = new mongoose.Schema({
	name: {
	first: String,
	last: { type: STring, trim: true }
	},
	age: { type: Number, min:0}
});

var PUser = mongoose.model('PowerUsers', userSchema);

var admin = new PUser ({
	name: { first: 'Matthew', last: '	Goulet	'},
	age: 22
});

admin.save(function (err) {if (err) console.log ('Error on Save!')});
	
app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
	res.send('Hello World! Still trying to test this!!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});

