var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var citySchema = new Schema({
    name: String,
    country: String
});


module.exports = mongoose.model("City", citySchema);