
var mongo   = require('./db');
var moment  = require('moment');
/**
 * App routes:
 */
module.exports = function(app,mongo) {


    /* GET ALL STATES ENDPOINT */
    app.get('/api/data/codes', function(req, res) {
        var codes =  require('../airports.json');
        res.json( codes );
    });
    /* RENDER MAIN PAGE */
    app.get('/', function (req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });

    app.get('/api/data/nationalities', function(req, res){
    	var nationalities = require('../nationalities.json');
    	res.json(nationalities);
    });


    /* Middleware */
    app.use(function(req, res, next) {
    });
    //Round-Trip API
    //call
    app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {

    });
    //SINGLE WAY API
    app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {

    });


};
