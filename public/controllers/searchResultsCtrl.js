App.controller('searchResultsCtrl', function($scope, FlightsSrv, $location,$window){





  $scope.headers = ["", "Flight Number", "From", "To", "Departure Date", "Price", "Class","AirLine"];
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
  var seats=FlightsSrv.getNumberOfChildren()+FlightsSrv.getNumberOfAdults();

  var reformatedOutgoingDate =moment(tripOriginOutgoingDate).toDate().getTime();




  if(FlightsSrv.getOtherAirlinesSwitch()==="Search For Flights in Delta Only") {

    if (tripType === "OneWayTrip") {


      console.log("entered one way trip");
      FlightsSrv.getOneWayTripSearchResults(tripOriginAirport, tripDestinationAirport, reformatedOutgoingDate, tripClass, seats).then(function (response) {
        $scope.outgoingFlights = response.data.outgoingFlights;
        console.log(response.data.outgoingFlights);
        $scope.flag = false;
      })


    }
    else {
      var reformatedReturningDate = moment(tripOriginReturningDate).toDate().getTime();

      $scope.flag = true;

      FlightsSrv.getRoundTripSearchResults(tripOriginAirport, tripDestinationAirport, reformatedOutgoingDate, reformatedReturningDate, tripClass, seats).then(function (response) {
        $scope.outgoingFlights = response.data.outgoingFlights;
        $scope.returnFlights = response.data.returnFlights;
        console.log($scope.returnFlights);
      });


    }
  }
  else{

    if (tripType === "OneWayTrip") {
      FlightsSrv. getOneWayTripSearchResultsOtherAirlines(tripOriginAirport, tripDestinationAirport, reformatedOutgoingDate, tripClass, seats).then(function (response) {
        $scope.outgoingFlights = response.data.outgoingFlights;
        console.log(response.data.outgoingFlights);
        $scope.flag = false;
      })


    }else{
      reformatedReturningDate = moment(tripOriginReturningDate).toDate().getTime();
      $scope.flag = true;
      console.log("entered 2 way other airlines");
      FlightsSrv.getTwoWayTripSearchResultsOtherAirlines(tripOriginAirport, tripDestinationAirport, reformatedOutgoingDate, reformatedReturningDate, tripClass, seats).then(function (response) {


        $scope.outgoingFlights = response.data.outgoingFlights;
        $scope.returnFlights = response.data.returnFlights;
        console.log($scope.outgoingFlights);
        console.log($scope.returnFlights);
        $scope.flag = true;
      })

    }






  }

       $scope.proceed = function(){
         var array=[];

         if(FlightsSrv.getTripType()==="RoundTrip") {
           if (($scope.gflight === undefined || $scope.gflight === null)||
               ($scope.rflight === undefined || $scope.rflight === null)){

             $window.alert('Please Select 2 Trips!!!');

           } else {
             array.push($scope.rflight.flight);
             array.push($scope.gflight.flight);
             FlightsSrv.setFlights(array);
             $location.url('/information');
           }
         }
         else{
           console.log($scope.gflight);
           if ($scope.gflight === undefined || $scope.gflight=== null){
             console.log("popup");
             $window.alert('Please Select 1 Trip!!');


           } else {
             array.push($scope.gflight.flight);
             FlightsSrv.setFlights(array);
             $location.url('/information');
           }


         }
       };

$scope.convert = function(date){
  //console.log(date);
  return moment(new Date(date)).format('YYYY-MM-DD HH:mm A');
}








});
