'use strict';

var express = require("express");
var movies = require("./lib/movies.js");


var app = express();

app.use(express.static(__dirname + '/public')); // set location for static files

app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions


var handlebars = require("express-handlebars")
    .create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) { res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about');
});


app.post('/get', function (req, res) {
    console.log(req.body);
    var found = movies.get(req.body.title);
    res.render("details", {title: req.body.title, result: found});
});

app.get('/delete', function (req, res) {
    let result = movies.delete(req.query.title);
    res.render('delete', {title: req.query.title, result: result});
});

app.post('/add', function (req, res) {
    res.type('text/html');
    var newMovie = {
        "title": req.body.title,
        "year": req.body.year,
        "director": req.body.director,
        "genre": req.body.genre
    };
    var result = movies.add(newMovie);
    res.render('add', {title: req.body.title, result: result});
});

// Custom 404 page
app.use(function(req, res, next){ res.status(404);
    res.render('404');
});

// Custom 500 page
app.use(function(err, req, res, next){ console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started');
});
