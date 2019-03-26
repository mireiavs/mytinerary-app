
var City = require("../models/City")

var cityRoute = function (req, res) {
  City.find({}, (err, data) => {
    if (err)
      res.send(err);
    res.send(data);
  })}

  module.exports = cityRoute