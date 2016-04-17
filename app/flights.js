
var db = require('./db.js');

//gets all flights from DB do not forget cb
function getFlightsFromDB(cb){
    db.db().collection('flights').find({}).toArray(cb);
    }


//Search for flights in the array with minSeats<=classSeats


/*function checkSeats (array, minSeats,classs) {
    
    var res = {
        "flights": []
    };
    
    var allFlights = getFlightsFromDB();
    res = db.db().collection().findOne(
   {
      [
            { 'tickets.flights.capacity': { $lt: minSeats }}
            
          ]
   }
);
}*/


function checkSeats (array, minSeats,classs) {
    
   var res = [];

   for(var i = 0; i<array.length; i++){
   var flight = array.getJSONObject(i);
   

   
      if (classs === "Economy Class"){
        var economyClassSeats = flight.economyClassSeats;
        
            if(economyClassSeats>=minSeats){
                res.push(flight);   
            }
         
          
      } else if (classs === "Business Class"){
            var businessClassSeats = flight.businessClassSeats;
            
            if(businessClassSeats>=minSeats){
                res.push(flight);
            }
         
      } else if (classs === "First Class") {
            var firstClassSeats = flight.firstClassSeats;

            if(firstClassSeats>=minSeats){
                res.push(flight);
            }
          
      }

   }
   return res;
}



//getFlights within a certain date
//if 3 arguments return 2 way trip
//if 2 arguments return 1 way trip
function getFlightsWithDates(array,originDate,destinationDate,classs) {

    var res = {
        "outgoingFlights": []
    };

    var resRT = {
        "outgoingFlights": [],
        "returnFlights": []
    };

    for (var n = 0; n < array.length; n++) {
        var flight = array.getJSONObject(n);
        var flightNumber = flight.flightNumber;
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
        if (arguments.length === 3) {

            if (departureDate === originDate) {


                if (classs === "Economy Class") {


                    res.outgoingFlights.push({
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

                    if (classs === "Business Class") {
                        res.outgoingFlights.push({
                            "flightNumber": flightNumber,
                            "aircraftType": aircraftType,
                            "aircraftModel": aircraftModel,
                            "departureDateTime":departureDateTime,
                            "arrivalDateTime": arrivalDateTime,
                            "origin": origin,
                            "destination": destination,
                            "cost": businessClassCost,
                            "currency": "USD",
                            "class": "business",
                            "Airline": "Delta Airlines"

                        });

                    } else {
                        if (classs === "First Class") {
                            res.outgoingFlights.push({
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


            return res;


        }
        if (arguments.length === 4) {
            if (departureDate === originDate) {


                if (classs === "Economy Class") {


                    resRT.outgoingFlights.push({
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

                    if (classs === "Business Class") {
                        resRT.outgoingFlights.push({
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
                        if (classs === "First Class") {
                            resRT.outgoingFlights.push({
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
            } else {
                if (destinationDate === departureDate) {

                    if (classs === "Economy Class") {


                        resRT.returnFlights.push({
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

                        if (classs === "Business Class") {
                            resRT.returnFlights.push({
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
                            if (classs === "First Class") {
                                resRT.returnFlights.push({
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
    }
    return resRT;
}


//getFlight with a certain route


function getFlightsWithAirports(input,originAirport,destinationAirport){


    var res = {
        "outgoingFlights": []
    };

    var resRT = {
        "outgoingFlights": [],
        "returnFlights": []
    };

    if (Object.keys(input).length === 1){

        for (var i = 0; i < input.outgoingFlights.length; i++){

            var flight = input.outgoingFlights.getJSONObject(i);

            if (flight.origin === originAirport && flight.destination === destinationAirport)
                res.outgoingFlights.push(flight);
    }

    return res;   
    
    }


    if (Object.keys(input).length === 2){

        for ( i = 0; i < input.outgoingFlights.length; i++){
            var outFlight = input.outgoingFlights.getJSONObject(i);
            if (outFlight.origin === originAirport && outFlight.destination === destinationAirport)
                resRT.outgoingFlights.push(outFlight);

            }
        for (var j = 0; j < input.returnFlights.lenght; j++){
            var returnFlight = input.returnFlights.getJSONObject(j);
            if (returnFlight.origin === destinationAirport && returnFlight.destination === originAirport){
                resRT.returnFlights.push(returnFlights);
            }

        }
        
    } 

}

function getFlightByID(flightNumber,departureDateTime,cb) {
    db.db().collection('flights').find(
        {
           "flightNumber": flightNumber,
            "departureDateTime": departureDateTime
        }
    ).toArray(cb);

    }
    
    
    
    exports.getFlightsFromDB = getFlightsFromDB;
    exports.getFlightsWithAirports = getFlightsWithAirports;
    exports.getFlightByID = getFlightByID;

exports.checkSeats=checkSeats;
exports.getFlightsWithDates=getFlightsWithDates;







