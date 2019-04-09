var express = require('express');
var mongoose = require('mongoose');
var cities = require("./routes/api/cities")
var itineraries = require("./routes/api/itineraries")
var activities = require("./routes/api/activities")
var comments = require("./routes/api/comments")
var users = require("./routes/api/users")
var auth = require("./routes/api/auth")
/* var keys = require("./keys")
 */
var config = require("config")
var app = express();
var port = process.env.PORT || 5000;
/* const bodyParser = require("body-parser")
 */
app.use("/cities/uploads", express.static("uploads"))
/* app.use(bodyParser.json())
 */

app.use(express.json())

const options = {
  useNewUrlParser: true,
  useCreateIndex: true
};
mongoose.connect(config.get("mongoURL"), options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected to db");
});

app.use('/api/cities', cities);
app.use('/api/itineraries', itineraries);
app.use('/api/activities', activities);
app.use('/api/comments', comments)
app.use('/api/users', users)
app.use('/api/auth', auth)


app.listen(port);
console.log('Magic happens on port ' + port);