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




  var tripType = FlightsSrv.getTripType();
  var tripOriginOutgoingDate = FlightsSrv.getSelectedDepartureDate();
  var tripOriginReturningDate = FlightsSrv.getSelectedArrivalDate();
  var tripOriginAirport = FlightsSrv.getSelectedOriginAirport();
  var tripDestinationAirport = FlightsSrv.getSelectedDestinationAirport();
  var tripClass = FlightsSrv.getClass();
  var seats=parseInt(FlightsSrv.getNumberOfChildren())+parseInt(FlightsSrv.getNumberOfAdults());
  console.log(seats);

  var reformatedOutgoingDate =moment(tripOriginOutgoingDate).toDate().getTime();





  if(tripType==="OneWayTrip"){


        console.log("entered one way trip");
    FlightsSrv.getOneWayTripSearchResults(tripOriginAirport, tripDestinationAirport, reformatedOutgoingDate, tripClass,seats).then(function(response){
      $scope.outgoingFlights = response.data.outgoingFlights;
      console.log(response.data.outgoingFlights);
      $scope.flag=false;
    })


  }
  else{
    var reformatedReturningDate = moment(tripOriginReturningDate).toDate().getTime();
    console.log(tripOriginOutgoingDate);
    console.log(tripOriginReturningDate);
    console.log(reformatedReturningDate);
    console.log(reformatedOutgoingDate);
    console.log(tripOriginAirport);
    console.log(tripDestinationAirport);
    console.log(tripClass);
    $scope.flag=true;

    FlightsSrv.getRoundTripSearchResults(tripOriginAirport, tripDestinationAirport, reformatedOutgoingDate, reformatedReturningDate, tripClass,seats).then(function(response){
      $scope.outgoingFlights = response.data.outgoingFlights;
      $scope.returnFlights = response.data.returnFlights;
        console.log($scope.returnFlights);
    });




  }

       $scope.proceed = function(){
         var array=[];
         array.push($scope.gflight);
         array.push($scope.rflight);
         FlightsSrv.setFlights(array);
         $location.url('/information');
       };

$scope.convert = function(date){
  //console.log(date);
  return moment(new Date(date)).format('YYYY-MM-DD HH:mm A');
}








});
