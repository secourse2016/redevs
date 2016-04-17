
var mongo   = require('./db');
var moment  = require('moment');
var flightsArray = [];

// defining the seed function then export
function seedFlights(flight, _origin, _destination,key,callback) {

	      // loop until May 31 2016 starting deadline 18th of April
	      var date = moment('2016-04-18T00:00:00+0200');
	      for (var i = 0; i < 44; i++) {

	        doc = 
	        {
	          "flightNumber"        :   flight.flightNumber,
	          "aircraft"            :   flight.aircraft,
	          "capacity"            :   flight.capacity,
	          "duration"            :   flight.duration,
	          "origin"              :   _origin,
	          "destination"         :   _destination,
	          "firstClassSeats"     :   10,    
	          "businessClassSeats"  :   50,
	          "economyClassSeats"   :   200,
	          "firstClassCost"      :   flight.firstClassCost,     
	          "businessClassCost"   :   flight.businessClassCost,
	          "economyClassCost"    :   flight.economyClassCost,
	          "firstClassSeatMap" : [],
	          "businessClassSeatMap" : [],
	          "economyClassSeatMap" : []

	        };

	        //calculating departure time 
	        var depTime = moment(date).add(i,'days');
	        if(key === "outgoing"){
	          depTime = moment(depTime).add(flight.departureTime,'hour').toDate().getTime();
	        }
	        else {
	          depTime = moment(depTime).add(flight.departureTime+5,'hour').toDate().getTime();
	        }	
	        //setting the departure and arrival dates time accordingly
	        doc.departureDateTime = depTime;
			doc.arrivalDateTime = moment(depTime).add(flight.duration,'hours').toDate().getTime();


	        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	        var counter = 1;
	        for (var j=0;j<letters.length; j++){
	          for(var k=1; k<11; k++){
	            seat = {"seatNumber":letters[j]+""+k, "isReserved":"false"};
	            if(counter < 11) //0-9 >> first class
	              doc.firstClassSeatMap.push(seat);
	            else if(counter >= 11 && counter < 61)
	              doc.businessClassSeatMap.push(seat);
	            else if(counter >=61)
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




function seed(cb){
	var databaseInstance = mongo.db();
	var collection = databaseInstance.collection("flights");
	collection.find().count(function(err,count){
	if(count ===0){


		routes = [
	      {'origin': 'Mumbai', 'destination': 'Delhi', 'duration': 3, 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804','departureTime':0,"firstClassCost":12000,"businessClassCost":9000,"economyClassCost":2000},
	      {'origin': 'Cairo', 'destination': 'Jeddah', 'duration': 3, 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804','departureTime':1,"firstClassCost":15000,"businessClassCost":10000,"economyClassCost":4000},
	      {'origin': 'Hong Kong', 'destination': 'Taiwan', 'duration': 3, 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804','departureTime':2,"firstClassCost":12000,"businessClassCost":8000,"economyClassCost":3000},
	      {'origin': 'Johannesburg', 'destination': 'Cape Town', 'duration': 3, 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804','departureTime':3,"firstClassCost":14000,"businessClassCost":9000,"economyClassCost":5000},
	      {'origin': 'Riyadh', 'destination': 'Jeddah', 'duration': 3, 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804','departureTime':4,"firstClassCost":16000,"businessClassCost":10000,"economyClassCost":7000},
	      {'origin': 'London Heathrew', 'destination': 'New York-John F. Kennedy', 'duration':3, 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804','departureTime':5,"firstClassCost":19000,"businessClassCost":14000,"economyClassCost":9000},
	      {'origin': 'Las Vegas', 'destination': 'Las Angeles', 'duration': 3, 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804','departureTime':6,"firstClassCost":9000,"businessClassCost":6000,"economyClassCost":3000},
	      {'origin': 'Las Angeles', 'destination': 'San Francisco', 'duration': 3, 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804','departureTime':7,"firstClassCost":13000,"businessClassCost":9000,"economyClassCost":5000},
	      {'origin': 'Frankfurt', 'destination': 'Berlin', 'duration': 3, 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804','departureTime':8,"firstClassCost":9000,"businessClassCost":6000,"economyClassCost":4000},
	      {'origin': 'Rome', 'destination': 'Milan', 'duration': 3, 'capacity': 100, 'aircraft': 'Airbus a318', 'flightNumber': 'SE2804','departureTime':9,"firstClassCost":8000,"businessClassCost":5000,"economyClassCost":3000}
	    ];

	    //insert outgoing flights
	    for (var i = 0; i < routes.length; i++) {
	        var route1 = routes[i];
	        seedFlights(route1, route1.origin, route1.destination,"outgoing",cb);

	      }

	      // insert returning flights
	    for (var x = 0; x < routes.length; x++) {
	      	var route2 = routes[x];
	       	seedFlights(route2, route2.destination, route2.origin,"returning",cb);
	      }

	    mongo.db().collection('flights').insert(flightsArray,function(err,data){
	    	if(err) cb(err,false);
	    	else cb(err,true);
	    });

	    // mongo.db().collection('flights').insert(doc, function(err, data){
	        //   if (err) callback(err,false);
	        //   else callback(err,true);
	        // });

		}

		else{
			cb(err,false);
		}

	});
}


exports.seed = seed;