var db = require('./db');
var moment = require('moment');
var flightsArray = [];
var flights = require('./flights.js');
var stripe =require('stripe')(process.env.STRIPESECRETKEY);


// defining the seed function then export
function seedFlights(flight, _origin, _destination, key, callback) {

  // loop until May 31 2016 starting deadline 18th of April
  var date = moment('2016-04-18T00:00:00+0200');
  for (var i = 0; i < 44; i++) {

    doc =
    {
      "flightNumber": flight.flightNumber,
      "aircraft": flight.aircraft,
      "capacity": flight.capacity,
      "duration": flight.duration,
      "origin": _origin,
      "destination": _destination,
      "firstClassSeats": 10,
      "businessClassSeats": 50,
      "economyClassSeats": 200,
      "firstClassCost": flight.firstClassCost,
      "businessClassCost": flight.businessClassCost,
      "economyClassCost": flight.economyClassCost,
      "firstClassSeatMap": [],
      "businessClassSeatMap": [],
      "economyClassSeatMap": []

    };

    //calculating departure time
    var depTime = moment(date).add(i, 'days');
    if (key === "outgoing") {
      depTime = moment(depTime).add(flight.departureTime, 'hour').toDate().getTime();
    }
    else {
      depTime = moment(depTime).add(flight.departureTime + 5, 'hour').toDate().getTime();
    }
    //setting the departure and arrival dates time accordingly
    doc.departureDateTime = depTime;
    doc.arrivalDateTime = moment(depTime).add(flight.duration, 'hours').toDate().getTime();


    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var counter = 1;
    for (var j = 0; j < letters.length; j++) {
      for (var k = 1; k < 11; k++) {
        seat = {"seatNumber": letters[j] + "" + k, "isReserved": "false"};
        if (counter < 11) //0-9 >> first class
        doc.firstClassSeatMap.push(seat);
        else if (counter >= 11 && counter < 61)
        doc.businessClassSeatMap.push(seat);
        else if (counter >= 61)
        doc.economyClassSeatMap.push(seat);

        counter++;
      }

    }

    //the temporary doc array
    flightsArray.push(doc);
    //FINALLY insert!!
    // mongo.db().collection('flights').insert(doc, function(err, data){
    //   if (err) callback(err,false);
    //   else callback(err,true);
    // });

  }

}
//khallast defining seedFlights()


function seed(cb) {

  var databaseInstance = db.db();
  var collection = databaseInstance.collection("flights");
  collection.find().count(function (err, count) {
    if (count === 0) {


      routes = [
        {
          'origin': 'BOM',
          'destination': 'DEL',
          'duration': 3,
          'capacity': 100,
          'aircraft': 'Airbus a318',
          'flightNumber': 'SE2804',
          'departureTime': 0,
          "firstClassCost": 12000,
          "businessClassCost": 9000,
          "economyClassCost": 2000
        },
        {
          'origin': 'CAI',
          'destination': 'JED',
          'duration': 3,
          'capacity': 100,
          'aircraft': 'Airbus a318',
          'flightNumber': 'SE2805',
          'departureTime': 1,
          "firstClassCost": 15000,
          "businessClassCost": 10000,
          "economyClassCost": 4000
        },
        {
          'origin': 'HKG',
          'destination': 'TPE',
          'duration': 3,
          'capacity': 100,
          'aircraft': 'Airbus a318',
          'flightNumber': 'SE2806',
          'departureTime': 2,
          "firstClassCost": 12000,
          "businessClassCost": 8000,
          "economyClassCost": 3000
        },
        {
          'origin': 'JNE',
          'destination': 'CPT',
          'duration': 3,
          'capacity': 100,
          'aircraft': 'Airbus a318',
          'flightNumber': 'SE2807',
          'departureTime': 3,
          "firstClassCost": 14000,
          "businessClassCost": 9000,
          "economyClassCost": 5000
        },
        {
          'origin': 'RUH',
          'destination': 'JED',
          'duration': 3,
          'capacity': 100,
          'aircraft': 'Airbus a318',
          'flightNumber': 'SE2808',
          'departureTime': 4,
          "firstClassCost": 16000,
          "businessClassCost": 10000,
          "economyClassCost": 7000
        },
        {
          'origin': 'LHR',
          'destination': 'JFK',
          'duration': 3,
          'capacity': 100,
          'aircraft': 'Airbus a318',
          'flightNumber': 'SE2809',
          'departureTime': 5,
          "firstClassCost": 19000,
          "businessClassCost": 14000,
          "economyClassCost": 9000
        },
        {
          'origin': 'LCF',
          'destination': 'LAX',
          'duration': 3,
          'capacity': 100,
          'aircraft': 'Airbus a318',
          'flightNumber': 'SE2810',
          'departureTime': 6,
          "firstClassCost": 9000,
          "businessClassCost": 6000,
          "economyClassCost": 3000
        },
        {
          'origin': 'LAX',
          'destination': 'SFO',
          'duration': 3,
          'capacity': 100,
          'aircraft': 'Airbus a318',
          'flightNumber': 'SE2811',
          'departureTime': 7,
          "firstClassCost": 13000,
          "businessClassCost": 9000,
          "economyClassCost": 5000
        },
        {
          'origin': 'FRA',
          'destination': 'TXL',
          'duration': 3,
          'capacity': 100,
          'aircraft': 'Airbus a318',
          'flightNumber': 'SE2812',
          'departureTime': 8,
          "firstClassCost": 9000,
          "businessClassCost": 6000,
          "economyClassCost": 4000
        },
        {
          'origin': 'FCO',
          'destination': 'LIN',
          'duration': 3,
          'capacity': 100,
          'aircraft': 'Airbus a318',
          'flightNumber': 'SE2813',
          'departureTime': 9,
          "firstClassCost": 8000,
          "businessClassCost": 5000,
          "economyClassCost": 3000
        }
      ];


      //insert outgoing flights
      for (var i = 0; i < routes.length; i++) {
        var route1 = routes[i];
        seedFlights(route1, route1.origin, route1.destination, "outgoing", cb);

      }

      // insert returning flights
      for (var x = 0; x < routes.length; x++) {
        var route2 = routes[x];
        seedFlights(route2, route2.destination, route2.origin, "returning", cb);
      }

      db.db().collection('flights').insert(flightsArray, function (err, data) {
        if (err) cb(err, false);
        else cb(err, true);
      });

      // mongo.db().collection('flights').insert(doc, function(err, data){
      //   if (err) callback(err,false);
      //   else callback(err,true);
      // });

    }

    else {
      cb(err, false);
    }

  });
}


//gets all flights from DB do not forget cb
function getFlightsFromDB(cb) {
  db.db().collection('flights').find({}).toArray(cb);
}


//Search for flights in the array with minSeats<=classSeats


//getFlights within a certain date
//if 3 arguments return 2 way trip
//if 2 arguments return 1 way trip

function getFlightsWithDates(array, originDate, classs, seats, destinationDate) {
  var count = 0;
  //console.log(classs);
  var res = {
    "outgoingFlights": []
  };

  var resRT = {
    "outgoingFlights": [],
    "returnFlights": []
  };
  //console.log(array.length);

  for (var n = 0; n < array.length; n++) {
    var flight = array[n];
    var flightNumber = flight.flightNumber;
    var objectID = flight._id;
    var aircraft = flight.aircraft;
    var departureDateTime = flight.departureDateTime;
    var arrivalDateTime = flight.arrivalDateTime;
    var origin = flight.origin;
    var destination = flight.destination;
    var firstClassSeats = flight.firstClassSeats;
    var businessClassSeats = flight.businessClassSeats;
    var economyClassSeats = flight.economyClassSeats;
    var firstClassCost = flight.firstClassCost;
    var businessClassCost = flight.businessClassCost;
    var economyClassCost = flight.economyClassCost;
    aircraft = aircraft.split(" ");
    var aircraftType = aircraft[0];
    var aircraftModel = aircraft[1];

    if (arguments.length === 4) {
      //console.log(array.length);
      //console.log(n);
      //console.log(classs);
      //console.log((moment(flight.departureDateTime).format('YYYY-MM-DD')));
      //console.log(moment(parseInt(originDate)).format('YYYY-MM-DD'));

      if (moment(flight.departureDateTime).format('YYYY-MM-DD') === moment(parseInt(originDate)).format('YYYY-MM-DD')) {

        //console.log('found date');

        if ((classs === "economy" ) && flight.economyClassSeats >= seats) {

          //console.log("hena");

          res.outgoingFlights.push({
            "flightId": objectID,
            "flightNumber": flightNumber,
            "aircraftType": aircraftType,
            "aircraftModel": aircraftModel,
            "departureDateTime": departureDateTime,
            "arrivalDateTime": arrivalDateTime,
            "origin": origin,
            "destination": destination,
            "cost": economyClassCost,
            "currency": "USD",
            "class": "economy",
            "Airline": "Delta Airlines"

          });
        } else {

          if ((classs === "business") && flight.businessClassSeats >= seats) {
            res.outgoingFlights.push({
              "flightId": objectID,
              "flightNumber": flightNumber,
              "aircraftType": aircraftType,
              "aircraftModel": aircraftModel,
              "departureDateTime": departureDateTime,
              "arrivalDateTime": arrivalDateTime,
              "origin": origin,
              "destination": destination,
              "cost": businessClassCost,
              "currency": "USD",
              "class": "business",
              "Airline": "Delta Airlines"



            });

          } else {
            if ((classs === "FirstClass") && flight.firstClassSeats >= seats) {
              res.outgoingFlights.push({
                "flightId": objectID,
                "flightNumber": flightNumber,
                "aircraftType": aircraftType,
                "aircraftModel": aircraftModel,
                "departureDateTime": departureDateTime,
                "arrivalDateTime": arrivalDateTime,
                "origin": origin,
                "destination": destination,
                "cost": firstClassCost,
                "currency": "USD",
                "class": "first class",
                "Airline": "Delta Airlines"

              });
            }
          }
        }
      }

    }
    if (arguments.length === 5) {


      if (moment(flight.departureDateTime).format('YYYY-MM-DD') === moment(parseInt(originDate)).format('YYYY-MM-DD')) {




        if ((classs === "economy" ) && flight.economyClassSeats >= seats) {

          resRT.outgoingFlights.push({
            "flightId": objectID,
            "flightNumber": flightNumber,
            "aircraftType": aircraftType,
            "aircraftModel": aircraftModel,
            "departureDateTime": departureDateTime,
            "arrivalDateTime": arrivalDateTime,
            "origin": origin,
            "destination": destination,
            "cost": economyClassCost,
            "currency": "USD",
            "class": "economy",
            "Airline": "Delta Airlines"

          });
        } else {

          if ((classs === "business") && flight.businessClassSeats >= seats) {
            resRT.outgoingFlights.push({
              "flightId": objectID,
              "flightNumber": flightNumber,
              "aircraftType": aircraftType,
              "aircraftModel": aircraftModel,
              "departureDateTime": departureDateTime,
              "arrivalDateTime": arrivalDateTime,
              "origin": origin,
              "destination": destination,
              "cost": businessClassCost,
              "currency": "USD",
              "class": "business",
              "Airline": "Delta Airlines"


            });
          } else {
            if ((classs === "FirstClass") && flight.firstClassSeats >= seats) {
              resRT.outgoingFlights.push({
                "flightId": objectID,
                "flightNumber": flightNumber,
                "aircraftType": aircraftType,
                "aircraftModel": aircraftModel,
                "departureDateTime": departureDateTime,
                "arrivalDateTime": arrivalDateTime,
                "origin": origin,
                "destination": destination,
                "cost": firstClassCost,
                "currency": "USD",
                "class": "first class",
                "Airline": "Delta Airlines"

              });
            }
          }
        }



      }
        if (moment(flight.departureDateTime).format('YYYY-MM-DD') === moment(parseInt(destinationDate)).format('YYYY-MM-DD')) {

          if ((classs === "economy" ) && flight.economyClassSeats >= seats) {


            resRT.returnFlights.push({
              "flightId": objectID,
              "flightNumber": flightNumber,
              "aircraftType": aircraftType,
              "aircraftModel": aircraftModel,
              "departureDateTime": departureDateTime,
              "arrivalDateTime": arrivalDateTime,
              "origin": origin,
              "destination": destination,
              "cost": economyClassCost,
              "currency": "USD",
              "class": "economy",
              "Airline": "Delta Airlines"


            });
          } else {
            if ((classs === "business") && flight.businessClassSeats >= seats) {
              resRT.returnFlights.push({
                "flightId": objectID,
                "flightNumber": flightNumber,
                "aircraftType": aircraftType,
                "aircraftModel": aircraftModel,
                "departureDateTime": departureDateTime,
                "arrivalDateTime": arrivalDateTime,
                "origin": origin,
                "destination": destination,
                "cost": businessClassCost,
                "currency": "USD",
                "class": "business",
                "Airline": "Delta Airlines"

              });

            } else {
              if ((classs === "FirstClass") && flight.firstClassSeats >= seats) {
                resRT.returnFlights.push({
                  "flightId": objectID,
                  "flightNumber": flightNumber,
                  "aircraftType": aircraftType,
                  "aircraftModel": aircraftModel,
                  "departureDateTime": departureDateTime,
                  "arrivalDateTime": arrivalDateTime,
                  "origin": origin,
                  "destination": destination,
                  "cost": firstClassCost,
                  "currency": "USD",
                  "class": "first class",
                  "Airline": "Delta Airlines"

                });

              }


            }
          }


        }
      }
    }



  //console.log(res);
  if (arguments.length === 5) {
    return resRT;

  } else {

    return res;
  }
}


//getFlight with a certain route


function getFlightsWithAirports(input, originAirport, destinationAirport) {


  var res = {
    "outgoingFlights": []
  };

  var resRT = {
    "outgoingFlights": [],
    "returnFlights": []
  };

  if (Object.keys(input).length === 1) {

    for (var i = 0; i < input.outgoingFlights.length; i++) {

      var flight = input.outgoingFlights[i];

      if (flight.origin === originAirport && flight.destination === destinationAirport)
      res.outgoingFlights.push(flight);
    }

    return res;

  }


  if (Object.keys(input).length === 2) {



    for (i = 0; i < input.outgoingFlights.length; i++) {
      var outFlight = input.outgoingFlights[i];
      if (outFlight.origin === originAirport && outFlight.destination === destinationAirport)
      resRT.outgoingFlights.push(outFlight);

    }
    for (var j = 0; j < input.returnFlights.length; j++) {
      var returnFlight = input.returnFlights[j];
      if (returnFlight.origin === destinationAirport && returnFlight.destination === originAirport) {
        resRT.returnFlights.push(returnFlight);
      }

    }
    return resRT;

  }

}

function getFlightByID(flightNumber, departureDateTime, cb) {

  var departureDateINT = parseInt(departureDateTime);
  db.db().collection('flights').find(
    {
      "flightNumber": flightNumber,
      "departureDateTime": departureDateINT
    }
  ).toArray(cb);

}
function checkSeats(array, minSeats, classs) {

  var res = [];

  for (var i = 0; i < array.length; i++) {
    var flight = array[i];

    if (classs === "economy") {
      var economyClassSeats = flight.economyClassSeats;


      if (economyClassSeats >= minSeats) {
        res.push(flight);
      }



    } else if (classs === "business") {
      var businessClassSeats = flight.businessClassSeats;


      if (businessClassSeats >= minSeats) {
        res.push(flight);
      }

    } else if (classs === "FirstClass") {
      var firstClassSeats = flight.firstClassSeats;

      if (firstClassSeats >= minSeats) {
        res.push(flight);
      }

    }

  }
  return res;
}


function getTicketsFromDB(cb) {
  //return all tickets/ all reservations y3ni
  db.db().collection('tickets').find({}).toArray(cb);
}
function reservationSearch(resNum, cb) {
  //return reservation based on the ResNumber passed
  //mmkn akhaliha teraga3li eli ana 3ayzah ml db 3ala tool w khalas as-hal
  //parse el awl
  var resNumInt = parseInt(resNum);
  //console.log(resNumInt);

  //.toArray() returns an array that contains all the documents from a cursor
  db.db().collection('tickets').find(
    {
      reservationCode: resNumInt
    }
  ).toArray(cb);


}


function updateFlights(db, flightNumber, departureDateTime, economyClassSeatMap, businessClassSeatMap, firstClassSeatMap,
  economyClassSeats,businessClassSeats,firstClassSeats, callback) {

    db.db().collection('flights').updateOne(
      {
        "flightNumber": flightNumber,
        "departureDateTime": departureDateTime
      },
      {
        $set: {
          "economyClassSeatMap": economyClassSeatMap,
          "businessClassSeatMap": businessClassSeatMap,
          "firstClassSeatMap": firstClassSeatMap,
          "economyClassSeats": economyClassSeats,
          "firstClassSeats": firstClassSeats,
          "businessClassSeats":businessClassSeats


        }

      }, function (err, results) {

        callback();
      });

    }

    function formatReturnOutgoing(flights,isRoundTrip){
      var i=0;
      var j=0;
      var res = {
        "outgoingFlights": []
      };

      var resRT = {
        "outgoingFlights": [],
        "returnFlights": []
      };
      if(isRoundTrip===0){

        for (i=0;i<flights.length;i++){
          for(j=0;j<flights[i].outgoingFlights.length;j++) {
            if(flights[i].outgoingFlights[j]!=null) {
              res.outgoingFlights.push(flights[i].outgoingFlights[j]);
            }
          }
        }
        return res;

      }

      if(isRoundTrip===1){

        for (i=0;i<flights.length;i++){


          for(j=0;j<flights[i].outgoingFlights.length;j++) {
            if(flights[i].outgoingFlights[j]!=null){
            resRT.outgoingFlights.push(flights[i].outgoingFlights[j]);
            }
          }
          for(j=0;j<flights[i].returnFlights.length;j++) {
            if(flights[i].returnFlights[j]!=null) {
              resRT.returnFlights.push(flights[i].returnFlights[j]);
            }
          }
        }
        return resRT;

      }




    }


    function reserveRoundTripTicket(classs, flights, creditCardNumber, adults, children,token, cb) {
      var time = moment().unix();
      getFlightByID(flights[0].flightNumber, flights[0].departureDateTime, function (err, flight1) {
        getFlightByID(flights[1].flightNumber, flights[1].departureDateTime, function (err, flight2) {
          if (classs === "economy") {
            var charge = stripe.charges.create({
              amount:(flights[0].cost*adults.length + flights[0].cost*children.length*0.5)*100+
              (flights[1].cost*adults.length + flights[1].cost*children.length*0.5)*100,
              currency:"usd",
              source:token,
              description:"oneWayEconomy"
            },function(err,charge){
              if (err ){
                console.log(err);
              }else{
                for (var i = 0; i < adults.length; i++) {

                  for (var j = 0; j < flight1[0].economyClassSeatMap.length; j++) { //economyclassSeatmap is supposedly the name of the seatmap for economy rabena yostor
                    if (flight1[0].economyClassSeatMap[j].isReserved === "false") {
                      adults[i].outgoingSeatNumber = flight1[0].economyClassSeatMap[j].seatNumber;
                      flight1[0].economyClassSeatMap[j].isReserved = "true";
                      break;
                    }
                  }
                }
                for (i = 0; i < children.length; i++) {
                  for (j = 0; j < flight1[0].economyClassSeatMap.length; j++) {
                    if (flight1[0].economyClassSeatMap[j].isReserved === "false") {
                      children[i].outgoingSeatNumber = flight1[0].economyClassSeatMap[j].seatNumber;
                      flight1[0].economyClassSeatMap[j].isReserved = "true";
                      break;
                    }
                  }
                }
                for (i = 0; i < adults.length; i++) {
                  for (j = 0; j < flight2[0].economyClassSeatMap.length; j++) {
                    if (flight2[0].economyClassSeatMap[j].isReserved === "false") {
                      adults[i].ReturnSeatNumber = flight2[0].economyClassSeatMap[j].seatNumber;
                      flight2[0].economyClassSeatMap[j].isReserved = "true";
                      break;
                    }
                  }
                }
                for (i = 0; i < children.length; i++) {
                  for (j = 0; j < flight2[0].economyClassSeatMap.length; j++) {
                    if (flight2[0].economyClassSeatMap[j].isReserved === "false") {
                      children[i].ReturnSeatNumber = flight2[0].economyClassSeatMap[j].seatNumber;
                      flight2[0].economyClassSeatMap[j].isReserved = "true";
                      break;
                    }
                  }
                }
                flight1[0].economyClassSeats= flight1[0].economyClassSeats-adults.length - children.length
                flight2[0].economyClassSeats= flight2[0].economyClassSeats-adults.length - children.length
                db.db().collection('tickets').insertOne({

                  "reservationCode": time,
                  "numberOfAdults": adults.length,
                  "adults": adults,
                  "numberOfChildren": children.length,
                  "children": children,
                  "flights": [flight1[0], flight2[0]],
                  "creditCardNumber": creditCardNumber

                }, function (err, result) {

                  console.log("Reservation done");
                  updateFlights(db, flight1[0].flightNumber, flight1[0].departureDateTime, flight1[0].economyClassSeatMap, flight1[0].businessClassSeatMap,
                    flight1[0].firstClassSeatMap, flight1[0].economyClassSeats, flight1[0].businessClassSeats, flight1[0].firstClassSeats, function () {
                      updateFlights(db, flight2[0].flightNumber, flight2[0].departureDateTime, flight2[0].economyClassSeatMap,
                        flight2[0].businessClassSeatMap, flight2[0].firstClassSeatMap,
                        flight2[0].economyClassSeats, flight2[0].businessClassSeats, flight2[0].firstClassSeats,function () {
                          console.log("FLights Updated");
                        });
                      });
                      cb(time);
                    });
                  }


                });


              }
              else {
                if (classs === "business") {
                  var charge = stripe.charges.create({
                    amount:(flights[0].cost*adults.length + flights[0].cost*children.length*0.5)*100+
                    (flights[1].cost*adults.length + flights[1].cost*children.length*0.5)*100,
                    currency:"usd",
                    source:token,
                    description:"oneWayEconomy"
                  },function(err,charge){
                    if (err ){
                      console.log(err);
                    }else{
                      for (i = 0; i < adults.length; i++) {

                        for (j = 0; j < flight1[0].businessClassSeatMap.length; j++) { //business seat map is called that way, this is for checking for business class
                          if (flight1[0].businessClassSeatMap[j].isReserved === "false") {
                            adults[i].outgoingSeatNumber = flight1[0].businessClassSeatMap[j].seatNumber;
                            flight1[0].businessClassSeatMap[j].isReserved = "true";
                            break;
                          }
                        }
                      }
                      for (i = 0; i < children.length; i++) {
                        for (j = 0; j < flight1[0].businessClassSeatMap.length; j++) {
                          if (flight1[0].businessClassSeatMap[j].isReserved === "false") {
                            children[i].outgoingSeatNumber = flight1[0].businessClassSeatMap[j].seatNumber;
                            flight1[0].businessClassSeatMap[j].isReserved = "true";
                            break;
                          }
                        }
                      }
                      for (i = 0; i < adults.length; i++) {
                        for (j = 0; j < flight2[0].businessClassSeatMap.length; j++) {
                          if (flight2[0].businessClassSeatMap[j].isReserved === "false") {
                            adults[i].ReturnSeatNumber = flight2[0].businessClassSeatMap[j].seatNumber;
                            flight2[0].businessClassSeatMap[j].isReserved = "true";
                            break;
                          }
                        }
                      }
                      for (i = 0; i < children.length; i++) {
                        for (j = 0; j < flight2[0].businessClassSeatMap.length; j++) {
                          if (flight2[0].businessClassSeatMap[j].isReserved === "false") {
                            children[i].ReturnSeatNumber = flight2[0].businessClassSeatMap[j].seatNumber;
                            flight2[0].businessClassSeatMap[j].isReserved = "true";
                            break;
                          }
                        }

                      }
                      flight1[0].businessClassSeats= flight1[0].businessClassSeats-adults.length - children.length
                      flight2[0].businessClassSeats= flight2[0].businessClassSeats-adults.length - children.length
                      db.db().collection('tickets').insertOne({
                        "reservationCode":time,
                        "numberOfAdults": adults.length,
                        "adults": adults,
                        "numberOfChildren": children.length,
                        "children": children,
                        "flights": [flight1[0], flight2[0]],
                        "creditCardNumber": creditCardNumber
                      }, function (err, result) {

                        console.log("Reservation done");
                        updateFlights(db, flight1[0].flightNumber, flight1[0].departureDateTime, flight1[0].economyClassSeatMap, flight1[0].businessClassSeatMap,
                          flight1[0].firstClassSeatMap,
                          flight1[0].economyClassSeats, flight1[0].businessClassSeats, flight1[0].firstClassSeats, function () {
                            updateFlights(db, flight2[0].flightNumber, flight2[0].departureDateTime, flight2[0].economyClassSeatMap,
                              flight2[0].businessClassSeatMap, flight2[0].firstClassSeatMap,
                              flight2[0].economyClassSeats, flight2[0].businessClassSeats, flight2[0].firstClassSeats,function () {
                                console.log("FLights Updated");
                              });
                            });
                            cb(time);
                          });

                        }
                      });







                    }
                    else {
                      if (classs === "FirstClass") {
                        var charge = stripe.charges.create({
                          amount:(flights[0].cost*adults.length + flights[0].cost*children.length*0.5)*100+
                          (flights[1].cost*adults.length + flights[1].cost*children.length*0.5)*100,
                          currency:"usd",
                          source:token,
                          description:"oneWayEconomy"
                        },function(err,charge){
                          if (err ){
                            console.log(err);
                          }else{
                            for (i = 0; i < adults.length; i++) {
                              for (j = 0; j < flight1[0].firstClassSeatMap.length; j++) { //first class reservation same as above
                                if (flight1[0].firstClassSeatMap[j].isReserved === "false") {
                                  adults[i].outgoingSeatNumber = flight1[0].firstClassSeatMap[j].seatNumber;
                                  flight1[0].firstClassSeatMap[j].isReserved = "true";
                                  break;
                                }
                              }
                            }
                            for (i = 0; i < children.length; i++) {
                              for (j = 0; j < flight1[0].firstClassSeatMap.length; j++) {
                                if (flight1[0].firstClassSeatMap[j].isReserved === "false") {
                                  children[i].outgoingSeatNumber = flight1[0].firstClassSeatMap[j].seatNumber;
                                  flight1[0].firstClassSeatMap[j].isReserved = "true";
                                  break;
                                }
                              }
                            }
                            for (i = 0; i < adults.length; i++) {
                              for (j = 0; j < flight2[0].firstClassSeatMap.length; j++) {
                                if (flight2[0].firstClassSeatMap[j].isReserved === "false") {
                                  adults[i].ReturnSeatNumber = flight2[0].firstClassSeatMap[j].seatNumber;
                                  flight2[0].firstClassSeatMap[j].isReserved = "true";
                                  break;
                                }
                              }
                            }
                            for (i = 0; i < children.length; i++) {
                              for (j = 0; j < flight2[0].firstClassSeatMap.length; j++) {
                                if (flight2[0].firstClassSeatMap[j].isReserved === "false") {
                                  children[i].ReturnSeatNumber = flight2[0].firstClassSeatMap[j].seatNumber;
                                  flight2[0].firstClassSeatMap[j].isReserved = "true";
                                  break;
                                }
                              }
                            }
                            flight1[0].firstClassSeats= flight1[0].firstClassSeats-adults.length - children.length
                            flight2[0].firstClassSeats= flight2[0].firstClassSeats-adults.length - children.length
                            db.db().collection('tickets').insertOne({
                              "reservationCode": time,
                              "numberOfAdults": adults.length,
                              "adults": adults,
                              "numberOfChildren": children.length,
                              "children": children,
                              "flights": [flight1[0], flight2[0]],
                              "creditCardNumber": creditCardNumber
                            }, function (err, result) {

                              console.log("Reservation done");
                              updateFlights(db, flight1[0].flightNumber, flight1[0].departureDateTime, flight1[0].economyClassSeatMap, flight1[0].businessClassSeatMap,
                                flight1[0].firstClassSeatMap,
                                flight1[0].economyClassSeats, flight1[0].businessClassSeats, flight1[0].firstClassSeats, function () {
                                  updateFlights(db, flight2[0].flightNumber, flight2[0].departureDateTime, flight2[0].economyClassSeatMap,
                                    flight2[0].businessClassSeatMap, flight2[0].firstClassSeatMap,
                                    flight2[0].economyClassSeats, flight2[0].businessClassSeats, flight2[0].firstClassSeats,function () {
                                      console.log("FLights Updated");
                                    });
                                  });
                                  cb(time);
                                });
                              }
                            });

                          }
                        }
                      }
                    });
                  });


                }

                function reserveOneWayTicket(classs, flights, creditCardNumber, adults, children,token, cb) {
                  var time = moment().unix();
                  getFlightByID(flights[0].flightNumber, flights[0].departureDateTime, function (err, flight1) { // same should be done as above regarding the classes
                    if (classs === "economy") {
                        console.log((flights[0].cost*adults.length + flights[0].cost*children.length*0.5)*100);
                        console.log(adults);
                      var charge = stripe.charges.create({

                        amount:(flights[0].cost*adults.length + flights[0].cost*children.length*0.5)*100,
                        currency:"usd",
                        source:token,
                        description:"oneWayEconomy"
                      },function(err,charge){
                        if (err ){
                          console.log(err);
                        }else{

                          for (i = 0; i < adults.length; i++) {
                            for (j = 0; j < flight1[0].economyClassSeatMap.length; j++) {
                              if (flight1[0].economyClassSeatMap[j].isReserved === "false") {
                                adults[i].outgoingSeatNumber = flight1[0].economyClassSeatMap[j].seatNumber;
                                flight1[0].economyClassSeatMap[j].isReserved = "true";
                                break;
                              }
                            }
                          }
                          for (i = 0; i < children.length; i++) {
                            for (j = 0; j < flight1[0].economyClassSeatMap.length; j++) {
                              if (flight1[0].economyClassSeatMap[j].isReserved === "false") {
                                children[i].outgoingSeatNumber = flight1[0].economyClassSeatMap[j].seatNumber;
                                flight1[0].economyClassSeatMap[j].isReserved = "true";
                                break;
                              }
                            }
                          }

                          flight1[0].economyClassSeats= flight1[0].economyClassSeats-adults.length - children.length
                          db.db().collection('tickets').insertOne({
                            "reservationCode": time,
                            "numberOfAdults": adults.length,
                            "adults": adults,
                            "numberOfChildren": children.length,
                            "children": children,
                            "flights": [flight1[0]],
                            "creditCardNumber": creditCardNumber
                          }, function (err, result) {

                            console.log("Reservation done");
                            updateFlights(db, flight1[0].flightNumber, flight1[0].departureDateTime, flight1[0].economyClassSeatMap,
                              flight1[0].businessClassSeatMap, flight1[0].firstClassSeatMap,
                              flight1[0].economyClassSeats,
                              flight1[0].businessClassSeats, flight1[0].firstClassSeats,
                              function () {

                                console.log("FLights Updated");

                              });
                              cb(time);
                            });
                          }
                        });














                      }
                      else {
                        if (classs === "business") {

                          var charge = stripe.charges.create({
                            amount:(flights[0].cost*adults.length + flights[0].cost*children.length*0.5)*100,
                            currency:"usd",
                            source:token,
                            description:"oneWayEconomy"
                          },function(err,charge){
                            if (err ){
                              console.log(err);
                            }else{

                              for (i = 0; i < adults.length; i++) {
                                for (j = 0; j < flight1[0].businessClassSeatMap.length; j++) {
                                  if (flight1[0].businessClassSeatMap[j].isReserved === "false") {
                                    adults[i].outgoingSeatNumber = flight1[0].businessClassSeatMap[j].seatNumber;
                                    flight1[0].businessClassSeatMap[j].isReserved = "true";
                                    break;
                                  }
                                }
                              }
                              for (i = 0; i < children.length; i++) {
                                for (j = 0; j < flight1[0].businessClassSeatMap.length; j++) {
                                  if (flight1[0].businessClassSeatMap[j].isReserved === "false") {
                                    children[i].outgoingSeatNumber = flight1[0].businessClassSeatMap[j].seatNumber;
                                    flight1[0].businessClassSeatMap[j].isReserved = "true";
                                    break;
                                  }
                                }
                              }

                              flight1[0].businessClassSeats= flight1[0].businessClassSeats-adults.length - children.length
                              db.db().collection('tickets').insertOne({
                                "reservationCode":time,
                                "numberOfAdults": adults.length,
                                "adults": adults,
                                "numberOfChildren": children.length,
                                "children": children,
                                "flights": [flight1[0]],
                                "creditCardNumber": creditCardNumber
                              }, function (err, result) {

                                console.log("Reservation done");
                                updateFlights(db, flight1[0].flightNumber, flight1[0].departureDateTime, flight1[0].economyClassSeatMap,
                                  flight1[0].businessClassSeatMap, flight1[0].firstClassSeatMap,
                                  flight1[0].economyClassSeats,
                                  flight1[0].businessClassSeats, flight1[0].firstClassSeats,
                                  function () {

                                    console.log("FLights Updated");

                                  });
                                  cb(time);
                                });


                              }



                            });
                          }else{
                            var charge = stripe.charges.create({
                              amount:(flights[0].cost*adults.length + flights[0].cost*children.length*0.5)*100,
                              currency:"usd",
                              source:token,
                              description:"oneWayEconomy"
                            },function(err,charge){
                              if (err ){
                                console.log(err);
                              }else{
                                for (i = 0; i < adults.length; i++) {
                                  for (j = 0; j < flight1[0].firstClassSeatMap.length; j++) {
                                    if (flight1[0].firstClassSeatMap[j].isReserved === "false") {
                                      adults[i].outgoingSeatNumber = flight1[0].firstClassSeatMap[j].seatNumber;
                                      flight1[0].firstClassSeatMap[j].isReserved = "true";
                                      break;
                                    }
                                  }
                                }
                                for (i = 0; i < children.length; i++) {
                                  for (j = 0; j < flight1[0].firstClassSeatMap.length; j++) {
                                    if (flight1[0].firstClassSeatMap[j].isReserved === "false") {
                                      children[i].outgoingSeatNumber = flight1[0].firstClassSeatMap[j].seatNumber;
                                      flight1[0].firstClassSeatMap[j].isReserved = "true";
                                      break;
                                    }
                                  }
                                }

                                flight1[0].firstClassSeats= flight1[0].firstClassSeats-adults.length - children.length
                                db.db().collection('tickets').insertOne({
                                  "reservationCode": time,
                                  "numberOfAdults": adults.length,
                                  "adults": adults,
                                  "numberOfChildren": children.length,
                                  "children": children,
                                  "flights": [flight1[0]],
                                  "creditCardNumber": creditCardNumber
                                }, function (err, result) {

                                  console.log("Reservation done");
                                  updateFlights(db, flight1[0].flightNumber, flight1[0].departureDateTime, flight1[0].economyClassSeatMap,
                                    flight1[0].businessClassSeatMap, flight1[0].firstClassSeatMap,
                                    flight1[0].economyClassSeats,
                                    flight1[0].businessClassSeats, flight1[0].firstClassSeats,
                                    function () {

                                      console.log("FLights Updated");

                                    });
                                    cb(time);
                                  });
                                }
                              });
                            }
                          }
                        });
                      }








                      function getFlightByObjectId(id,classs,cb){
                        var collection  = db.db().collection('flights');

                        collection.findOne({_id:id}).then(function(doc){
                        var  result={
                          flightNumber:doc.flightNumber,
                          aircraftType:doc.aircraft,
                          aircraftModel:doc.aircraftModel,
                          departureDateTime:doc.departureDateTime,
                          arrivalDateTime:doc.arrivalDateTime,
                          origin:doc.origin,
                          destination:doc.destination,
                          currency:'usd',
                          class:classs,
                          Airline:'Delta'
                          }
                          if(classs='economy'){
                            result.cost=doc.economyClassCost;
                          }else if(classs='business'){
                            result.cost=doc.businessClassCost;
                          }





                          cb(result);
                        });
                      }

                      exports.getFlightByObjectId=getFlightByObjectId;
                      exports.getTicketsFromDB = getTicketsFromDB;
                      exports.reservationSearch = reservationSearch;
                      exports.reserveRoundTripTicket = reserveRoundTripTicket;
                      exports.reserveOneWayTicket = reserveOneWayTicket;
                      exports.getFlightsFromDB = getFlightsFromDB;
                      exports.getFlightsWithAirports = getFlightsWithAirports;
                      exports.getFlightByID = getFlightByID;
                      exports.checkSeats = checkSeats;
                      exports.getFlightsWithDates = getFlightsWithDates;
                      exports.seed = seed;
                      exports.formatReturnOutgoing=formatReturnOutgoing;
