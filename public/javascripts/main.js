//this js file finds the posts from the mongo database and pushes that data to the html file
/*global $*/


var registerHTML = '<form action = "/signup" method = "POST">\
	      	    <input type = "text" placeholder= "username" name = "username">\
	      	    <input type = "password" placeholder= "password" name = "password">\
	      	    <input type = "email" placeholder = "email (optional)" name = "email">\
	      	    <input type = "submit" value = "Signup">\
	      	  </form>';

//switches the right side bar from the login form to the register form
$('#registerSwitch').click(function(){
    $("#loginDiv").html(registerHTML);
});


//can't use post or any mongoose stuff if it's on client-side JS, need to somehow triger a server side function via clientside thing
//if user hasn't upvoted the post before, then adds a vote, and adds post id to list of things the user has upvoted
//if user has upvoted the post before, then removes upvote, removes post id to the list of things the user has upvoted
function vote(id, amp){
    Post.find({id: id}, function(err, doc){
        console.log(doc);
    });
};
/*Model.findOne({ name: 'bourne' }, function (err, doc){
  doc.name = 'jason bourne';
  doc.visits.$inc();
  doc.save();
});*/
