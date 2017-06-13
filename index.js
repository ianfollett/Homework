'use strict';

let express = require("express");
let app = express();
let Movies = require('./models/movies.js');

// Configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));
app.use('/api', require('cors')());
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
        res.render('home', {movies: JSON.stringify(movies)});
    })
});

app.get('/about', (req, res) => {
    res.type('text/html');
    res.render('about');
});

// API's

app.get('/api/movies/:title', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    Movies.findOne({title: title}, (err, result) => {
        if (err || !result) return next(err);
        res.json(result);
    });
});

app.get('/api/movies', (req, res, next) => {
    Movies.find((err, results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});

app.get('/api/delete/:id', (req, res, next) => {
    Movies.remove({"_id": req.params.id}, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});

app.post('/api/add/', (req, res, next) => {
    // find & update existing item, or add new
    if (!req.body._id) { // insert new document
        let movie = new Movies({
            title: req.body.title,
            year: req.body.year,
            director: req.body.director,
            genre: req.body.genre
        });
        movie.save((err, newMovie) => {
            if (err) return next(err);
            console.log(newMovie);
            res.json({updated: 0, _id: newMovie._id});
        });
    } else { // update existing document
        Movies.updateOne({_id: req.body._id}, {
            title: req.body.title,
            year: req.body.year,
            director: req.body.director,
            genre: req.body.genre
        }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

app.get('/api/add/:title/:year/:director/:genre', (req, res, next) => {
    // find & update existing item, or add new
    let title = req.params.title;
    Movies.update({title: title}, {
        title: title,
        year: req.params.year,
        director: req.params.director,
        genre: req.params.genre
    }, {upsert: true}, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item
        res.json({updated: result.nModified});
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