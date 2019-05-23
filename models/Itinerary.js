const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
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
  }
});

module.exports = Itinerary = mongoose.model("Itinerary", itinerarySchema);
