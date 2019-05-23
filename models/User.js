const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  country: {
    type: String
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  userImage: {
    type: String
  },
  favourites: [{ itineraryId: String, timestamp: Date }]
});

module.exports = User = mongoose.model("User", userSchema);
