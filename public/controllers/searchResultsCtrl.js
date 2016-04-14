App.controller('searchResultsCtrl', function($scope, FlightsSrv, $location){

  $scope.Flights=[
    {
      "flightNumber": "1",
      "aircraft": "A380",
      "capacity": "400 Passsengers",
      "date": "2016/01/25",
      "duration": "3 Hours",
      "origin": "CAI",
      "destination":"JFK",
      "economyPrice":"400",
      "firstClassPrice":"1000",
      "businessclassPrice":"700",
      "departureTime":"22:00:00",
      "arrivalTime":"24:00:00",
      "firsclassSeatMap":[],
      "economySeatMap":[],
      "businessSeatMap":[]
    },
    {
      "flightNumber": "564",
      "aircraft": "A380",
      "capacity": "400 Passsengers",
      "date": "2016/01/06",
      "duration": "3 Hours",
      "departureTime":"22:00:00",
      "arrivalTime":"24:00:00",
      "origin": "JFK",
      "destination":"CAI",
      "economyPrice":"350",
      "businessclassPrice":"700",
      "firstClassPrice":"2000",
      "firsclassSeatMap":[],
      "economySeatMap":[],
      "businessSeatMap":[]
    },
    {
      "flightNumber": "232",
      "aircraft": "A380",
      "capacity": "400 Passsengers",
      "date": "2016/05/05",
      "duration": "3 Hours",
      "departureTime":"22:00:00",
      "arrivalTime":"24:00:00",
      "origin": "CAI",
      "destination":"JFK",
      "economyPrice":"300",
      "businessclassPrice":"700",
      "firstClassPrice":"1500",
      "firsclassSeatMap":[],
      "economySeatMap":[],
      "businessSeatMap":[]
    }
  ];



  $scope.headers = ["", "Flight Number", "From", "To", "Departure Date", "Economy Price", "First Class Price"];
  $scope.FlightDetails = {};
  $scope.FlightResults = [];
  $scope.ReturnFlights = [];
  $scope.flag = false;

  $scope.FlightDetails.OriginAirport = FlightsSrv.getSelectedOriginAirport();

  $scope.FlightDetails.DestinationAirport = FlightsSrv.getSelectedDestinationAirport();

  $scope.FlightDetails.FlightDepartureDate = FlightsSrv.getSelectedDepartureDate();

  $scope.FlightDetails.FlightArrivaleDate = FlightsSrv.getSelectedArrivalDate();
  

  searchFlights = function(){
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



       $scope.proceed = function(){
         var array=[];
         array.push($scope.gflight);
         array.push($scope.rflight);
         FlightsSrv.setFlights(array);
         $location.url('/flightDetails');
       };




  searchFlights();
  returnFlights();




});