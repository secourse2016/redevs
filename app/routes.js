
var mongo   = require('./db');
var moment  = require('moment');
/**
 * App routes:
 *
 *

 *
 */
<<<<<<< HEAD


 var flights = require('./flights.js');


=======
 var flights = require('./flights.js');
>>>>>>> jojo
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
        

            flights.getFlightsFromDB(function(err,result){
            if(err)
            return err;
        else {
                var originDate = req.param('departingDate');
                var destinationDate = req.param('returningDate');
                var classs = req.param('class');

                var origin = req.param('origin');
                var destination = req.param('destination');


                var getFlightswithDates = flights.getFlightsWithDates(result, originDate, destinationDate, classs);
                var getFlightswithAirports = flights.getFlightsWithAirports(getFlightswithDates, origin, destination);
                var finalArrayToSend = flights.checkSeats(getFlightswithAirports, 1, classs);
                res.send(finalArrayToSend);
            }

        });

    });
    //SINGLE WAY API
    app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {

var allFlights=flights.getFlightsFromDB(function(err,result){
            var originDate=req.param('departingDate');
            var classs=req.param('class');

            var origin=req.param('origin');
            var destination=req.param('destination');


            var getFlightswithDates=flights. getFlightsWithDates(result,originDate,classs);
            var getFlightswithAirports=flights.getFlightsWithAirports(getFlightswithDates,origin,destination);
            var finalArrayToSend=flights.checkSeats(getFlightswithAirports,1,classs);
            res.json (finalArrayToSend);


    });


<<<<<<< HEAD
});

//API BY ID
    app.get('/api/flights/search/:flightNumber/:departureDateTime', function(req, res){ 



        var flightNumber = req.param('flightNumber');
        var departureDateTime = req.param('departureDateTime');

            var flightsbyID = flights.getFlightsByID(flightNumber, departureDateTime, function(err, result){

                    if (err)
                        return err;
                    res.send(result);

            });




           });
 



=======
    app.get('/api/tickets', function (req, res, next) {
        flights.getTicketsFromDB(function (err, tickets) {
        if (err) return next(err);
        res.json({
          tickets: tickets
        });
    });
});

   app.get('/api/reservationSearch/:resNum', function(req, res) {
        flights.reservationSearch(resNum,function (err, tickets) {
        if (err) return next(err);
        res.json({
          tickets: tickets
        });
    });
    });

   //
   app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {

    });


};
>>>>>>> jojo
