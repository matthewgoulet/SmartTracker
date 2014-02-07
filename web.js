var express = require("express");
var logfmt = require("logfmt");
var app = express();
var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://heroku_app22012954:SmartTracker1@ds027509.mongolab.com:27509/heroku_app22012954';

mongo.Db.connect(mongoUri, function (err, db) {
	db.collection('mydocs', function(er, collection) {
		collection.insert({'mykey': 'vLXd7kNkFPShIejeAuQRqmQCEaMCambU'}, {safe: true}, function(er,rs) {
		});
	});
});


app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
	res.send('Hello World! Still trying to test this!!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});

