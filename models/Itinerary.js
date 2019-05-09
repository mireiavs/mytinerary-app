var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itinerarySchema = new Schema({
  title: {
    type: String
  },
  user: {
    type: String
  },
  userImg: {
    type: String
  },
  likes: {
    type: Number
  },
  rating: {
    type: Number
  },
  duration: {
    type: String
  },
  price: {
    type: String
  },
  hashtag: {
    type: Array
  },
  cityName: {
    type: String
  },
  activities: {
    type: Array
  }
});

module.exports = Itinerary = mongoose.model("Itinerary", itinerarySchema);
