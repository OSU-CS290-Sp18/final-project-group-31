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

//**********************************************************
//*****************serve home page**************************
//**********************************************************
app.get('/', function(req, res)
{
  res.status(200);
  res.render('home',
  {
    gamesPage: true});
});


//**********************************************************
//*************serve forum home page************************
//**********************************************************

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

//*********************************************************************
//****************serve a forum catagory*******************************
//*********************************************************************
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

//********************************************************************
//******************serve a specific thread***************************
//********************************************************************
app.get('/forums/:catagory/:threadId', function(req, res, next)
{
  //get the games collection
  var games = db.collection('games');
  //get a cursor for the catagory at this url
  var catagoryCursor = games.find({url: '/forums/' + req.params.catagory});

  catagoryCursor.toArray(function(err, catagoryDoc)
  {
    if(err)
    {
      res.status(500).send("Error fetching catagory from DB.");
    }
    else
    {
      //check if the catagory exists
      if(catagoryDoc[0] === undefined)
      {
        //if the catagory doesn't exist then go to the next middleware
        next();
      }
      else
      {
        //boolean to indicate if the thread was found
        var foundThread = false;

        //go through the threads in the catagory to find the one matching the threadId
        for(var i = 0; i < catagoryDoc[0].threads.length; i++)
        {
          if(catagoryDoc[0].threads[i].threadId === req.params.threadId)
          {
            foundThread = true;

            var updateJSONString = '{"threads.'+i+'.viewCount": 1}'
            var updateJSON = JSON.parse(updateJSONString);

            //update the view count
            games.updateOne({"threads.threadId": req.params.threadId}, {$inc: updateJSON}, function(err, result)
            {
              if(err)
              {
                res.status(500).send("Error adding thread to db: " + err);
              }
            });
            //render the page with the new view count
            res.status(200);
            res.render('forums',
            {
              forumsPage: true,
              individualThread: true,
              catagory: catagoryDoc[0].url,
              catagoryLabel: catagoryDoc[0].gameTitle,
              threadObject: catagoryDoc[0].threads[i],
              comments: catagoryDoc[0].threads[i].comments
            });
          }
        }
        //if none of the threads match, then go to the next middleware
        if(!foundThread)
        {
          next();
        }
      }
    }
  });
});

//**************************************************************************
//***********************serve 404 page*************************************
//**************************************************************************
app.get('*', function (req, res) {
  res.status(404);
  res.render('404');
});

//**************************************************************************
//**********************post for a new thread*******************************
//**************************************************************************
app.post('/forums/:catagory/newThread', function(req, res)
{
  //log the the content if all values were sent
  if(req.body && req.body.author && req.body.subject && req.body.content && req.body.shortAuthor && req.body.shortSubject && req.body.shortContent && req.body.threadId && req.body.url)
  {
    //console.log("New thread info: ");
    //console.log(req.body);
    //get the games collection
    var games = db.collection('games');

    //insert a thread under the requested catagory
    var catagoryCursor = games.updateOne({url: '/forums/' + req.params.catagory}, {$push: {threads:
    {
      threadId: req.body.threadId,
      url: req.body.url,
      author: req.body.author,
      subject: req.body.subject,
      content: req.body.content,
      shortAuthor: req.body.shortAuthor,
      shortSubject: req.body.shortSubject,
      shortContent: req.body.shortContent,
      commentCount: 0,
      viewCount: 0
    }}},
    function(err, result)
    {
      if(err)
      {
        res.status(500).send("Error adding thread to db.");
      }
      else
      {
        res.status(200).send("Successfully added thread to db.");
      }
    });
  }
  else
  {
    res.status(400).send("Request must contain author, subject, content, shortContent, shortSubject, shortContent, threadId, and url");
  }
});

//***************************************************************************
//**********************post for a new comment*******************************
//***************************************************************************
app.post('/forums/:catagory/:threadId/newComment', function(req, res)
{
  //log the the content if all values were sent
  if(req.body && req.body.author && req.body.subject && req.body.content && req.body.shortAuthor && req.body.shortSubject && req.body.shortContent)
  {
    var games = db.collection('games');
    var catagoryCursor = games.find({url: '/forums/' + req.params.catagory});

    //find the index of the thread being commented on
    catagoryCursor.toArray(function(err, catagoryDoc)
    {
      if(err)
      {
        res.status(500).send("Error fetching catagory from DB.");
      }
      else
      {
        //check if the catagory exists
        if(catagoryDoc[0] === undefined)
        {
          //if the catagory doesn't exist then go to the next middleware
          next();
        }
        else
        {
          //boolean to indicate if the thread was found
          var foundThread = false;

          //go through the threads in the catagory to find the one matching the threadId
          for(var i = 0; i < catagoryDoc[0].threads.length; i++)
          {
            if(catagoryDoc[0].threads[i].threadId === req.params.threadId)
            {
              foundThread = true;

              var jsonComment =
              {
                author: req.body.author,
                subject: req.body.subject,
                content: req.body.content,
                shortAuthor: req.body.shortAuthor,
                shortSubject: req.body.shortSubject,
                shortContent: req.body.shortContent
              };
              var jsonCommentString = JSON.stringify(jsonComment);
              var updateJSONString = '{"threads.'+i+'.comments": ' + jsonCommentString + '}'
              var updateJSON = JSON.parse(updateJSONString);

              //insert a comment under the requested catagory and thread
              var catagoryCursor = games.updateOne({url: '/forums/' + req.params.catagory}, {$push: updateJSON},
              function(err, result)
              {
                if(err)
                {
                  res.status(500).send("Error adding comment to db.");
                }
                else
                {
                  res.status(200).send("Successfully added comment to db.");
                }
              });

              var incJSONString = '{"threads.'+i+'.commentCount": 1}'
              var incJSON = JSON.parse(incJSONString);

              //update the commentcount
              games.updateOne({"threads.threadId": req.params.threadId}, {$inc: incJSON}, function(err, result)
              {
                if(err)
                {
                  console.log(err);
                }
              });
            }
          }
          if(!foundThread) next();
        }
      }
    });


  }
  else
  {
    res.status(400).send("Request must contain author, subject, content, shortContent, shortSubject, shortContent");
  }
});

//*************************************************************************
//*******************Connect to db and start server************************
//*************************************************************************
MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
    throw err;
  }
  db =  client.db('SFGserver');
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
