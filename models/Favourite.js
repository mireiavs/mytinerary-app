var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favouriteSchema = new Schema({
    userId: String,
    itineraryId: String
});

module.exports = Favourite = mongoose.model("Favourite", favouriteSchema);