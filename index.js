'use strict';

let express = require("express");
let app = express();
let Movies = require('./models/movies.js');

// Configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));
app.use((err, req, res, next) => {
    console.log(err)
});


// Set template engine
let handlebars = require("express-handlebars")
    .create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    Movies.find((err, movies) => {
        if (err) return next(err);
        res.render('home', {movies: movies});
    })
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.get('/get', (req, res, next) => {
    Movies.findOne({title: req.query.title}, (err, movies) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: movies});
    });
});

app.post('/get', (req, res, next) => {
    Movies.findOne({title: req.body.title}, (err, movies) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: movies});
    });
});


app.get('/delete', (req, res) => {
    Movies.remove({title: req.query.title}, (err, result) => {
        if (err) return next(err);
        let deleted = result.result.n !== 0; // n will be 0 if no docs deleted
        Movies.count((err, total) => {
            res.type('text/html');
            res.render('delete', {title: req.query.title, deleted: result.result.n !== 0, total: total});
        });
    });
});


// API's
app.get('/api/v1/movies/:title', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    Movies.findOne({title: title}, (err, result) => {
        if (err || !result) return next(err);
        res.json(result);
    });
});

app.get('/api/v1/movies', (req, res, next) => {
    Movies.find((err, results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});

app.get('/api/v1/delete/:title', (req, res) => {
    Movies.remove({"title": req.params.title}, (err, result) => {
        if (err) {
            res.json({"result": err});
        } else {
            // return # of items deleted
            res.json({"deleted": result.result.n});
        }
    });
});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
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
