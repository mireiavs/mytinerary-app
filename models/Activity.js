const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  itineraryId: String,
  img: String,
  caption: String
});

module.exports = Activity = mongoose.model("Activity", activitySchema);
