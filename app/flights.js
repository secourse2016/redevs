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

function updateFlights(db, flightNumber, departureDateTime, economyClassSeatMap, businessClassSeatMap, firstClassSeatMap, callback) {

	 db.db().collection('flights').updateOne(
      { "flightNumber" : flightNumber,
				"departureDateTime": departureDateTime
		 	},
      {
        $set: {
					"economyClassSeatMap": economyClassSeatMap,
					"businessClassSeatMap": businessClassSeatMap,
					"firstClassSeatMap": firstClassSeatMap

			 },

      }, function(err, results) {
      console.log(results);
      callback();
   });

};


function reserveRoundTripTicket(class,flights,email,creditCardNumber,adults,children,cb){
    getFlightById(flights[0].flightNumber,flights[0].DepartureDateTime,function(err,flight1){
      getFlightById(flights[1].flightNumber,flights[1].DepartureDateTime,function(err,flight2){
				if(class==="economy"){
				for(int i=0;i<adults.length;i++){
          for(int j=0;j<flight1.economyClassSeatMap.length;j++){ //economyclassSeatmap is supposedly the name of the seatmap for economy rabena yostor
            if(flight1.economyClassSeatMap[j].isReserved==="false"){
              adults[i].outgoingSeatNumber = flight1.economyClassSeatMap[j].seatNumber ;
              flight1.economyClassSeatMap[j].isReserved="true";
            }
          }
        }
        for(int i=0;i<children.length;i++){
          for(int j=0;j<flight1.seatMap.length;j++){
            if(flight1.economyClassSeatMap[j].isReserved==="false"){
              children[i].outgoingSeatNumber = flight1.economyClassSeatMap[j].seatNumber ;
              flight1.economyClassSeatMap[j].isReserved="true";
            }
          }
        }
        for(int i=0;i<adults.length;i++){
          for(int j=0;j<flight2.economyClassSeatMap.length;j++){
            if(flight2.economyClassSeatMap[j].isReserved==="false"){
              adults[i].ReturnSeatNumber = flight2.economyClassSeatMap[j].seatNumber ;
              flight2.economyClassSeatMap[j].isReserved="true";
            }
          }
        }
        for(int i=0;i<children.length;i++){
          for(int j=0;j<flight2.economyClassSeatMap.length;j++){
            if(flight2.economyClassSeatMap[j].isReserved==="false"){
              children[i].ReturnSeatNumber = flight2.economyClassSeatMap[j].seatNumber ;
              flight2.economyClassSeatMap[j].isReserved="true";
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
					updateFlights(db, flight1.flightNumber, flight1.departureDateTime, flight1.economyClassSeatMap, flight1.businessClassSeatMap, flight1.firstClassSeatMap, function() {
						updateFlights(db, flight2.flightNumber, flight2.departureDateTime, flight2.economyClassSeatMap, flight2.businessClassSeatMap, flight2.firstClassSeatMap, function() {
							console.log("FLights Updated");
	 									});
 									});
          cb();
        });

			}
			else{
				if(class==="business"){
					for(int i=0;i<adults.length;i++){
	          for(int j=0;j<flight1.businessClassSeatMap.length;j++){ //business seat map is called that way, this is for checking for business class
	            if(flight1.businessClassSeatMap[j].isReserved==="false"){
	              adults[i].outgoingSeatNumber = flight1.businessClassSeatMap[j].seatNumber ;
	              flight1.businessClassSeatMap[j].isReserved="true";
	            }
	          }
	        }
	        for(int i=0;i<children.length;i++){
	          for(int j=0;j<flight1.seatMap.length;j++){
	            if(flight1.businessClassSeatMap[j].isReserved==="false"){
	              children[i].outgoingSeatNumber = flight1.businessClassSeatMap[j].seatNumber ;
	              flight1.businessClassSeatMap[j].isReserved="true";
	            }
	          }
	        }
	        for(int i=0;i<adults.length;i++){
	          for(int j=0;j<flight2.businessclassSeatMap.length;j++){
	            if(flight2.businessClassSeatMap[j].isReserved==="false"){
	              adults[i].ReturnSeatNumber = flight2.businessClassSeatMap[j].seatNumber ;
	              flight2.businessClassSeatMap[j].isReserved="true";
	            }
	          }
	        }
	        for(int i=0;i<children.length;i++){
	          for(int j=0;j<flight2.businessclassSeatMap.length;j++){
	            if(flight2.businessClassSeatMap[j].isReserved==="false"){
	              children[i].ReturnSeatNumber = flight2.businessClassSeatMap[j].seatNumber ;
	              flight2.businessClassSeatMap[j].isReserved="true";
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
						updateFlights(db, flight1.flightNumber, flight1.departureDateTime, flight1.economyClassSeatMap, flight1.businessClassSeatMap, flight1.firstClassSeatMap, function() {
							updateFlights(db, flight2.flightNumber, flight2.departureDateTime, flight2.economyClassSeatMap, flight2.businessClassSeatMap, flight2.firstClassSeatMap, function() {
								console.log("FLights Updated");
		 									});
	 									});
	          cb();
	        });


				}
				else{
					if(class==="firstClass"){
					for(int i=0;i<adults.length;i++){
	          for(int j=0;j<flight1.firstClassSeatMap.length;j++){ //first class reservation same as above
	            if(flight1.firstClassSeatMap[j].isReserved==="false"){
	              adults[i].outgoingSeatNumber = flight1.firstClassSeatMap[j].seatNumber ;
	              flight1.firstClassSeatMap[j].isReserved="true";
	            }
	          }
	        }
	        for(int i=0;i<children.length;i++){
	          for(int j=0;j<flight1.seatMap.length;j++){
	            if(flight1.firstClassSeatMap[j].isReserved==="false"){
	              children[i].outgoingSeatNumber = flight1.firstClassSeatMap[j].seatNumber ;
	              flight1.firstClassSeatMap[j].isReserved="true";
	            }
	          }
	        }
	        for(int i=0;i<adults.length;i++){
	          for(int j=0;j<flight2.firstClassSeatMap.length;j++){
	            if(flight2.firstClassSeatMap[j].isReserved==="false"){
	              adults[i].ReturnSeatNumber = flight2.firstClassSeatMap[j].seatNumber ;
	              flight2.firstClassSeatMap[j].isReserved="true";
	            }
	          }
	        }
	        for(int i=0;i<children.length;i++){
	          for(int j=0;j<flight2.firstClassSeatMap.length;j++){
	            if(flight2.firstClassSeatMap[j].isReserved==="false"){
	              children[i].ReturnSeatNumber = flight2.firstClassSeatMap[j].seatNumber ;
	              flight2.firstClassSeatMap[j].isReserved="true";
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
						updateFlights(db, flight1.flightNumber, flight1.departureDateTime, flight1.economyClassSeatMap, flight1.businessClassSeatMap, flight1.firstClassSeatMap, function() {
							updateFlights(db, flight2.flightNumber, flight2.departureDateTime, flight2.economyClassSeatMap, flight2.businessClassSeatMap, flight2.firstClassSeatMap, function() {
								console.log("FLights Updated");
		 									});
	 									});
	          cb();
	        });
				}
				}
			}
      });
    });


}

function reserveOneWayTicket(class,flights,email,creditCardNumber,adults,children,cb){
    getFlightById(flights[0].flightNumber,flights[0].DepartureDateTime,function(err,flight1){ // same should be done as above regarding the classes
			if(class===economy){
				for(int i=0;i<adults.length;i++){
          for(int j=0;j<flight1.economyClassSeatMap.length;j++){
            if(flight1.economyClassSeatMap[j].isReserved==="false"){
              adults[i].outgoingSeatNumber = flight1.economyClassSeatMap[j].seatNumber ;
              flight1.economyClassSeatMap[j].isReserved="true";
            }
          }
        }
        for(int i=0;i<children.length;i++){
          for(int j=0;j<flight1.economyClassSeatMap.length;j++){
            if(flight1.economyClassSeatMap[j].isReserved==="false"){
              children[i].outgoingSeatNumber = flight1.economyClassSeatMap[j].seatNumber ;
              flight1.economyClassSeatMap[j].isReserved="true";
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
					updateFlights(db, flight1.flightNumber, flight1.departureDateTime, flight1.economyClassSeatMap, flight1.businessClassSeatMap, flight1.firstClassSeatMap, function() {
						updateFlights(db, flight2.flightNumber, flight2.departureDateTime, flight2.economyClassSeatMap, flight2.businessClassSeatMap, flight2.firstClassSeatMap, function() {
							console.log("FLights Updated");
	 									});
 									});
          cb();
        });

			}
			else{
				if(class===business){
					for(int i=0;i<adults.length;i++){
						for(int j=0;j<flight1.businessClassSeatMap.length;j++){
							if(flight1.businessClassSeatMap[j].isReserved==="false"){
								adults[i].outgoingSeatNumber = flight1.businessClassSeatMap[j].seatNumber ;
								flight1.businessClassSeatMap[j].isReserved="true";
							}
						}
					}
					for(int i=0;i<children.length;i++){
						for(int j=0;j<flight1.businessClassSeatMap.length;j++){
							if(flight1.businessClassSeatMap[j].isReserved==="false"){
								children[i].outgoingSeatNumber = flight1.businessClassSeatMap[j].seatNumber ;
								flight1.businessClassSeatMap[j].isReserved="true";
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
						updateFlights(db, flight1.flightNumber, flight1.departureDateTime, flight1.economyClassSeatMap, flight1.businessClassSeatMap, flight1.firstClassSeatMap, function() {
							updateFlights(db, flight2.flightNumber, flight2.departureDateTime, flight2.economyClassSeatMap, flight2.businessClassSeatMap, flight2.firstClassSeatMap, function() {
								console.log("FLights Updated");
		 									});
	 									});
						cb();
					});
				}
				else{
					for(int i=0;i<adults.length;i++){
						for(int j=0;j<flight1.firstClassSeatMap.length;j++){
							if(flight1.firstClassSeatMap[j].isReserved==="false"){
								adults[i].outgoingSeatNumber = flight1.firstClassSeatMap[j].seatNumber ;
								flight1.firstClassSeatMap[j].isReserved="true";
							}
						}
					}
					for(int i=0;i<children.length;i++){
						for(int j=0;j<flight1.firstClassSeatMap.length;j++){
							if(flight1.firstClassSeatMap[j].isReserved==="false"){
								children[i].outgoingSeatNumber = flight1.firstClassSeatMap[j].seatNumber ;
								flight1.firstClassSeatMap[j].isReserved="true";
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
						updateFlights(db, flight1.flightNumber, flight1.departureDateTime, flight1.economyClassSeatMap, flight1.businessClassSeatMap, flight1.firstClassSeatMap, function() {
							updateFlights(db, flight2.flightNumber, flight2.departureDateTime, flight2.economyClassSeatMap, flight2.businessClassSeatMap, flight2.firstClassSeatMap, function() {
								console.log("FLights Updated");
		 									});
	 									});
						cb();
					});

				}
			}
      });


}





















exports.getTicketsFromDB = getTicketsFromDB;
exports.getTicketsFromJSON = getTicketsFromJSON;
exports.reservationSearch = reservationSearch;
exports.reserveRoundTripTicket = reserveRoundTripTicket;
exports.reserveOneWayTicket = reserveOneWayTicket;
