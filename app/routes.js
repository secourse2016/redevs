
var mongo   = require('./db');
var moment  = require('moment');
var flights = require('./flights.js');
var jwt = require("jsonwebtoken");
var path    = require('path');
var http = require('http');
var booking = require('./booking.js');
var async = require('async');
var request = require('request');


module.exports = function(app,mongo) {

  app.all('*', function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

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

  app.get('api/dummy', function(req,res){
    var dummy = {"data": "dummyData"};
    res.json(dummy);
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
  app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class/:seats', function(req, res) {


    flights.getFlightsFromDB(function(err,result){
      if(err)
      return err;
      else {
        var originDate = req.param('departingDate');
        var destinationDate = req.param('returningDate');
        var classs = req.param('class');
        var seats=req.param("seats");
        var origin = req.param('origin');
        var destination = req.param('destination');
        var getFlightswithDates = flights.getFlightsWithDates(result, originDate, classs,seats,destinationDate);
        var getFlightswithAirports = flights.getFlightsWithAirports(getFlightswithDates, origin, destination);
        res.send(getFlightswithAirports);
      }


    });
  });

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


    });



  });

  ///API BY-ACCESS EL SERVERS EL TANYA W BY-ACCESSNA
  //SINGLE WAY TRIP

  app.get('/api/flights/searchAirlines/:origin/:destination/:date/:class/:seats',function(req,res2) {

    var origin=req.param('origin');
    var destination=req.param('destination');
    var date=req.param('date');
    var classs=req.param('class');
    var seats=req.param('seats');
    console.log(origin);
    console.log(destination);
    console.log(date);
    console.log(classs);
    function httpGet(url, cb) {
      var options = {
        url: url,
        json: true,
        timeout:3000
      };
      var r= request(options,
        function (err, res, body) {

          if(err){

            console.log(err);
            cb(err,[]);


          }else{
            cb(err,body);

          }

        }
      );
    }


    const urls = [
      //air madgascar

      "http://52.27.150.19/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://ec2-52-38-101-89.us-west-2.compute.amazonaws.com/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://ec2-54-152-123-100.compute-1.amazonaws.com/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://54.187.208.145/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.58.46.74/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.32.109.147/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.36.169.206/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://ec2-52-91-94-227.compute-1.amazonaws.com/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.207.211.179/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://54.93.116.90/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://54.93.74.125/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.36.250.55/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
    //  "http://52.26.173.245/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://54.93.36.94/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://54.187.103.196/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://swiss-air.me/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.28.246.230/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.58.24.76/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://ec2-52-90-41-197.compute-1.amazonaws.com/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://54.191.202.17/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.25.15.124/api/flights/search/"+origin+'/'+destination+'/'+date+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk'



    ];
    async.map(urls, httpGet, function (err, res) {
      var x=flights.formatReturnOutgoing(res,0);
      console.log(x);
      res2.send(x);
    });
  });

  ///API BY-ACCESS EL SERVERS EL TANYA W BY-ACCESSNA
  //ROUND WAY TRIP

  app.get('/api/flights/searchAirlines/:origin/:destination/:departureDate/:returnDate/:class/:seats',function(req,res2) {

    var origin=req.param('origin');
    var destination=req.param('destination');
    var departureDate=req.param('departureDate');
    var returnDate=req.param('returnDate');
    var classs=req.param('class');
    var seats=req.param('seats');
    console.log(origin);
    console.log(destination);
    console.log(classs);
    function httpGet(url, cb) {
      var options = {
        url: url,
        json: true,
        timeout: 3000
      };
      var r= request(options,
        function (err, res, body) {

          if(err){
            cb(err,[]);


          }else{
            cb(err,body);
          }

        }
      );

    }

    const urls = [


      "http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',


      "http://ec2-52-38-101-89.us-west-2.compute.amazonaws.com/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',

      //hawaian


      //graphics iberia

      "http://ec2-54-152-123-100.compute-1.amazonaws.com/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://54.187.208.145/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.58.46.74/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.32.109.147/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.36.169.206/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',

      "http://52.207.211.179/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.27.150.19/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://54.93.116.90/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',

      "http://54.93.74.125/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.36.250.55/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      //"http://52.26.173.245/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://54.93.36.94/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://54.187.103.196/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://swiss-air.me/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.28.246.230/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.58.24.76/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://ec2-52-91-94-227.compute-1.amazonaws.com/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://54.191.202.17/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://ec2-52-90-41-197.compute-1.amazonaws.com/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      "http://52.25.15.124/api/flights/search/"+origin+'/'+destination+'/'+departureDate+'/'+returnDate+'/'+classs+'/'+seats+'/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',


    ];
    async.map(urls, httpGet, function (err, res) {


      var x = flights.formatReturnOutgoing(res, 1);

      res2.send(x);

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

  app.post('/booking',function(req,res){
    var stripeToken = req.body.paymentToken;
    var flightClass = req.body.class;
    var cost = req.body.cost;
    var adults = booking.getAdults(req.body.passengerDetails);
    var children = booking.getChildren(req.body.passengerDetails);
    var flight = [];
    var outgoingFlightId = req.body.outgoingFlightId;
    var returnFlightId = req.body.returnFlightId;


    if(returnFlightId===undefined || returnFlightId===null){


      flights.getFlightByObjectId(require('mongodb').ObjectID(outgoingFlightId),flightClass,function(data){
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

      flights.getFlightByObjectId(require('mongodb').ObjectID(outgoingFlightId),flightClass,function(data){
        flight.push(data);
        flights.getFlightByObjectId(require('mongodb').ObjectID(returnFlightId),flightClass,function(data1){
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
  app.get('/stripe/pubkey', function(req, res){

    res.send('pk_test_lnXZPy220d1EMqYfHlOj1XOt');


  });













};
