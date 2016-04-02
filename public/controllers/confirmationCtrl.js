/**
 * Main Controller */
App.controller('confirmationCtrl', function($scope, FlightsSrv, $location) {
  $scope.childrenTickets = FlightsSrv.getChildrenTickets();
  $scope.adultTickets = FlightsSrv.getAdultTickets(); 
  $scope.classOfTickets = FlightsSrv.getClass(); 

  $scope.departFrom = FlightsSrv.getDepartFrom();
  $scope.departDate1 = FlightsSrv.getDepartDate1();
  $scope.departTime1 = FlightsSrv.getDepartTime1();
  $scope.departTerminal1= FlightsSrv.getDepartTerminal1(); 

  $scope.departTo = FlightsSrv.getDepartTo();
  $scope.departDate2 = FlightsSrv.getDepartDate2();
  $scope.departTime2 = FlightsSrv.getDepartTime2();
  $scope.departTerminal2 = FlightsSrv.getDepartTerminal2(); 

  $scope.returnFrom = FlightsSrv.getReturnFrom();
  $scope.returnDate1 = FlightsSrv.getReturnDate1();
  $scope.returnTime1 = FlightsSrv.getReturnTime1();
  $scope.returnTerminal1 = FlightsSrv.getReturnTerminal1(); 

  $scope.returnTo = FlightsSrv.getReturnTo();
  $scope.returnDate2 = FlightsSrv.getReturnDate2();
  $scope.returnTime2 = FlightsSrv.getReturnTime2();
  $scope.returnTerminal2 = FlightsSrv.getReturnTerminal2(); 

  $scope.userEmail = FlightsSrv.getUserEmail();
  $scope.adultTicketsCost = FlightsSrv.getAdultTicketsCost();
  $scope.childrenTicketsCost = FlightsSrv.getChildrenTicketsCost();
  $scope.totalAmount = FlightsSrv.getTotalCost();
});
