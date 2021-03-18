const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  body: String,
});

module.exports = mongoose.model("Post", postSchema);
