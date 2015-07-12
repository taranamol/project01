// require express framework and additional modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require("underscore");

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
//connecting the css/js to the server.js
app.use(express.static(__dirname + '/public/styles/styles.css'));
// app.use(express.static(__dirname + '/public/scripts/script.js'));

app.use(bodyParser.json()) 

//set up root route to respond with 'hello world'
// app.get('/', function (req, res) {
//   res.send('hello world');
// });

var users = [
  {
    name: 'Bob',
    username: 'bobiscool'
  },
  {
    name: 'Julie',
    username: 'julierocks'
  }
];

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/users', function(req, res) {
  res.json(users);
});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on localhost:3000');
});
