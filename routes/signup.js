var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//import post schema
var User = require('../schema/userSchema.js');


router.post('/', function(req, res, next){
    //issue with the req.body- getting everything and not just the login form
    var newUser = new User(req.body.submissionFormDiv);
    newUser.save()
      .then(item => {
      res.json(newUser);
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
});


module.exports = router;
