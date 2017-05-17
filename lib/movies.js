/**
 * Created by ianfollett on 4/24/17.
 */
'use strict';

let movies = [
    { title:'The Godfather', year:1972, director:'Francis Ford Coppola', genre:'Drama' },
    { title:'The Wizard of Oz', year:1939, director:'Victor Fleming', genre:'Fantasy' },
    { title:'Citizen Kane', year:1941, director:'Orson Welles', genre:'Drama' },
    { title:'The Shawshank Redemption', year:1994, director:'Frank Darabont', genre:'Drama' },
    { title:'Pulp Fiction', year:1994, director:'Quentin Tarantino', genre:'Crime' }
];

exports.get = (title) => {
    return movies.find((item) => {
        return item.title == title;
    });
};

exports.delete = (title) => {
    const oldLength = movies.length;
    let newMovies;
    newMovies = movies.filter((item) => {
        return item.title !== title;
    });
    movies = newMovies;
    let newLength = movies.length;
    return (newLength + 1) == oldLength;
};

exports.add = (newMovie) => {
    const oldLength = movies.length;
    movies.push(newMovie);
    let newLength = movies.length;
    return (newLength - 1) == oldLength;
};

exports.getAll = () => {
    return movies
};








