
App.controller('mainCtrl', function($scope,FlightsSrv,reservationSearchSrv, $location,$window) {

    /*----------- Angular Bootstrap Datepicker -----------*/
    $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.adultsInput = 1;
    $scope.childrenInput = 0;


    var date = new Date();
    $scope.minDate = date.setDate((new Date()).getDate() - 90);

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };


    $scope.dateOptions = {

        formatYear: 'yy',
        maxDate: new Date(2020, 4, 31),
        minDate: new Date(),
        startingDay: 1
    };

    $scope.setDate = function (year, month, day) {
        $scope.dtTo = new Date(year, month, day);
        $scope.dtFrom = new Date(year, month, day);

    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };


    // checkbox
     $scope.checkboxModel = {
         valuecheck: 'round-trip'
     };

    $scope.onChange = function(tripType) {
      $scope.checkboxModel.valuecheck=tripType;

    };
    $scope.enabled = true;
    $scope.label= "Search For Flights in Other Airlines";


    $scope.changeCallback = function() {
        if($scope.enabled)
            $scope.label="Search For Flights in Other Airlines";
        else
            $scope.label="Search For Flights in Delta Only";
    };








    function AirportCodes() {
        FlightsSrv.getAirportCodes().success(function(airports) {
            $scope.Airports = airports;
        });
    }

    /* Record User's Selected Origin Airport  */
    $scope.SetOriginAirport = function(originAirport) {
        FlightsSrv.setSelectedOriginAirport(originAirport);
    };

    /* Record User's Selected Destination Airport  */
    $scope.SetDestinationAirport = function(destAirport) {
        FlightsSrv.setSelectedDestinationAirport(destAirport);
    };
        $scope.radioModel2='OneWayTrip';
        $scope.radioModel='business';
    /* Find All Available Flights  */
    $scope.SearchFlights = function() {

        if ($scope.radioModel2 == 'OneWayTrip') {

            console.log($scope.dtFrom);

            if (($scope.dtFrom == undefined)
                || ($scope.adultsInput <= 0) || ($scope.childrenInput < 0)
                || ($scope.radioModel == undefined) || ($scope.selectedDestination == undefined) ||
                ($scope.selectedOrigin == undefined)) {
                $window.alert('Please Make sure you chose a Class,Origin,Desitination,a Departure Date, and trip Type ');

                ///put pop up

            } else {
                FlightsSrv.setSelectedDepartureDate($scope.dtFrom);
                FlightsSrv.setSelectedArrivalDate($scope.dtTo);

                FlightsSrv.setClass($scope.radioModel);
                FlightsSrv.setTripType($scope.radioModel2);
                FlightsSrv.setNumberOfChildren($scope.childrenInput);
                FlightsSrv.setNumberOfAdults($scope.adultsInput);

                FlightsSrv.setOtherAirlinesSwitch($scope.label);
                //FlightsSrv.setTripType($scope.checkboxModel.valuecheck);
                $location.url('/searchResults');
            }
        } else {
            if (($scope.dtFrom == undefined || $scope.dtTo == undefined)
                || ($scope.adultsInput <= 0) || ($scope.childrenInput < 0)
                || ($scope.radioModel == undefined) || ($scope.selectedDestination == undefined) ||
                ($scope.selectedOrigin == undefined)) {
                $window.alert('Please Make sure you chose a Class,Origin,Desitination,Departure Dates, and trip Type ');

                ///put pop up

            } else {
                FlightsSrv.setSelectedDepartureDate($scope.dtFrom);
                FlightsSrv.setSelectedArrivalDate($scope.dtTo);

                FlightsSrv.setClass($scope.radioModel);
                FlightsSrv.setTripType($scope.radioModel2);
                FlightsSrv.setNumberOfChildren($scope.childrenInput);
                FlightsSrv.setNumberOfAdults($scope.adultsInput);

                FlightsSrv.setOtherAirlinesSwitch($scope.label);
                //FlightsSrv.setTripType($scope.checkboxModel.valuecheck);
                $location.url('/searchResults');
            }


        }

    };



    $scope.searchReservation = function() {
        reservationSearchSrv.setReservationNumber($scope.ticketCodeTextBox);
        $location.url('/reservationSearch');
    };

    /* Get Airports on page render  */
    AirportCodes();

    $scope.checkModel = {
        economyBtn: false,
        businessBtn: true,
        firstBtn: false
    };

    $scope.checkResults = [];





    $scope.$watchCollection('checkModel', function () {
        $scope.checkResults = null;
        angular.forEach($scope.checkModel, function (value, key) {
            if (value) {
                $scope.checkResults=key;


            }
        });
    });




    $scope.checkTripType = {
        roundTripBtn: false,
        oneWayBtn: true

    };

    $scope.checkResultsTrip = [];





    $scope.$watchCollection('checkTripType', function () {
        $scope.checkResultsTrip = null;
        angular.forEach($scope.checkTripType, function (value, key) {
            if (value) {
                $scope.checkResultsTrip=key;


            }
        });
    });












});
