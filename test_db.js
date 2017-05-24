/**
 * Created by ianfollett on 5/22/17.
 */
let Movies = require('./models/movies.js');

new Movies({
    title: 'The Godfather',
    year: 1972,
    director: 'Francis Ford Coppola',
    genre: 'Drama',
}).save();

new Movies({
    title: 'The Wizard of Oz',
    year: 1939,
    director: 'Victor Fleming',
    genre: 'Fantasy',
}).save();

new Movies({
    title: 'Citizen Kane',
    year: 1941,
    director: 'Orson Welles',
    genre: 'Drama',
}).save();

new Movies({
    title: 'The Shawshank Redemption',
    year: 1994,
    director: 'Frank Darabont',
    genre: 'Drama',
}).save();

new Movies({
    title: 'Pulp Fiction',
    year: 1994,
    director: 'Quentin Tarantino',
    genre: 'Crime',
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

