//Stick Figure Gaming Server side javascript

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3000;

var mongoURL = 'mongodb+srv://SFGserver:SFGserverpassword@stick-figure-gaming-kv6hd.mongodb.net/test?retryWrites=true';
var db;

//setup and use the handlebars as the engine
app.engine('handlebars', exphbs({defaultLayout: 'skeleton'}));
app.set('view engine', 'handlebars');

//serve public files
app.use(express.static('public'));

//use the json parser to parse bodys
app.use(bodyParser.json());

//serve home page
app.get('/', function(req, res)
{
  res.status(200);
  res.render('home',
  {
    gamesPage: true});
});

//serve forum home page
app.get('/forums', function(req, res)
{
  //get the forum catagories data
  var gamesCursor =db.collection('games').find();

  gamesCursor.toArray(function (err, gamesDocs)
  {
    if (err)
    {
      res.status(500).send("Error fetching catagories from DB.");
    }
    else
    {
      res.status(200);
      res.render('forums',
      {
        forumsPage: true,
        forumCatagories: true,
        games: gamesDocs});
    }
  });
});

//serve a forum catagory
app.get('/forums/:catagory', function(req, res, next)
{
  //get the games collection
  var games = db.collection('games');
  //get a cursor for the catagory whos url we are at
  var catagoryCursor = games.find({url: '/forums/' + req.params.catagory});

  //get the catagory document and respond with the proper contents
  catagoryCursor.toArray(function(err, catagoryDoc)
  {
    if (err)
    {
      res.status(500).send("Error fetching catagory from DB.");
    }
    else
    {
      //check to make sure the catagory exists
      if(catagoryDoc[0] === undefined)
      {
        //if the catagory doesn't exist then go to the next middleware
        next()
      }
      else
      {
        res.status(200);
        res.render('forums',
        {
          forumsPage: true,
          forumThreads: true,
          catagory: catagoryDoc[0].url,
          catagoryLabel: catagoryDoc[0].gameTitle,
          threads: catagoryDoc[0].threads
        });
      }
    }
  });
});

//serve a specific thread
app.get('/forums/:catagory/:threadId', function(req, res, next)
{
  //get the games collection
  var games = db.collection('games');
  //get a cursor the thread identified by the threadId
  var threadCursor = games.find({threadId: req.params.threadId})

  //get the catagory name by replacing the dashes with spaces
  var catagoryName = req.params.catagory.replace("-", " ");

  threadCursor.toArray(function(err, threadDoc)
  {
    if(err)
    {
      res.status(500).send("Error fetching catagory from DB.");
    }
    else
    {
      //check if the thread exists
      if(threadCursor[0] === undefined)
      {
        //if the thread doesn't exist then go to the next middleware
        next();
      }
      else
      {
        console.log(threadDoc);
        res.status(200);
        res.render('forum',
        {
          forumsPage: true,
          individualThread: true,
          catagory: req.params.catagory,
          catagoryLabel: catagoryName,
          threadObject: threadDoc[0],
          comments: threadDoc[0].comments
        });
      }
    }
  });

  /*
  var threadArray;
  //render object
  var rendObj = {};

  catagoryCursor.toArray(function(err, catagoryDoc)
  {
    if (err)
    {
      res.status(500).send("Error fetching catagory from DB.");
    }
    else
    {
      //get the data from the threadCursor
      threadCursor.toArray(function(err, threadDoc)
      {
        if (err)
        {
          res.status(500).send("Error fetching catagory from DB.");
          //indicate that there was an error
          threadArray = 1;
        }
        else
        {
          threadArray = threadDoc;
        }
      });

      //wait for the threadArray to be filled
      while(!threadArray);

      //check for an error before continuing
      if(threadArray !== 1)
      {
        res.status(200);
        res.render('forums',
        {
          forumsPage: true,
          individualThread: true,
          catagory:
        });
      }
    }
  });
*/



});

//serve 404 page
app.get('*', function (req, res) {
  res.status(404);
  res.render('404');
});

//post for a new thread
app.post('/forums/:catagory/newThread', function(req, res)
{
  //log the the content if all values were sent
  if(req.body && req.body.author && req.body.subject && req.body.content && req.body.shortAuthor && req.body.shortSubject && req.body.shortContent && req.body.threadId && req.body.url)
  {
    console.log("New thread info: ");
    console.log(req.body);
    res.status(200).send("Request successful");
  }
  else
  {
    res.status(400).send("Request must contain author, subject, content, shortContent, shortSubject, shortContent, threadId, and url");
  }
});

//post for a new comment
app.post('/forums/:catagory/:threadId/newComment', function(req, res)
{
  //log the the content if all values were sent
  if(req.body && req.body.author && req.body.subject && req.body.content && req.body.shortAuthor && req.body.shortSubject && req.body.shortContent)
  {
    console.log("New comment info: ");
    console.log(req.body);
    res.status(200).send("Request successful");
  }
  else
  {
    res.status(400).send("Request must contain author, subject, content, shortContent, shortSubject, shortContent");
  }
});

MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
    throw err;
  }
  db =  client.db('SFGserver');
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
