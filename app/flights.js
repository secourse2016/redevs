/**
 * Created by souidan on 4/14/16.
 */
var db = require('./db.js');
var tickets = require('../tickets.json');

exports.tickets=tickets;
//Search for flights in the array with minSeats<=classSeats
function checkSeats (cb,array, minSeats,class) {

}
//getFlights within a certain date
//if 3 arguments return 2 way trip
//if 2 arguments return 1 way trip
// do not forget callback function
function getFlightsWithDates(cb,originDate,DestinationDate){

}
//getFlight with a certain route
function getFlightsWithAirports(cb,originAirport,DestinationAirport){

}
function getTicketsFromDB(cb){
//return all tickets/ all reservations y3ni
db.db().collection('tickets').find({}).toArray(cb);
}

exports.getTicketsFromDB = getTicketsFromDB;

