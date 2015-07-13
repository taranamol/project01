// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require("underscore");

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
//connecting the css/js to the server.js
app.use(express.static(__dirname + '/public/styles'));
app.use(express.static(__dirname + '/public/scripts'));

app.use(bodyParser.json())

var posts = [
 {id: 1, title: "madrid, spain", description: "this restaurant was amazing! great vegetarian choices."},
 {id:2, title: "lisbon, portugal", description: "great meal to start off our foodventures! never knew what sweet potatoes could be!"},
 {id: 3, title: "florence, italy", description: "lovedd risotto! can't find it anywhere but italy!"}
 ];

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/api/posts', function(req, res) {
  res.json(posts);
});

app.post('/api/posts', function (req, res) {
  var newPost = req.body;
  
    if (posts.length > 0) {
    newPost.id = posts[posts.length - 1].id +  1;
  } else {
    newPost.id = 0;
  }

  // add newPost to `post` array
  posts.push(newPost);
  
  // send newPost as JSON response
  res.json(newPost);
});

// update post
app.put('/api/posts/:id', function(req, res) {

  var postId = parseInt(req.params.id);

  var targetPost = _.findWhere(posts, {id: postId});

  targetPost.title = req.body.title;

  targetPost.description = req.body.description;

  // send back edited object
  res.json(targetPost);
});

// delete post
app.delete('/api/posts/:id', function(req, res) {
  
  var postId = parseInt(req.params.id);

  var targetPost = _.findWhere(posts, {id: postId});

  // get the index of the found post
  var index = posts.indexOf(targetPost);
  
  // remove the item at that index, only remove 1 item
  posts.splice(index, 1);
  
  // send back deleted object
  res.json(targetPost);
});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});
