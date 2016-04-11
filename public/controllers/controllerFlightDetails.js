App.controller('controllerFlightDetails', function($scope,$http,FlightsSrv,$location) {

$scope.flight = FlightsSrv.getFlights();

$scope.flightOutgoing = $scope.flight[0];

$scope.flightReturning = $scope.flight[1];


$scope.proceed = function (){

	FlightsSrv.setNumberOfChildren($scope.childrenInput);
	FlightsSrv.setNumberOfAdults($scope.adultsInput);

	$location.url('/information');
}


});
