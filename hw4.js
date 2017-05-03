/**
 * Created by ianfollett on 5/2/17.
 */
// eslint practice file for ITC 230
var names = ['sara', 'joe', 'dave', 'ann'];
names.map(function (item) {
    //Wasn't sure what to do with x so I just added it to the return.
    var x = 2;
    return item.toUpperCase() + x;

});

// I'm not sure how the console.log problem can be fixed. The ESLint documentation
// (http://eslint.org/docs/rules/no-console)
// seems to say its just not allowed which makes sense to me since it should only be used for debugging.

//console.log(newArray);

