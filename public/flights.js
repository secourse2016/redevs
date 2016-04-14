/**
 * Created by souidan on 4/14/16.
 */
var db = require('./db.js');




//gets all flights from DB do not forget cb
function getFlightsFromDB(array,cb){



}

//Search for flights in the array with minSeats<=classSeats
function checkSeats (array, minSeats,classs) {

}
//getFlights within a certain date
//if 3 arguments return 2 way trip
//if 2 arguments return 1 way trip
function getFlightsWithDates(array,originDate,destinationDate,res){

    for(var n = 0; n < array.length(); n++)
    {
        JSONObject flight = array.getJSONObject(n);
        var flightNumber= flight.flightNumber;
        var aircraft= flight.aircraft;
        var departureDateTime=flight.departureDateTime;
        var arrivalDateTime=flight.arrivalDateTime;
        var origin =flight.origin;
        var destination=flight.destination;
        var firstClassSeats = flight.firstClassSeats;
        var businessClassSeats=flight.businessClassSeats;
        var economyClassSeats=flight.economyClassSeats;
        var firstClassCost= flight.fistClassCost;
        var businessClassCost= flight.businessClassCost;
        var economyClassCost =flight.economyClassCost;
        var departureDate = moment(departureDateTime, 'YYYY-MM-DD hh:mm A').toDate().getTime();
        var arrivalDate = moment(arrivalDateTime, 'YYYY-MM-DD hh:mm A').toDate().getTime();

        if((departureDate===originDate )&& (arrivalDate===destinationDate)){
            res.push({
                "flightNumber":flightNumber,
                "aircraft":aircraft,
                "departureDateTime":departureDate,
                "arrivalDateTime":arrivalDate,
                "origin":origin,
                "destination": destination,
                "firstClassSeats" : firstClassSeats,
                "businessClassSeats":businessClassSeats,
                "economyClassSeats":economyClassSeats,
                "firstClassCost":firstClassCost,
                "businessClassCost":businessClassCost,
                "economyClassCost":economyClassCost


            });
        }




    }



}
//getFlight with a certain route
function getFlightsWithAirports(array,originAirport,DestinationAirport){

}

//formats flight for corresponding format on secourse.com
function formatFlight(array,res){

}


