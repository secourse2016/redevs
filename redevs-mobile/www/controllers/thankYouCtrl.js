App.controller('thankYouCtrl', function($scope, $http,$state,FlightsSrv){
	$scope.reservationCode = FlightsSrv.getReservationNumber();


    $scope.proceed = function() {
    	$state.go('landingPage.oneWayTrip');
    }

});
