var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/sandbox';

var app = express();

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Routes

// GET '/posts'
app.get('/posts', function(req, res) {
  mongo.connect(url, function(err, db) {
    db.collection('posts').find({}).toArray(function(err, docs) {
      db.close();
      res.json({posts: docs});
    });
  });
});

// POST /posts
app.post('/posts', function(req, res) {
  var post = {
    message: req.body.message
  };
  mongo.connect(url, function(err, db) {
    db.collection('posts').insertOne(post, function(err, result) {
      db.close();
      res.json(result);
    });
  })
});

var port = process.env.PORT || 3000;
  // defines environmental variable and the default port #

app.listen(port, function() {
  console.log('Listening on ' + port);
});
