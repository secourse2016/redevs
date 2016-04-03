App.controller('controllerFlightDetails', function($scope,$http,FlightsSrv) {

$scope.flight = FlightsSrv.getFlights();

$scope.flightOutgoing = $scope.flight[0];

$scope.flightReturning = $scope.flight[1];





});
