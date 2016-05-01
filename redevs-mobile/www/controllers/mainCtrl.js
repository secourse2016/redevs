App.controller('mainCtrl', function ($scope, $ionicTabsDelegate,FlightsSrv, $state) {
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

  $scope.searchingAirlines = "Search This Airline Only";
});



App.controller('twoWayCtrl', function ($scope, $ionicTabsDelegate,FlightsSrv, $location,$state) {

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
  $scope.scope={
    fromTwoWay:'Delhi',
    toTwoWay:'Cairo',
    adultsCountTwoWay :1,
    childrenCountTwoWay:0,
    searchingAirlinesTwoWay :"Search This Airline Only",
    classTwoWay:'Business Class',
    fromDateTwoWay:'',
    toDateTwoWay :''
  };



  $scope.onClick=function() {
    var classes;
    var fromDate;
    var toDate;
    var fromCountry;
    var toCountry;

    switch ($scope.scope.classTwoWay) {
      case "Economy Class":
        classes = 'economy';
        break;
      case "Business Class":
        classes = 'business';
        break;
      case 'First Class':
        classes = 'FirstClass'

    }

    switch ($scope.scope.fromTwoWay) {
      case 'Mumbai':
        fromCountry = 'BOM';
            break;
      case 'Delhi':
        fromCountry = 'DEL';
        break;
      case 'Cairo':
        fromCountry = 'CAI';
        break;
      case 'Jeddah':
        fromCountry = 'JED';
        break;
      case 'Hong Kong':
        fromCountry = 'HKG';
        break;
      case 'Taiwan':
        fromCountry = 'TPE';
        break;
      case 'Johannesburg':
        fromCountry = 'JNB';
        break;
      case 'Cape Town':
        fromCountry = 'CPT';
        break;
      case 'Riyadh':
        fromCountry = 'RUH';
        break;
      case 'London Heathrow':
        fromCountry = 'LHR';
        break;
      case 'New York-John F. Kenndey':
        fromCountry = 'JFK';
        break;
      case 'Las Vegas':
        fromCountry = 'LCF';
        break;
      case 'Los Angeles':
        fromCountry = 'LAX';
        break;
      case 'San Francisco':
        fromCountry = 'SFO';
        break;
      case 'Frankfurt':
        fromCountry = 'FRA';
        break;
      case 'Berlin':
        fromCountry = 'TXL';
        break;
      case 'Rome':
        fromCountry = 'FCO';
        break;
      case 'Milan':
        fromCountry = 'LIN';
        break;




    }
    switch ($scope.scope.toTwoWay) {
      case 'Mumbai':
        toCountry = 'BOM';
        break;
      case 'Delhi':
        toCountry = 'DEL';
        break;
      case 'Cairo':
        toCountry = 'CAI';
        break;
      case 'Jeddah':
        toCountry = 'JED';
        break;
      case 'Hong Kong':
        toCountry = 'HKG';
        break;
      case 'Taiwan':
        toCountry = 'TPE';
        break;
      case 'Johannesburg':
        toCountry = 'JNB';
        break;
      case 'Cape Town':
        toCountry = 'CPT';
        break;
      case 'Riyadh':
        toCountry = 'RUH';
        break;
      case 'London Heathrow':
        toCountry = 'LHR';
        break;
      case 'New York-John F. Kenndey':
        toCountry = 'JFK';
        break;
      case 'Las Vegas':
        toCountry = 'LCF';
        break;
      case 'Los Angeles':
        toCountry = 'LAX';
        break;
      case 'San Francisco':
        toCountry = 'SFO';
        break;
      case 'Frankfurt':
        toCountry = 'FRA';
        break;
      case 'Berlin':
        toCountry = 'TXL';
        break;
      case 'Rome':
        toCountry = 'FCO';
        break;
      case 'Milan':
        toCountry = 'LIN';
        break;


    }


    FlightsSrv.setClass(classes);
    FlightsSrv.setTripType("RoundTrip");
    FlightsSrv.setNumberOfChildren($scope.scope.childrenCountTwoWay);
    FlightsSrv.setNumberOfAdults($scope.scope.adultsCountTwoWay);
    FlightsSrv.setOtherAirlinesSwitch($scope.scope.searchingAirlinesTwoWay);
    FlightsSrv.setSelectedOriginAirport(fromCountry);
    FlightsSrv.setSelectedDestinationAirport(toCountry);
    FlightsSrv.setSelectedDepartureDate($scope.scope.fromDateTwoWay);
    FlightsSrv.setSelectedArrivalDate($scope.scope.toDateTwoWay);
    console.log(fromCountry);
    console.log(toCountry);
    console.log(classes);
    console.log($scope.scope.searchingAirlinesTwoWay);
    console.log($scope.scope.adultsCountTwoWay);
    console.log($scope.scope.fromDateTwoWay);
    console.log($scope.scope.toDateTwoWay);
    console.log()
    $state.go('searchResults');
  }
});

App.controller('oneWayCtrl', function ($scope, $ionicTabsDelegate,FlightsSrv, $location,$state) {
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


  $scope.scope={
    fromOneWay:'Delhi',
    toOneWay:'Cairo',
    adultsCountOneWay :1,
    childrenCountOneWay:0,
    searchingAirlinesOneWay :"Search This Airline Only",
    classOneWay:'Business Class',
    fromDateOneWay:''
  };


  $scope.onClick=function() {
    var classes;
    var fromDate;
    var fromCountry;
    var toCountry;

    switch ($scope.scope.classOneWay) {
      case "Economy Class":
        classes = 'economy';
        break;
      case "Business Class":
        classes = 'business';
        break;
      case 'First Class':
        classes = 'FirstClass'

    }

    switch ($scope.scope.fromOneWay) {
      case 'Mumbai':
        fromCountry = 'BOM';
        break;
      case 'Delhi':
        fromCountry = 'DEL';
        break;
      case 'Cairo':
        fromCountry = 'CAI';
        break;
      case 'Jeddah':
        fromCountry = 'JED';
        break;
      case 'Hong Kong':
        fromCountry = 'HKG';
        break;
      case 'Taiwan':
        fromCountry = 'TPE';
        break;
      case 'Johannesburg':
        fromCountry = 'JNB';
        break;
      case 'Cape Town':
        fromCountry = 'CPT';
        break;
      case 'Riyadh':
        fromCountry = 'RUH';
        break;
      case 'London Heathrow':
        fromCountry = 'LHR';
        break;
      case 'New York-John F. Kenndey':
        fromCountry = 'JFK';
        break;
      case 'Las Vegas':
        fromCountry = 'LCF';
        break;
      case 'Los Angeles':
        fromCountry = 'LAX';
        break;
      case 'San Francisco':
        fromCountry = 'SFO';
        break;
      case 'Frankfurt':
        fromCountry = 'FRA';
        break;
      case 'Berlin':
        fromCountry = 'TXL';
        break;
      case 'Rome':
        fromCountry = 'FCO';
        break;
      case 'Milan':
        fromCountry = 'LIN';
        break;




    }
    switch ($scope.scope.toOneWay) {
      case 'Mumbai':
        toCountry = 'BOM';
        break;
      case 'Delhi':
        toCountry = 'DEL';
        break;
      case 'Cairo':
        toCountry = 'CAI';
        break;
      case 'Jeddah':
        toCountry = 'JED';
        break;
      case 'Hong Kong':
        toCountry = 'HKG';
        break;
      case 'Taiwan':
        toCountry = 'TPE';
        break;
      case 'Johannesburg':
        toCountry = 'JNB';
        break;
      case 'Cape Town':
        toCountry = 'CPT';
        break;
      case 'Riyadh':
        toCountry = 'RUH';
        break;
      case 'London Heathrow':
        toCountry = 'LHR';
        break;
      case 'New York-John F. Kenndey':
        toCountry = 'JFK';
        break;
      case 'Las Vegas':
        toCountry = 'LCF';
        break;
      case 'Los Angeles':
        toCountry = 'LAX';
        break;
      case 'San Francisco':
        toCountry = 'SFO';
        break;
      case 'Frankfurt':
        toCountry = 'FRA';
        break;
      case 'Berlin':
        toCountry = 'TXL';
        break;
      case 'Rome':
        toCountry = 'FCO';
        break;
      case 'Milan':
        toCountry = 'LIN';
        break;


    }


    FlightsSrv.setClass(classes);
    FlightsSrv.setTripType("OneWayTrip");
    FlightsSrv.setNumberOfChildren($scope.scope.childrenCountOneWay);
    FlightsSrv.setNumberOfAdults($scope.scope.adultsCountOneWay);
    FlightsSrv.setOtherAirlinesSwitch($scope.scope.searchingAirlinesOneWay);
    FlightsSrv.setSelectedOriginAirport(fromCountry);
    FlightsSrv.setSelectedDestinationAirport(toCountry);
    FlightsSrv.setSelectedDepartureDate($scope.scope.fromDateOneWay);
   
    console.log(FlightsSrv.getTripType());
    
    $state.go('searchResults');
  }
});

