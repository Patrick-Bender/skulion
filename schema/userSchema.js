var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  type: String,
  username: String,
  password: String,
  score: Number,
  email: String,
  creationDate: Date
});

var User = mongoose.model("User", userSchema);
module.exports = User;