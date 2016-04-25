App.controller('paymentCtrl',function($scope,$http, FlightsSrv,$location,stripe) {
  //$scope

    $scope.name = "";
    $scope.creditNumber = 0;
    $scope.CVC=0;
    $scope.month=0;
    $scope.year=0;





  $scope.submit = function(){
    //  FlightsSrv.setName($scope.name);
    //  FlightsSrv.setCreditCardNumber($scope.creditNumber);
    //  FlightsSrv.setCVC($scope.CVC);
    //  FlightsSrv.setMonth($scope.month);
    //  FlightsSrv.setYear($scope.year);
    stripe.card.createToken({
        number: $scope.creditNumber,
        cvc : $scope.CVC,
        exp_month:$scope.month,
        exp_year:$scope.year
    },function(status,response){
      if(response.error){
        console.log(response.error);
        console.log($scope.year);
      }else{
      var data = {
           		tripType:FlightsSrv.getTripType(),
          		flights:FlightsSrv.getFlights(),
          		adults:FlightsSrv.getAdultsInfo(),
          		children:FlightsSrv.getChildrenInfo(),
          		classs:FlightsSrv.getClass(),
              token:response.id

          	};

            FlightsSrv.postReservation(data).success(function(response,status){
            FlightsSrv.setReservationNumber(response.time);
             $location.url('/thankYou');
            });

      }
    });





























  }



});
