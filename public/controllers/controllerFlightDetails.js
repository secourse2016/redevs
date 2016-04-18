App.controller('controllerFlightDetails', function($scope,$http,FlightsSrv,$location) {

$scope.flight = FlightsSrv.getFlights();

$scope.flightOutgoing = $scope.flight[0];
$scope.date1=$scope.flightOutgoing.departureDateTime;
$scope.time1=moment($scope.date1).format('hh:mm A');
$scope.date1=moment($scope.date1).format('YYYY-MM-DD');
$scope.arrival1=moment($scope.flightOutgoing.arrivalDateTime).format('HH:mm A');



$scope.flightReturning = $scope.flight[1];
$scope.date2=$scope.flightReturning.departureDateTime;
$scope.time2=moment($scope.date2).format('hh:mm A');
$scope.date2=moment($scope.date2).format('YYYY-MM-DD');
$scope.arrival2=moment($scope.flightReturning.arrivalDateTime).format('HH:mm A');





$scope.proceed = function (){

	FlightsSrv.setNumberOfChildren($scope.childrenInput);
	FlightsSrv.setNumberOfAdults($scope.adultsInput);

	$location.url('/information');
}





});
