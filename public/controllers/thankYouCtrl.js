App.controller('thankYouCtrl', function($scope, $http,$location,FlightsSrv){

    $scope.proceed = function() {
    	$location.url('/');
    }

});