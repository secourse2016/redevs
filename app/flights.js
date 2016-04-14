
var db = require('./db.js');











//gets all flights from DB do not forget cb
function getFlightsFromDB(array,cb){
    db.db().collection('flights').find({}).toArray(cb);
    }


//Search for flights in the array with minSeats<=classSeats
function checkSeats (array, minSeats,classs) {

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

    for (var n = 0; n < array.length(); n++) {
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
        var flightsdepartureDate = moment(departureDateTime, 'YYYY-MM-DD hh:mm A').toDate().getTime();
        var flightsarrivalDate = moment(arrivalDateTime, 'YYYY-MM-DD hh:mm A').toDate().getTime();
        var departureDate = moment(flightsdepartureDate).format('YYYY-MM-DD');
        var arrivalDate = moment(flightsarrivalDate).format('YYYY-MM-DD');
        aircraft = aircraft.split(" ");
        var aircraftType = aircraft[0];
        var aircraftModel = aircraft[1];
        if (arguments.length() === 3) {

            if (departureDate === originDate) {


                if (classs === "Economy Class") {


                    res.outgoingFlights.push({
                        "flightNumber": flightNumber,
                        "aircraftType": aircraftType,
                        "aircraftModel": aircraftModel,
                        "departureDateTime": flightsdepartureDate,
                        "arrivalDateTime": flightsarrivalDate,
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
                            "departureDateTime": flightsdepartureDate,
                            "arrivalDateTime": flightsarrivalDate,
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
                                "departureDateTime": flightsdepartureDate,
                                "arrivalDateTime": flightsarrivalDate,
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
        if (arguments.length() === 4) {
            if (departureDate === originDate) {


                if (classs === "Economy Class") {


                    resRT.outgoingFlights.push({
                        "flightNumber": flightNumber,
                        "aircraftType": aircraftType,
                        "aircraftModel": aircraftModel,
                        "departureDateTime": flightsdepartureDate,
                        "arrivalDateTime": flightsarrivalDate,
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
                            "departureDateTime": flightsdepartureDate,
                            "arrivalDateTime": flightsarrivalDate,
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
                                "departureDateTime": flightsdepartureDate,
                                "arrivalDateTime": flightsarrivalDate,
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
                            "departureDateTime": flightsdepartureDate,
                            "arrivalDateTime": flightsarrivalDate,
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
                                "departureDateTime": flightsdepartureDate,
                                "arrivalDateTime": flightsarrivalDate,
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
                                    "departureDateTime": flightsdepartureDate,
                                    "arrivalDateTime": flightsarrivalDate,
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
function getFlightsWithAirports(array,originAirport,DestinationAirport){

}





}


