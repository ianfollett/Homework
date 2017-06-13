'use strict';

let movies = [
    {title: 'The Godfather', year: 1972, director: 'Francis Ford Coppola', genre: 'Drama'},
    {title: 'The Wizard of Oz', year: 1939, director: 'Victor Fleming', genre: 'Fantasy'},
    {title: 'Citizen Kane', year: 1941, director: 'Orson Welles', genre: 'Drama'},
    {title: 'The Shawshank Redemption', year: 1994, director: 'Frank Darabont', genre: 'Drama'},
    {title: 'Pulp Fiction', year: 1994, director: 'Quentin Tarantino', genre: 'Crime'}
];

exports.get = (title) => movies.find((item) => {
    return item.title == title;
});


exports.delete = function (title) {
    var index = movies.indexOf(title);
    movies.splice(index, 1);
};