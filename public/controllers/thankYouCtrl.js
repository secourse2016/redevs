App.controller('thankYouCtrl', function($scope, $http,$location,FlightsSrv){
	$scope.reservationCode = FlightsSrv.getReservationNumber();
    $scope.proceed = function() {
    	$location.url('/');
    }

});