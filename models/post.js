const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  body: String,
  dateCreated: String,
  timeCreated: String,
});

module.exports = mongoose.model("Post", postSchema);
