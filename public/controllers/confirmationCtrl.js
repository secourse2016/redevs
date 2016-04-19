/**
 * Main Controller */
App.controller('confirmationCtrl', function($scope, FlightsSrv, $location) {
  $scope.childrenTickets = FlightsSrv.getNumberOfChildren(); 
  $scope.adultTickets = FlightsSrv.getNumberOfAdults(); 
  $scope.classOfTickets = FlightsSrv.getClass(); 

  $scope.flights = FlightsSrv.getFlights();

  $scope.thereAreAdults = !($scope.adultTickets === 0);
  $scope.thereAreChildren = !($scope.childrenTickets === 0);

 $scope.goToCheckOut = function(){
   $location.url('/payment');
 }


$scope.convertToDate = function(date){
  return moment(new Date(date)).format('YYYY-MM-DD');
}

$scope.convertToTime = function(date){
  return moment(new Date(date)).format('HH:mm A');
}

$scope.calculateAdultCost = function() {
  //$scope.flights[0].cost is the cost of 1 adult! 
  var price = 0;
  if($scope.flights.length === 1){
    price =  $scope.flights[0].cost*$scope.adultTickets;
  } else if($scope.flights.length === 2){
      price = $scope.flights[0].cost*$scope.adultTickets + $scope.flights[1].cost*$scope.adultTickets;

  }

  $scope.adultCost = price;
  return price;

}

$scope.calculateChildrenCost = function() {
  //$scope.flights[0].cost is the cost of 1 adult! 
  var price = 0; 
  if($scope.flights.length === 1){
    price =  $scope.flights[0].cost*$scope.childrenTickets*0.5;
  } else if($scope.flights.length === 2){
      price = $scope.flights[0].cost*$scope.childrenTickets*0.5 + $scope.flights[1].cost*$scope.childrenTickets*0.5;

  }

  $scope.childrenCost = price;
  return price;
}

$scope.totalAmount = $scope.calculateAdultCost() + $scope.calculateChildrenCost(); 

});
