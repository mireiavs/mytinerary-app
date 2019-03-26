var express = require('express');
var mongoose = require('mongoose');
var cityRoute = require("./routes/cityRoute")
var keys = require("./keys")
var app = express();
var port = process.env.PORT || 5000;


// DATABASE
const options = {
  useNewUrlParser: true,
};
mongoose.connect(keys.mongoURL, options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected to db");
});

// ROUTES
var router = express.Router();

// home page route (http://localhost:5000)
router.get('/', function (req, res) {
  res.send('Im the home page!');
});

// city list route (http://localhost:5000/cities/all)
router.get('/cities/all', cityRoute);

// apply routes to the application
app.use('/', router);

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);