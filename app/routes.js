
    var mongo   = require('./db');
    var moment  = require('moment');
    var flights = require('./flights.js');
    var jwt = require("jsonwebtoken");
    var path    = require('path');

module.exports = function(app,mongo) {


    /* GET ALL STATES ENDPOINT */
    app.get('/api/data/codes', function (req, res) {
        var codes = require('../airports.json');
        res.json(codes);
    });
    /* RENDER MAIN PAGE */
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
        console.log(req.payload);
    });
    /* GET ALL Nationalities ENDPOINT */
    app.get('/api/data/nationalities', function (req, res) {
        var nationalities = require('../nationalities.json');
        res.json(nationalities);
    });


    /* MIDDLEWARE */
    app.use(function(req, res, next){

        var token = req.body.wt || req.query.wt || req.headers['x-access-token'];
        console.log("{ TOKEN } ===> ", token);
        var jwtSecret = process.env.JWTSECRET;

        try {
            var payload = jwt.verify(token, jwtSecret);
            req.payload = payload;
            next();
        }
        catch(err){
            console.log('ERROR: JWT Error reason: ' + err);
            res.status(403).sendFile(path.join(__dirname,'..' ,'public', '403.html'));
        }


    });



    //Round-Trip API
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


                var getFlightswithDates = flights.getFlightsWithDates(result, originDate, classs,destinationDate);
                var getFlightswithAirports = flights.getFlightsWithAirports(getFlightswithDates, origin, destination);
                res.send(getFlightswithAirports);
            }

        });

    });
    //SINGLE WAY API
    app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {

            flights.getFlightsFromDB(function(err,result){
                if(err)
                return err;
                else {
                    var originDate = req.param('departingDate');
                    var classs = req.param('class');
                    var origin = req.param('origin');
                    var destination = req.param('destination');


                    var getFlightswithDates = flights.getFlightsWithDates(result, originDate, classs);
                    var getFlightswithAirports = flights.getFlightsWithAirports(getFlightswithDates, origin, destination);
                    res.send(getFlightswithAirports);
                }


    });



});

//API BY ID
    app.get('/api/flights/search/:flightNumber/:departureDateTime', function(req, res){



        var flightNumber = req.param('flightNumber');
        var departureDateTime = req.param('departureDateTime');

            var flightsbyID = flights.getFlightByID(flightNumber, departureDateTime, function(err, result){

                    if (err)
                        return err;
                    res.send(result);

            });




           });





    app.get('/api/tickets', function (req, res, next) {
        flights.getTicketsFromDB(function (err, tickets) {
        if (err) return next(err);
        res.json({
          tickets: tickets
        });
    });
});

   app.get('/api/reservationSearch/:resNum', function(req, res) {
        //parse int

      var resNum = req.param('resNum');
        console.log(resNum);

        flights.reservationSearch(resNum,function (err, tickets) {
                if (err)
                  return err;


                console.log(tickets[0]);
               res.send(tickets[0]);
                  // res.json({
                  //   tickets: tickets
                  //   });


    });
    });

   app.post('/api/postReservation/',function(req,res){
    var tripType = req.body.tripType ;
    var flight = req.body.flights;
    var children = req.body.children;
    var adults = req.body.adults;
    var creditCardNumber = req.body.creditCardNumber;
    var classs = req.body.classs;
    var token = req.body.token;
    console.log(classs);
    console.log(tripType);

    if(tripType==='RoundTrip'){
      console.log(adults);
       flights.reserveRoundTripTicket(classs,flight,creditCardNumber,adults,children,token,function(time){
        var object = {
          "time":time
        }
        res.json(object);
      });
    }else{
      flights.reserveOneWayTicket(classs,flight,creditCardNumber,adults,children,token,function(time){
        var object = {
          "time":time
        }
        res.json(object);
      });
    }






  });


};
