//Stick Figure Gaming Server side javascript

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

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
  res.status(200);
  res.render('forums',
  {
    forumsPage: true,
    forumCatagories: true});
});

//serve a forum catagory
app.get('/forums/:catagory', function(req, res)
{
  res.status(200);
  res.render('forums',
  {
    forumsPage: true,
    forumThreads: true,
    catagory: req.params.catagory});
});

//serve a specific thread
app.get('/forums/:catagory/:threadId', function(req, res)
{
  res.status(200);
  res.render('forums',
  {
    forumsPage: true,
    individualThread: true,
    catagory: req.params.catagory,
    threadId: req.params.threadId});
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

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
