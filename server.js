//Stick Figure Gaming Server side javascript

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'skeleton'}));
app.set('view engine', 'handlebars');

//serve home page
app.get('/', function(req, res)
{
  res.status(200);
  res.render('home', {gamespage: true, forumspage: false});
});

app.get('/forums', function(req, res)
{
  res.status(200);
  res.render('forums',{gamespage: false, forumspage: true});
});

//serve public files
app.use(express.static('public'));

//serve 404 page
app.get('*', function (req, res) {
  res.status(404);
  res.render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
