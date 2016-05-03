App.controller('controllerFlightDetails', function($scope,$http,FlightsSrv,$location) {

$scope.flight = FlightsSrv.getFlights();

if(FlightsSrv.getTripType()=== "RoundTrip"){
$scope.flightOutgoing = $scope.flight[0];



$scope.flightReturning = $scope.flight[1];
}else{
	$scope.flightOutgoing = $scope.flight[0];
	$scope.flightReturning={};
	$scope.flightReturning.cost = 0;
	$scope.flightReturning.departureDateTime = "";
	$scope.flightReturning.arrivalDateTime = "";
}






$scope.proceed = function (){
	console.log($scope.totalCost);
	FlightsSrv.setTotalCost($scope.totalCost);
	console.log(FlightsSrv.getTotalCost());
	FlightsSrv.setNumberOfChildren($scope.childrenInput);
	FlightsSrv.setNumberOfAdults($scope.adultsInput);

	$location.url('/information');
}





});
