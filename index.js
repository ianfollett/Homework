'use strict'

var express = require("express");
var movies = require("./lib/movies.js")


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

app.get('/get', function(req, res){
    console.log(req.query); // display parsed querystring object
    
});


app.use(function(req, res, next){ res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){ console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started');
});


/*


app.post('/get', function(req,res){
    console.log(req.body); // display parsed form submission*!/
});
*/




// send content of 'home' view
app.get('/get', function(req,res){
    var result = movies.get(req.query.title);
    res.render('details', {title: "Pulp Fiction", result: result });
});