var express = require('express');
var mongoose = require('mongoose');
var cities = require("./routes/api/cities")
var keys = require("./keys")
var app = express();
var port = process.env.PORT || 5000;
const bodyParser = require("body-parser")

app.use(bodyParser.json())


const options = {
  useNewUrlParser: true,
};
mongoose.connect(keys.mongoURL, options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected to db");
});


app.use('/api/cities', cities);

app.listen(port);
console.log('Magic happens on port ' + port);