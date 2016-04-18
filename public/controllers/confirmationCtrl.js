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
  if($scope.flights.length === 1){
    return $scope.flights([0].cost);
  } else if($scope.flights.length === 2){
        return $scope.flights[0].cost + $scope.flights[1].cost;

  }
}

$scope.calculateChildrenCost = function() {
  //$scope.flights[0].cost is the cost of 1 adult! 
  if($scope.flights.length === 1){
    return $scope.flights([0].cost / 2);
  } else if($scope.flights.length === 2){
        return $scope.flights[0].cost*0.5+ $scope.flights[1].cost*0.5;
  }
}

});
