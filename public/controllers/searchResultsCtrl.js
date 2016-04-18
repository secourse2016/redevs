App.controller('searchResultsCtrl', function($scope, FlightsSrv, $location){





  $scope.headers = ["", "Flight Number", "From", "To", "Departure Date", "Price", "Class"];
  $scope.FlightDetails = {};
  $scope.FlightResults = [];
  $scope.ReturnFlights = [];
  $scope.flag = false;

  $scope.FlightDetails.OriginAirport = FlightsSrv.getSelectedOriginAirport();

  $scope.FlightDetails.DestinationAirport = FlightsSrv.getSelectedDestinationAirport();

  $scope.FlightDetails.FlightDepartureDate = FlightsSrv.getSelectedDepartureDate();

  $scope.FlightDetails.FlightArrivaleDate = FlightsSrv.getSelectedArrivalDate();


/*  searchFlights = function(){
    for (var i = 0; i < $scope.Flights.length; i++) {
      if($scope.FlightDetails.OriginAirport===$scope.Flights[i].origin && $scope.FlightDetails.DestinationAirport===$scope.Flights[i].destination){
        $scope.FlightResults.push($scope.Flights[i]);
        $scope.flag=true;
      }
      //console.log($scope.FlightDetails.OriginAirport.iata + $scope.Flights[0].origin);
      //console.log(JSON.stringify($scope.FlightDetails.OriginAirport.iata));
    }
  };

    returnFlights  = function(){
      for (var i = 0; i < $scope.Flights.length; i++) {
        if($scope.FlightDetails.OriginAirport===$scope.Flights[i].destination && $scope.FlightDetails.DestinationAirport===$scope.Flights[i].origin){
          $scope.ReturnFlights.push($scope.Flights[i]);

        }
      }
    };

*/
  var tripType = FlightsSrv.getTripType();
  var tripOriginOutgoingDate = FlightsSrv.getSelectedDepartureDate();
  var tripOriginReturningDate = FlightsSrv.getSelectedArrivalDate();
  var tripOriginAirport = FlightsSrv.getSelectedOriginAirport();
  var tripDestinationAirport = FlightsSrv.getSelectedDestinationAirport();
  var tripClass = FlightsSrv.getClass();

  var reformatedOutgoingDate = tripOriginOutgoingDate.getFullYear()+'-'+'0'+tripOriginOutgoingDate.getMonth()+'-'+tripOriginOutgoingDate.getDate();



  console.log(tripType);
  console.log(tripOriginOutgoingDate);
  console.log(tripOriginReturningDate);
  console.log(reformatedReturningDate);
  console.log(reformatedOutgoingDate);
  console.log(tripOriginAirport);
  console.log(tripDestinationAirport);
  console.log(tripClass);


  if(tripType==="OneWayTrip"){
        console.log("entered one way trip")
    var OneFlightsArray = FlightsSrv.getOneWayTripSearchResults(tripOriginAirport, tripDestinationAirport, reformatedOutgoingDate, tripClass);
    $scope.outgoingFlights = OneFlightsArray;
    console.log(outgoingFlights);
  }
  else{
    var reformatedReturningDate = tripOriginReturningDate.getFullYear()+'-'+'0'+tripOriginReturningDate.getMonth()+'-'+tripOriginReturningDate.getDate();
    var TwoFlightsArray = FlightsSrv.getRoundTripSearchResults(tripOriginAirport, tripDestinationAirport, reformatedOutgoingDate, reformatedReturningDate, tripClass);
    $scope.outgoingFlights = TwoFlightsArray.outgoingFlights;
    $scope.returnFlights = TwoFlightsArray.returnFlights;
  }

       $scope.proceed = function(){
         var array=[];
         array.push($scope.gflight);
         array.push($scope.rflight);
         FlightsSrv.setFlights(array);
         $location.url('/flightDetails');
       };









});
