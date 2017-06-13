/**
 * Created by ianfollett on 5/22/17.
 */
let Movies = require('./models/movies.js');

new Movies({
    title: 'Van Wilder',
    year: 2002,
    director: 'Walt Becker',
    genre: 'Comedy',
}).save();

new Movies({
    title: 'Heathers',
    year: 1988,
    director: 'Michael Lehmann',
    genre: 'Comedy',
}).save();

new Movies({
    title: 'The Shining',
    year: 1980,
    director: 'Stanley Kubrick',
    genre: 'Horror',
}).save();


Movies.count((err, result) => {
    console.log(result);
});

Movies.find((err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(result);
    }
});

