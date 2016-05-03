App.controller('paymentCtrl',function($scope,$http, FlightsSrv,$location,stripe) {
  //$scope

    $scope.name = "";
    $scope.creditNumber = 0;
    $scope.CVC=0;
    $scope.month=0;
    $scope.year=0;
    $scope.date=0;

var flights = FlightsSrv.getFlights();
var adults = FlightsSrv.getAdultsInfo();
var children = FlightsSrv.getChildrenInfo();
var passengerDetails = [];
for(var i = 0;i<adults;i++){
  var object = {
    firstName: adults[i].firstName, // (required)
    lastName:  adults[i].lastName,  // (required)
    passportNum:  adults[i].passNum, // (required)        passportExpiryDate: Date.GetTime(), // (optional)
    dateOfBirth: 1,
    nationality:  adults[i].passNationality, // (optional)
    email:  adults[i].email
  };
  passengerDetails.push(object);
}



for(var i = 0;i<children;i++){
  var object = {
    firstName: children[i].firstName, // (required)
    lastName:  children[i].lastName,  // (required)
    passportNum:  children[i].passNum, // (required)        passportExpiryDate: Date.GetTime(), // (optional)
    dateOfBirth: 1,
    nationality:  children[i].passNationality, // (optional)
    email:  children[i].email
  };
  passengerDetails.push(object);
}



  $scope.submit = function(){

    console.log($scope.date.getYear());
if(FlightsSrv.getTripType()==="OneWayTrip"){
  if(flights[0].Airline==="Delta Airlines"){
    stripe.card.createToken({
        number: $scope.creditNumber,
        cvc : $scope.CVC,
        exp_month:("0" + ($scope.date.getMonth() + 1)).slice(-2),
        exp_year:$scope.date.getFullYear()
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

  }else{



    stripe.card.createToken({
        number: $scope.creditNumber,
        cvc : $scope.CVC,
        exp_month:$scope.month,
        exp_year:$scope.year
    },function(status,response){
      if(response.error){
        console.log(response.error);
      }else{
        var data={
          passengerDetails : passengerDetails,
          outgoingFlightId:flights[0].flightId,
          cost:FlightsSrv.getTotalCost(),
          paymentToken:response.id
        };
      }
  });
}



  }else{
    if(flights[0].Airline==="Delta Airlines" && flights[1].Airline==="Delta Airlines" ){
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
               $state.go('thankYou');
              });

        }
      });
    }else if(flights[0].Airline==="Delta Airlines"){
      ;
    }else{
      ;
    }
  }

}

});
