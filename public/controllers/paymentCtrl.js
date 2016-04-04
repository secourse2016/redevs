App.controller('paymentCtrl',function($scope, FlightsSrv,$location) {
  //$scope

    $scope.name = "";
    $scope.creditNumber = 0;
    $scope.CVC=0;
    $scope.month=0;
    $scope.year=0;


  $scope.submit = function(){
     FlightsSrv.setName($scope.name);
     FlightsSrv.setCreditCardNumber($scope.creditNumber);
     FlightsSrv.setCVC($scope.CVC);
     FlightsSrv.setMonth($scope.month);
     FlightsSrv.setYear($scope.year);
     $location.url('/');

  }



});
