App.controller('paymentCtrl',function($scope,$http, FlightsSrv,$location,stripe) {
  //$scope

    $scope.name = "";
    $scope.creditNumber = 0;
    $scope.CVC=0;
    $scope.month=0;
    $scope.year=0;

var flights = FlightsSrv.getFlights();
var adults = FlightsSrv.getAdultsInfo();
var children = FlightsSrv.getChildrenInfo();
var passengerDetails = [];
for(var i = 0;i<adults;i++){
  var object = {
    firstName: adults[i].firstName, // (required)
    lastName:  adults[i].lastName,  // (required)
    passportNum:  adults[i].passNum, // (required)        passportExpiryDate: Date.GetTime(), // (optional)
    dateOfBirth: adults[i].dateOfBirth,
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
    dateOfBirth: children[i].dateOfBirth,
    nationality:  children[i].passNationality, // (optional)
    email:  children[i].email
  };
  passengerDetails.push(object);
}
    var getURL = function(airline){
      switch(airline){
        case "Austrian": return "http://ec2-52-90-41-197.compute-1.amazonaws.com"; break;
        case "Turkish Airlines": return "http://52.27.150.19" ; break ;
        case "KLM": return "http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com";break;
        case "AirFrance": return "http://52.26.173.245" ; break;
        case "Swiss Air": return "http://swiss-air.me" ; break ;
        case "Air Berlin": return "http://ec2-52-38-101-89.us-west-2.compute.amazonaws.com" ;  break;
        case "Hawaiian": return "http://54.93.36.94"; break ;
        case "Air Madagascar": console.log("z");return "http://54.191.202.17"; ;break;
        case "AirNewZealand": return "http://52.28.246.230"; break;
        case "IBERIA": return "52.58.24.76" ; break;

      }
    };


  $scope.submit = function(){
    console.log(FlightsSrv.getTripType());
if(FlightsSrv.getTripType()==="OneWayTrip"){
  if(flights[0].Airline==="Delta Airlines"){

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

  }else{
    var url = getURL(flights[0].Airline);
    console.log(flights[0]);
    console.log(flights[0].Airline);
    console.log(url);


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
               $location.url('/thankYou');
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
