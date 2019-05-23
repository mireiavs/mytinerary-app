const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  itineraryId: String,
  user: String,
  message: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comment = mongoose.model("Comment", commentSchema);
