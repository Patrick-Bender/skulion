var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
   type: String,
   username: String,
   date: Date,
   title: String,
   link: String,
   text: String,
   votes: Number,
   community: String
});
var Post = mongoose.model("Post", postSchema);
module.exports = Post;
//exports model w/ name Post