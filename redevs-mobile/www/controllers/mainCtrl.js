App.controller('mainCtrl', function ($scope, $ionicTabsDelegate,FlightsSrv, $location) {
  $scope.goForward = function () {
    var selected = $ionicTabsDelegate.selectedIndex();
    if (selected != -1) {
      $ionicTabsDelegate.select(selected + 1);
    }
  };

  $scope.goBack = function () {
    var selected = $ionicTabsDelegate.selectedIndex();
    if (selected != -1 && selected != 0) {
      $ionicTabsDelegate.select(selected - 1);
    }
  };

  $scope.searchingAirlines="Search This Airline Only";


/*


  function AirportCodes() {
    FlightsSrv.getAirportCodes().success(function(airports) {
      $scope.Airports = airports;
      console.log(airports);
    });
  }

  AirportCodes();
  $scope.Airports=$scope.Airports.sort(function(a, b) {

    var airlineA = a.name.toLowerCase();
    var airlineB = b.name.toLowerCase();

    if (airlineA > airlineB) return 1;
    if (airlineA < airlineB) return -1;
    return 0;
  });

 // /!* Record User's Selected Origin Airport  *!/
  $scope.SetOriginAirport = function(originAirport) {
    FlightsSrv.setSelectedOriginAirport(originAirport);
  };

 // /!* Record User's Selected Destination Airport  *!/
  $scope.SetDestinationAirport = function(destAirport) {
    FlightsSrv.setSelectedDestinationAirport(destAirport);
  };


 $scope.SearchFlights = function() {
    FlightsSrv.setSelectedDepartureDate($scope.dtFrom);
    FlightsSrv.setSelectedArrivalDate($scope.dtTo);

    FlightsSrv.setClass($scope.radioModel);
    FlightsSrv.setTripType($scope.radioModel2);
    FlightsSrv.setNumberOfChildren($scope.childrenInput);
    FlightsSrv.setNumberOfAdults($scope.adultsInput);
    FlightsSrv.setOtherAirlinesSwitch($scope.enabled);
    //FlightsSrv.setTripType($scope.checkboxModel.valuecheck);
   // $location.url('/searchResults');
  };



  /!*$scope.searchReservation = function() {
    reservationSearchSrv.setReservationNumber($scope.ticketCodeTextBox);
    $location.url('/reservationSearch');
  };
*/

});
