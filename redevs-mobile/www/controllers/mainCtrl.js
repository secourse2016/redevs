App.controller('twoWayCtrl', function ($scope, $ionicTabsDelegate,FlightsSrv, $location) {

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

  $scope.searchingAirlinesTwoWay = "Search This Airline Only";
  $scope.classTwoWay='Business Class';
  $scope.fromTwoWay='Delhi';
  $scope.toTwoWay='Cairo';


  $scope.onClick=function() {
    var classes;
    var fromDate;
    var toDate;
    var fromCountry;
    var toCountry;

    switch ($scope.classTwoWay) {
      case "Economy Class":
        classes = 'economy';
        break;
      case "Business Class":
        classes = 'business';
        break;
      case 'First Class':
        classes = 'FirstClass'

    }

    switch ($scope.fromTwoWay) {
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
    switch ($scope.toTwoWay) {
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
    FlightsSrv.setNumberOfChildren($scope.childrencountTwoWay);
    FlightsSrv.setNumberOfAdults($scope.adultscountTwoWay);
    FlightsSrv.setOtherAirlinesSwitch($scope.searchingAirlinesTwoWay);
    FlightsSrv.setSelectedOriginAirport(fromCountry);
    FlightsSrv.setSelectedDestinationAirport(toCountry);
    FlightsSrv.setSelectedDepartureDate($scope.fromDateTwoWay);
    FlightsSrv.setSelectedArrivalDate($scope.toDateTwoWay);
    console.log(fromCountry);
    console.log(toCountry);
    console.log(classes);
    console.log($scope.searchingAirlinesTwoWay);
    console.log($scope.adultsCountTwoWay);
    console.log($scope.fromDateTwoWay);
    console.log($scope.toDateTwoWay);
  }
});

App.controller('oneWayCtrl', function ($scope, $ionicTabsDelegate,FlightsSrv, $location) {
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

  $scope.searchingAirlinesOneWay = "Search This Airline Only";
  $scope.classOneWay='Business Class';
  $scope.fromOneWay='Delhi';
  $scope.toOneWay='Cairo';

  $scope.onClick=function() {
    var classes;
    var fromDate;
    var fromCountry;
    var toCountry;

    switch ($scope.classOneWay) {
      case "Economy Class":
        classes = 'economy';
        break;
      case "Business Class":
        classes = 'business';
        break;
      case 'First Class':
        classes = 'FirstClass'

    }

    switch ($scope.fromOneWay) {
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
    switch ($scope.toOneWay) {
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
    FlightsSrv.setNumberOfChildren($scope.childrencountTwoWay);
    FlightsSrv.setNumberOfAdults($scope.adultscountTwoWay);
    FlightsSrv.setOtherAirlinesSwitch($scope.searchingAirlinesTwoWay);
    FlightsSrv.setSelectedOriginAirport(fromCountry);
    FlightsSrv.setSelectedDestinationAirport(toCountry);
    FlightsSrv.setSelectedDepartureDate($scope.fromDateTwoWay);
    console.log(fromCountry);
    console.log(toCountry);
    console.log(classes);
    console.log($scope.adultscountTwoWay);
    console.log($scope.fromDateTwoWay);
  }
});

