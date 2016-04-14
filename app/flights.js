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
db.db().collection('tickets').find( { reservationCode: resNum } ).toArray(cb);

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




function reserveTicket(flights,email,creditCardNumber,adults,children,cb){
var outgoingflight = getFlightbyId(
  flights[0].flightNumber,flights[0]
  .departureDateTime) ;
  if(flights.length===2)
  var returnflight = getFlightbyId(
    flights[1].flightNumber,
    flights[1].departureDateTime
  );


      for(int j=0;j<adults.length;j++){
        for(int i =0;i<outgoingflight.seatMap.length,i++){
          if(outgoingflight.seatMap[i].isReserved==="false")
            adults[j].seatNumberOutgoing=outgoingflight.seatMap[i].seatNumber;
            seatMap[i].isReserved="true";
        }
      }
    }



  db.db().collection('tickets').insertOne({
    "reservationCode":0,
    "numberOfAdults":adults.length,
    "adults":adults,
    "numberOfChildren":children.length,
    "children":children,
    "flights":flights,
    "email":email,
    "creditCardNumber":creditCardNumber
  },function(err,result){
    assert.equal(err,null);
    console.log("Reservation done");
    cb();
  });
}





















exports.getTicketsFromDB = getTicketsFromDB;
exports.getTicketsFromJSON = getTicketsFromJSON;
exports.reservationSearch = reservationSearch;
exports.reserveTicket = reserveTicket;
