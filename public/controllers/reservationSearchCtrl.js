/**
 * Reservation search Controller
 */
var reservations=require("../reservations.json");
App.controller('reservationSearchCtrl', function($scope, reservationSearchSrv) {

  /* Retrieve Selected flight details */
  
  //1st refers to the going flight
  //2nd refers to the return flight

//el method eli beta5od el resvNumber ml textbox w teraga3 el reservation required
  $scope.findReservation = function(enteredValue) {     
     for(i=0;i<reservations.length;i++){
            if(reservations[i].reservationNumber==enteredValue){
              return reservations[i];
            }
          }
          //
};


//ghaleban da hashilo khales 
  $scope.flight = {
    numberOfTickets      :reservationSearchSrv.getSelectedNumberOfTickets(),
    Class                :reservationSearchSrv.getSelectedClass(),
    1stFrom              :reservationSearchSrv.getSelected1stFrom(),
    1stto                :reservationSearchSrv.getSelected1stto(),
    1stfromDate          :reservationSearchSrv.getSelected1stFromDate(),
    1stfromTime          :reservationSearchSrv.getSelected1stFromTime(),
    1stfromTerminal      :reservationSearchSrv.getSelected1stFromTerminal(),
	  1sttoDate             :reservationSearchSrv.getSelected1sttoDate(),
    1sttoTime            :reservationSearchSrv.getSelected1sttoTime(),
    1sttoTerminal        :reservationSearchSrv.getSelected1sttoTerminal(),
    1stflightNumber      :reservationSearchSrv.getSelected1stFlightNumber(),
	
	2ndFrom              :reservationSearchSrv.getSelected2ndFrom(),
    2ndto                :reservationSearchSrv.getSelected2ndto(),
    2ndfromDate          :reservationSearchSrv.getSelected2ndFromDate(),
    2ndfromTime          :reservationSearchSrv.getSelected2ndFromTime(),
    2ndfromTerminal      :reservationSearchSrv.getSelected2ndFromTerminal(),
	2ndtoDate            :reservationSearchSrv.getSelected2ndtoDate(),
    2ndtoTime            :reservationSearchSrv.getSelected2ndtoTime(),
    2ndtoTerminal        :reservationSearchSrv.getSelected2ndtoTerminal(),
    2ndflightNumber      :reservationSearchSrv.getSelected2ndFlightNumber(),
	
	reservationNumber    :reservationSearchSrv.getSelectedReservationNumber(),

  };

 

});