/**
 * Main Controller */
App.controller('confirmationCtrl', function($scope, FlightsSrv, $location) {
  $scope.childrenTickets = FlightsSrv.getNumberOfChildren(); //sandy
  $scope.adultTickets = FlightsSrv.getNumberOfAdults(); //sandy
  $scope.classOfTickets = FlightsSrv.getClasses(); //karim

  $scope.flights = FlightsSrv.getFlights();

  $scope.thereAreAdults = !($scope.adultTickets === 0);
  $scope.thereAreChildren = !($scope.childrenTickets === 0);
  /* $scope.departFrom = FlightsSrv.getSelectedOriginAirport(); //karim 
  $scope.departDate = FlightsSrv.getSelectedDepartureDate(); //karim
  $scope.departTime = FlightsSrv.getSelectedDepartureTime(); // ** lessa me7tageen ne3melha 3and karim
  //$scope.departTerminal1= FlightsSrv.getDepartTerminal1(); 

  $scope.arriveTo = FlightsSrv.getSelectedDestinationAirport(); //karim
  $scope.arrivalDate = FlightsSrv.getSelectedArrivalDate(); //karim
  $scope.arrivalTime = FlightsSrv.getSelectedArrivalTime(); // ** lessa me7tageen ne3melha 3and karim
  //$scope.departTerminal2 = FlightsSrv.getDepartTerminal2(); 

 /* $scope.returnFrom = FlightsSrv.getReturnFrom();
  $scope.returnDate1 = FlightsSrv.getReturnDate1();
  $scope.returnTime1 = FlightsSrv.getReturnTime1();
  $scope.returnTerminal1 = FlightsSrv.getReturnTerminal1(); 

  $scope.returnTo = FlightsSrv.getReturnTo();
  $scope.returnDate2 = FlightsSrv.getReturnDate2();
  $scope.returnTime2 = FlightsSrv.getReturnTime2();
  $scope.returnTerminal2 = FlightsSrv.getReturnTerminal2(); */

  //lessa dool to be fixed!! 
  //$scope.userEmail = FlightsSrv.getUserEmail();
  /* $scope.adultTicketsCost = FlightsSrv.getAdultTicketsCost();
  $scope.childrenTicketsCost = FlightsSrv.getChildrenTicketsCost();
  $scope.totalAmount = FlightsSrv.getTotalCost(); */
});
