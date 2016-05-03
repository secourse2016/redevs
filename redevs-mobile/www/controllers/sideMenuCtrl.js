App.controller('sideMenuCtrl', function($scope,$state,$http,$ionicSideMenuDelegate,$location){


  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.home = function() {
    $state.go('thankYou');
  }

  $scope.reservation = function(){
    $state.go('reservationSearch');
  }
  $scope.landingPage = function(){
    $state.transitionTo("landingPage.oneWayTrip");
  }


});
