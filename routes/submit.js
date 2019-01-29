/*global Post*/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//import post schema
var Post = require('../schema/postSchema.js');



//get submit page
router.get('/', function(req, res, next) {
  res.render('submit');
});

//post data to db

//TODO- send them to newly posted post

router.post('/', function(req, res, next){
    var newPost = new Post(req.body);
    newPost.save()
      .then(item => {
        //need to pass through index.js
      res.redirect("/");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
});


module.exports = router;
