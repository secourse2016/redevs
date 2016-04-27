
<<<<<<< HEAD
    var mongo   = require('./db');
    var moment  = require('moment');
    var flights = require('./flights.js');
    var jwt = require("jsonwebtoken");
    var path    = require('path');
    var http = require('http');
=======
var mongo   = require('./db');
var moment  = require('moment');
var flights = require('./flights.js');
var jwt = require("jsonwebtoken");
var path    = require('path');
var booking = require('./booking.js');
>>>>>>> Booking

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



<<<<<<< HEAD
    //Round-Trip API
    app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class/:seats', function(req, res) {


            flights.getFlightsFromDB(function(err,result){
            if(err)
            return err;
        else {
                var originDate = req.param('departingDate');
                var destinationDate = req.param('returningDate');
                var classs = req.param('class');
                var seats=req.param("seats");
=======
  //Round-Trip API
  app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {


    flights.getFlightsFromDB(function(err,result){
      if(err)
      return err;
      else {
>>>>>>> Booking

        var originDate = req.param('departingDate');
        console.log(originDate);
        var destinationDate = req.param('returningDate');
        var classs = req.param('class');

        var origin = req.param('origin');
        var destination = req.param('destination');

<<<<<<< HEAD
                var getFlightswithDates = flights.getFlightsWithDates(result, originDate, classs,seats,destinationDate);
                var getFlightswithAirports = flights.getFlightsWithAirports(getFlightswithDates, origin, destination);
                res.send(getFlightswithAirports);
            }
=======
>>>>>>> Booking

        var getFlightswithDates = flights.getFlightsWithDates(result, originDate, classs,destinationDate);
        var getFlightswithAirports = flights.getFlightsWithAirports(getFlightswithDates, origin, destination);
        res.send(getFlightswithAirports);
      }

    });
<<<<<<< HEAD
    //SINGLE WAY API
    app.get('/api/flights/search/:origin/:destination/:departingDate/:class/:seats', function(req, res) {

            flights.getFlightsFromDB(function(err,result){
                if(err)
                return err;
                else {
                    var originDate = req.param('departingDate');
                    var classs = req.param('class');
                    var origin = req.param('origin');
                    var destination = req.param('destination');
                    var seats =req.param("seats");


                    var getFlightswithDates = flights.getFlightsWithDates(result, originDate, classs,seats);
                    var getFlightswithAirports = flights.getFlightsWithAirports(getFlightswithDates, origin, destination);
                    res.send(getFlightswithAirports);
                }
=======

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
>>>>>>> Booking


    });



  });

<<<<<<< HEAD
    ///API BY-ACCESS EL SERVERS EL TANYA W BY-ACCESSNA
    //Round Trip

    app.get('/api/flights/searchAirlines/:origin/:destination/:departingDate/:returningDate/:class/:seats',function(req,res){

        var airlines = [ '52.25.15.124','ec2-52-90-41-197.compute-1.amazonaws.com'];

        var departingDate = req.param('departingDate');
        var returningDate = req.param('returningDate');
        var classs = req.param('class');
        var seats=req.param("seats");

        var origin = req.param('origin');
        var destination = req.param('destination');

        var getOtherAirlines = function(cb, origin, destination, date, flightClass, i) {
            var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk';


            if(i < airlines.length){


                // Specify the options of the GET request
                var options = {
                    host: airlines[i],
                    path: '/api/flights/search/'+origin+'/'+destination+'/'+date+'/'+flightClass+'/'+seats+'?wt='+token,
                    headers : {'x-access-token' : token}
                };


                // Send the GET request to the current airline [i]
                http.get(options, function(res) {

                    var flightsData = "";
                    res.on('data',function(data){
                            flightsData += data;
                        })
                        .on('end',function(){

                            // Make sure that the returned data are in JSON format
                            var validJSON = true;
                            try{
                                flightsData = JSON.parse(flightsData);
                            }
                            catch(e)
                            {
                                validJSON = false;
                            }

                            // Get the flights of the next airlines, starting from i+1
                            getOtherAirlines(function(newFlights){

                                // Only concat JSON data that are in valid format
                                if(validJSON && flightsData.outgoingFlights)
                                    newFlights.outgoingFlights = newFlights.outgoingFlights.concat(flightsData.outgoingFlights);

                                // Backtrack and return the current list of flights to the previous call
                                cb(newFlights);

                            }, origin, destination, date, flightClass, i+1)



                        });
                }).on('error',function(e){

                    console.log('ERROR: '+e);

                    /**
                     * An error happened in the request to the current airline. So we will ignore the
                     current flightsData and proceed with our recursion to the next airline
                     */
                    getOtherAirlines(function(newFlights){

                        // Backtrack and return the current list of flights to the previous call
                        cb(newFlights);

                    }, origin, destination, date, flightClass, i+1)

                }).setTimeout(3000,function(){
                    /**
                     Adding this function to make sure that no airline takes forever to return data.
                     the abort() function below terminates the http request and executes  the
                     above .on('error') function
                     Now the maximum allowed time for each individual airline to return data is 3 seconds
                     You can modify this number according to your airline needs, but make sure it's not too large
                     or too small.
                     */
                    this.abort();
                });
            }
            else {
                // We reached the base case ==> (i = airlines.length) ==> No more airlines, return empty array
                cb({outgoingFlights:[]});
            }
        };






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

  app.post('/booking',function(req,res){
    var stripeToken = req.body.paymentToken;
    var flightClass = req.body.class;
    var cost = req.body.cost;
    var adults = booking.getAdults(req.body.passengerDetails);
    var children = booking.getChildren(req.body.passengerDetails);
    var flight = [];
    var outgoingFlightId = req.body.outgoingFlightId;
    var returnFlightId = req.body.returnFlightId;

    if(returnFlightId!=undefined){
      flights.getFlightByObjectId(outgoingFlightId,function(data){
        flight.push(data);
        flights.reserveOneWayTicket(flightClass,flight,0,adults,children,stripeToken,function(refNum){
          var object = {
            refNum:refNum
          };
          res.json(object);
        });
      });
    }
    else{
      flights.getFlightByObjectId(outgoingFlightId,function(data){
        flight.push(data);
        flights.getFlightByObjectId(returnFlightId,function(data1){
          flight.push(data1);
          flights.reserveRoundTripTicket(flightClass,flight,0,adults,children,stripeToken,function(refNum){
            var object = {
              refNum:refNum
            };
            res.json(object);
          });
        });
      });
    };











  });












};
