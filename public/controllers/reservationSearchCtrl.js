/**
 * Reservation search Controller
 */
//  var express = require('express');
//  var appExpress = express();

// var reservations=require("home/jojo/redevs/reservations.json");




App.controller('reservationSearchCtrl', function($scope,$http,reservationSearchSrv) {


  $scope.reservations=[{
  "reservationCode":"AXY123",
  "numberOfAdults":2,
  "adults":[{
    "seatNumber": "a",
    "price":123.44,
    "window/aisle":"w",
    "firstName":"jai",
    "lastName":"yas",
    "passport":"acyj",
    "passportNumber":"1233"
  }

  ],
  "numberOfChildren":1,
  "children":[{
    "seatNumber": "w",
    "price":123.44,
    "window/aisle":"w",
    "firstName":"jai",
    "lastName":"yas",
    "passport":"acyj",
    "passportNumber":"1233"
  },

  ],
  "flights":[{


  "flightNumber":"123hh",
  "aircraft":"jjj",
  "capacity":400,
  "date":"20/01/2016",
  "duration":2,
  "origin":"CAI",
  "destination": "BCN",



  "firstclassSeatMap":[{
    "seatNumber":"H2",
    "price":123.444,
    "window/aisle" : "W"
  }
  ],
  "businessclassSeatMap":[
    {
    "seatNumber":"Z2",
    "price":12345.0,
    "window/aisle":"W"
  }

  ],

  "economyclassSeatmap":
            [
              {
              "seatNumber": "K4",
              "price":9898.0,
              "window/aisle":"A",
            }
         ],
}
    ,{"flightNumber":"12ZZZZh",
  "aircraft":"ZZ",
  "capacity":400,
  "date":"20/01/2016",
  "duration":2,
  "origin":"BCN",
  "destination": "CAI",



  "firstclassSeatMap":[{
    "seatNumber":"H2",
    "price":123.444,
    "window/aisle" : "W"
  }
  ],
  "businessclassSeatMap":[
    {
    "seatNumber":"Z2",
    "price":12345.0,
    "window/aisle":"W"
  }

  ],

  "economyclassSeatmap":
            [
              {
              "seatNumber": "K4",
              "price":9898.0,
              "window/aisle":"A",
            }
         ],

      }],
  "email":"jaida",
  "creditCardNumber":1233,


  "cvcNumber":2,
  "mobileNumber":2,
  "emergencyName":"zaher",
  "emergencyNumber":"zahe233",

}
];


  // $http.get('/api/tickets').
  // success(function(data,status,headers,config){
  //   $scope.reservations=data;
  // })

$scope.reservationsObjects={};
var reservationNumber = reservationSearchSrv.getReservationNumber();

   findReservation = function(resNum) { // <-- here is you value from the input

      reservationSearchSrv.setReservationNumber(resNum);

      var reservationNumberValue = reservationSearchSrv.getReservationNumber();

      for(i=0;i<$scope.reservations.length;i++){
             if($scope.reservations[i].reservationCode==reservationNumberValue){

              $scope.reservationsObjects=$scope.reservations[i];


             }
           }






};

  findReservation(reservationNumber);

   $scope.findReservation = findReservation ;

});




//   $scope.findReservation = function(enteredValue) {
//      for(i=0;i<reservations.length;i++){
//             if(reservations[i].reservationNumber==enteredValue){

//               return reservations[i];
//             }
//           }

//           return("Not found");
//           //
// };

// App.controller('reservationSearchCtrl', function($scope, reservationSearchSrv) {

//   /* Retrieve Selected flight details */

//   //1st refers to the going flight
//   //2nd refers to the return flight

// //el method eli beta5od el resvNumber ml textbox w teraga3 el reservation required
//   $scope.findReservation = function(enteredValue) {
//      for(i=0;i<reservations.length;i++){
//             if(reservations[i].reservationNumber==enteredValue){

//               return reservations[i];
//             }
//           }
//           //
// };


// //ghaleban da hashilo khales
//   $scope.flight = {
//     numberOfTickets      :reservationSearchSrv.getSelectedNumberOfTickets(),
//     Class                :reservationSearchSrv.getSelectedClass(),
//     1stFrom              :reservationSearchSrv.getSelected1stFrom(),
//     1stto                :reservationSearchSrv.getSelected1stto(),
//     1stfromDate          :reservationSearchSrv.getSelected1stFromDate(),
//     1stfromTime          :reservationSearchSrv.getSelected1stFromTime(),
//     1stfromTerminal      :reservationSearchSrv.getSelected1stFromTerminal(),
// 	  1sttoDate             :reservationSearchSrv.getSelected1sttoDate(),
//     1sttoTime            :reservationSearchSrv.getSelected1sttoTime(),
//     1sttoTerminal        :reservationSearchSrv.getSelected1sttoTerminal(),
//     1stflightNumber      :reservationSearchSrv.getSelected1stFlightNumber(),

// 	  2ndFrom              :reservationSearchSrv.getSelected2ndFrom(),
//     2ndto                :reservationSearchSrv.getSelected2ndto(),
//     2ndfromDate          :reservationSearchSrv.getSelected2ndFromDate(),
//     2ndfromTime          :reservationSearchSrv.getSelected2ndFromTime(),
//     2ndfromTerminal      :reservationSearchSrv.getSelected2ndFromTerminal(),
// 	  2ndtoDate            :reservationSearchSrv.getSelected2ndtoDate(),
//     2ndtoTime            :reservationSearchSrv.getSelected2ndtoTime(),
//     2ndtoTerminal        :reservationSearchSrv.getSelected2ndtoTerminal(),
//     2ndflightNumber      :reservationSearchSrv.getSelected2ndFlightNumber(),

// 	reservationNumber    :reservationSearchSrv.getSelectedReservationNumber(),

//   };



// });
