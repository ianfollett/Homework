//var credentials = require("../lib/credentials.js");
var mongoose = require("mongoose");

// remote db settings
var options = {server: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}}};
mongoose.connect('mongodb://ian:password@ds149221.mlab.com:49221/ian_db', options);
//mongoose.connect(credentials.mongo.development.connectionString, options);


var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

var moviesSchema = mongoose.Schema({
    title: String,
    year: Number,
    director: String,
    genre: String,
});

module.exports = mongoose.model('Movies', moviesSchema);
