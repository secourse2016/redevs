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
function reservationSearch(resNum,cb){
//return reservation based on the ResNumber passed

//mmkn akhaliha teraga3li eli ana 3ayzah ml db 3ala tool w khalas as-hal

 //.toArray() returns an array that contains all the documents from a cursor
db.db().collection('tickets').find( { reservationCode: resNum } , function(err, data) {
	cb(err, data);
});

   // for(i=0;i<tickets.length;i++){

   //           if(tickets[i].reservationCode==resNum){
   //            return tickets[i];
   //            break;

   //           }
   //         }
}
function getTicketsFromJSON() {
	//return all the tickets/reservation
    return tickets;
}




function reserveRoundTripTicket(flights,email,creditCardNumber,adults,children,cb){
    getFlightById(flights[0].flightNumber,flights[0].DepartureDateTime,function(err,flight1){
      getFlightById(flights[1].flightNumber,flights[1].DepartureDateTime,function(err,flight2){
        for(int i=0;i<adults.length;i++){
          for(int j=0;j<flight1.seatMap.length;j++){
            if(flight1.seatMap[j].isReserved==="false"){
              adults[i].outgoingSeatNumber = flight1.seatMap[j].seatNumber ;
              flight1.seatMap[j].isReserved="true";
            }
          }
        }
        for(int i=0;i<children.length;i++){
          for(int j=0;j<flight1.seatMap.length;j++){
            if(flight1.seatMap[j].isReserved==="false"){
              children[i].outgoingSeatNumber = flight1.seatMap[j].seatNumber ;
              flight1.seatMap[j].isReserved="true";
            }
          }
        }
        for(int i=0;i<adults.length;i++){
          for(int j=0;j<flight2.seatMap.length;j++){
            if(flight2.seatMap[j].isReserved==="false"){
              adults[i].ReturnSeatNumber = flight2.seatMap[j].seatNumber ;
              flight2.seatMap[j].isReserved="true";
            }
          }
        }
        for(int i=0;i<children.length;i++){
          for(int j=0;j<flight2.seatMap.length;j++){
            if(flight2.seatMap[j].isReserved==="false"){
              children[i].ReturnSeatNumber = flight2.seatMap[j].seatNumber ;
              flight2.seatMap[j].isReserved="true";
            }
          }
        }

        db.db().collection('tickets').insertOne({
          "reservationCode":0,
          "numberOfAdults":adults.length,
          "adults":adults,
          "numberOfChildren":children.length,
          "children":children,
          "flights":[flight1,flight2],
          "email":email,
          "creditCardNumber":creditCardNumber
        },function(err,result){
          assert.equal(err,null);
          console.log("Reservation done");
          cb();
        });


      });
    });

}

function reserveOneWayTicket(flights,email,creditCardNumber,adults,children,cb){
    getFlightById(flights[0].flightNumber,flights[0].DepartureDateTime,function(err,flight1){
        for(int i=0;i<adults.length;i++){
          for(int j=0;j<flight1.seatMap.length;j++){
            if(flight1.seatMap[j].isReserved==="false"){
              adults[i].outgoingSeatNumber = flight1.seatMap[j].seatNumber ;
              flight1.seatMap[j].isReserved="true";
            }
          }
        }
        for(int i=0;i<children.length;i++){
          for(int j=0;j<flight1.seatMap.length;j++){
            if(flight1.seatMap[j].isReserved==="false"){
              children[i].outgoingSeatNumber = flight1.seatMap[j].seatNumber ;
              flight1.seatMap[j].isReserved="true";
            }
          }
        }


        db.db().collection('tickets').insertOne({
          "reservationCode":0,
          "numberOfAdults":adults.length,
          "adults":adults,
          "numberOfChildren":children.length,
          "children":children,
          "flights":[flight1],
          "email":email,
          "creditCardNumber":creditCardNumber
        },function(err,result){
          assert.equal(err,null);
          console.log("Reservation done");
          cb();
        });


      });


}





















exports.getTicketsFromDB = getTicketsFromDB;
exports.getTicketsFromJSON = getTicketsFromJSON;
exports.reservationSearch = reservationSearch;
exports.reserveRoundTripTicket = reserveRoundTripTicket;
exports.reserveOneWayTicket = reserveOneWayTicket;
