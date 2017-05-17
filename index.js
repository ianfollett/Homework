'use strict';

let express = require("express");
let movies = require("./lib/movies.js");


let app = express();

app.use(express.static(__dirname + '/public')); // set location for static files

app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions


let handlebars = require("express-handlebars")
    .create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
    res.render('home', {movies: movies.getAll()});
});

app.get('/about', function(req, res) {
    res.render('about');
});


app.get('/get', function (req, res) {
    console.log(req.query);
    let result;
    result = movies.get(req.query.title);
    res.render("details", {title: req.query.title, result: result});
});

app.get('/delete', function (req, res) {
    console.log(req.query);
    let result;
    result = movies.delete(req.query.title);
    res.render('delete', {title: req.query.title, result: result});
});

app.post('/add', function (req, res) {
    console.log(req.body);
    res.type('text/html');
    let newMovie;
    newMovie = {
        "title": req.body.title,
        "year": req.body.year,
        "director": req.body.director,
        "genre": req.body.genre
    };
    let result;
    result = movies.add(newMovie);
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
