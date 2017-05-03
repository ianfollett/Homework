/**
 * Created by ianfollett on 5/2/17.
 */
var expect = require("chai").expect;
var movies = require("../lib/movies");

describe("Movies module", () => {
    it("get returns requested movie", function () {
        var result = movies.get("Pulp Fiction");
        expect(result).to.deep.equal({
            title: 'Pulp Fiction',
            year: 1994,
            director: 'Quentin Tarantino',
            genre: 'Crime'
        });
    });

    it("get fails w/ invalid movie", () => {
        var result = movies.get("fake");
        expect(result).to.be.undefined;
    });

    it("delete removes requested movie", function () {
        var result = movies.delete("Pulp Fiction");
        //expect(result).to.deep.equal({newLength: true});
        expect(result).to.equal(true);
    });

    it("delete fails with invalid movie", () => {
        var result = movies.delete("fake");
        expect(result).to.equal(false);
    });

    it("add adds given movie", function () {
        var newMovie = {"title": "Forest Gump", "year": "1994", "director": "Robert Zemeckis", "genre": "Comedy"};
        var result = movies.add(newMovie);
        expect(result).to.equal(true);
    });

    it("add fails with invalid movie", () => {
        var result = movies.delete("fake");
        expect(result).to.equal(false);
    });


});
