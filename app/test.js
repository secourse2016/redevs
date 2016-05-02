var http = require('http');
var flights = require ('./flights.js');
var db = require('./db');
var request = require('request');
var stripe = require("stripe")("sk_test_08g8FYyGt9r1Lm8lidL1aUeY");

db.connect(function(err){

  stripe.tokens.create({
    card: {
      "number": '4242424242424242',
      "exp_month": 12,
      "exp_year": 2017,
      "cvc": '123'
    }
  }, function(err, token) {

      console.log(token);

    request({
      url: 'http://localhost:3000/booking/?wt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk',
      method: 'POST',

      json:{
        'passengerDetails':[{
            'firstName': 'zaher', // (required)
            'lastName': 'ahmed',  // (required)
            'passportNum': 123, // (required)
            // (optional)
            'dateOfBirth': 641595600000,  // (required)
            'nationality': 'Egypt', // (optional)
            'email': 'zzz' // (optional)
        }],
        'class': 'economy',  // (required)
        'cost': 4000, // (required)
        'outgoingFlightId': '5721589903c2ce9516061961', // mongodb _id => 5NuiSNQdNcZwau92M (required)
        'paymentToken': token.id // stripe generated token (required)
    }
      }
    , function(error,response,body){
      if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }

  });


});
});
