//Stick Figure Gaming Server side javascript

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'skeleton'}));
app.set('view engine', 'handlebars');

//serve public files
app.use(express.static('public'));

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

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
