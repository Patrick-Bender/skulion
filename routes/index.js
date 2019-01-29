var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//import post schema
var Post = require('../schema/postSchema.js');

//TODO- pass post data into index.ejs


router.get('/', function(req, res, next) {
//finds posts
  Post.find({}, function(err, data){
      //res.send(data);
      res.render('index',{
          postData: data
      });
  });
});

module.exports = router;
