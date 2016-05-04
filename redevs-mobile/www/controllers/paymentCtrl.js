App.controller('paymentCtrl',function($scope,$http, FlightsSrv,$location,stripe,$state,$ionicPopup,$ionicLoading) {

    $scope.name = "";
    $scope.creditNumber = 0;
    $scope.CVC=0;
    $scope.month=0;
    $scope.year=0;

    $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
        $ionicLoading.hide();
  };

    var flights = FlightsSrv.getFlights();
    var adults = FlightsSrv.getAdultsInfo();
    var children = FlightsSrv.getChildrenInfo();

    var passengerDetails = [];
    for(var i = 0;i<adults.length;i++){
      var object = {
        firstName: adults[i].firstName, // (required)
        lastName:  adults[i].lastName,  // (required)
        passportNum:  adults[i].passNumber, // (required)        passportExpiryDate: Date.GetTime(), // (optional)
        dateOfBirth: adults[i].dateOfBirth,
        nationality:  adults[i].passNationality, // (optional)
        email:  adults[i].email
      };
      passengerDetails.push(object);
    }



    for(var i = 0;i<children.length;i++){
      var object = {
        firstName: children[i].firstName, // (required)
        lastName:  children[i].lastName,  // (required)
        passportNum:  children[i].passNumber, // (required)        passportExpiryDate: Date.GetTime(), // (optional)
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
        case "Air Madagascar": console.log("z");return "http://54.191.202.17"; break;
        case "AirNewZealand": return "http://52.28.246.230"; break;
        case "IBERIA": return "52.58.24.76" ; break;

      }
    };


    $scope.submit = function(){


      if(($scope.name===undefined) ||($scope.creditNumber===undefined)||($scope.CVC===undefined)|| ($scope.date===undefined)){
        $ionicPopup.alert({
          title: 'Credit Card Information is Wrong ',
          template: 'Please revise all credit card info inorder to continue the transaction properly!!'
        });




      }
      else{



      $scope.show($ionicLoading);

      console.log(FlightsSrv.getTripType());
      if(FlightsSrv.getTripType()==="OneWayTrip"){
        if(flights[0].Airline==="Delta Airlines"){

          stripe.card.createToken({
            number: $scope.creditNumber,
            cvc : $scope.CVC,
            exp_month:("0" + ($scope.date.getMonth() + 1)).slice(-2),
            exp_year:$scope.date.getFullYear()
          },function(status,response){
            if(response.error){
              $ionicPopup.alert({
                title: 'Credit Card Information is Wrong ',
                template: response.error
              });
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
                $scope.hide($ionicLoading);
                FlightsSrv.setReservationNumber(response.time);
                $location.url('/thankYou');
              });

            }
          });

        }else{

          var url = getURL(flights[0].Airline);
          FlightsSrv.otherAirlinePubKey(url).success(function(response,status){
            stripe.setPublishableKey(response);
            stripe.card.createToken({
              number: $scope.creditNumber,
              cvc : $scope.CVC,
              exp_month:("0" + ($scope.date.getMonth() + 1)).slice(-2),
              exp_year:$scope.date.getFullYear()
            },function(status,response){
              if(response.error){
                $ionicPopup.alert({
                  title: 'Credit Card Information is Wrong ',
                  template: response.error
                });
              }else{
                var data={
                  passengerDetails : passengerDetails,
                  outgoingFlightId:flights[0].flightId,
                  cost:parseInt(FlightsSrv.getTotalCost()),
                  paymentToken:response.id,
                  class:FlightsSrv.getClass()
                };
                console.log(data);

                FlightsSrv.otherAirlineBooking(url,data).success(function(response,status){
                  stripe.setPublishableKey('pk_test_lnXZPy220d1EMqYfHlOj1XOt');
                  FlightsSrv.setReservationNumber(response.refNum);
                  console.log(response);
                  $scope.hide($ionicLoading);
                  $location.url('/thankYou');
                });
              }
            });
          });

        }



      }else {
        if (flights[0].Airline === "Delta Airlines" && flights[1].Airline === "Delta Airlines") {
          stripe.card.createToken({
            number: $scope.creditNumber,
            cvc: $scope.CVC,
            exp_month: ("0" + ($scope.date.getMonth() + 1)).slice(-2),
            exp_year: $scope.date.getFullYear()
          }, function (status, response) {
            if (response.error) {
              $ionicPopup.alert({
                title: 'Credit Card Information is Wrong ',
                template: response.error
              });
            } else {
              var data = {
                tripType: FlightsSrv.getTripType(),
                flights: FlightsSrv.getFlights(),
                adults: FlightsSrv.getAdultsInfo(),
                children: FlightsSrv.getChildrenInfo(),
                classs: FlightsSrv.getClass(),
                token: response.id

              };

              FlightsSrv.postReservation(data).success(function (response, status) {
                FlightsSrv.setReservationNumber(response.time);
                $scope.hide($ionicLoading);
                $location.url('/thankYou');
              });

            }
          });
        } else if (flights[0].Airline === "Delta Airlines" && flights[1].Airline != "Delta Airlines") {
          var f1;
          var f2;
          //Reserve the first ticket
          stripe.card.createToken({
            number: $scope.creditNumber,
            cvc: $scope.CVC,
            exp_month: ("0" + ($scope.date.getMonth() + 1)).slice(-2),
            exp_year: $scope.date.getFullYear()
          }, function (status, response) {
            if (response.error) {
              $ionicPopup.alert({
                title: 'Credit Card Information is Wrong ',
                template: response.error
              });
            } else {
              var data = {
                tripType: "OneWayTrip",
                flights: [FlightsSrv.getFlights()[0]],
                adults: FlightsSrv.getAdultsInfo(),
                children: FlightsSrv.getChildrenInfo(),
                classs: FlightsSrv.getClass(),
                token: response.id

              };

              FlightsSrv.postReservation(data).success(function (response, status) {
                f1 = response.time;
                var url = getURL(flights[1].Airline);
                FlightsSrv.otherAirlinePubKey(url).success(function (response, status) {
                  stripe.setPublishableKey(response);
                  stripe.card.createToken({
                    number: $scope.creditNumber,
                    cvc: $scope.CVC,
                    exp_month: ("0" + ($scope.date.getMonth() + 1)).slice(-2),
                    exp_year: $scope.date.getFullYear()
                  }, function (status, response) {
                    if (response.error) {
                      $ionicPopup.alert({
                        title: 'Credit Card Information is Wrong ',
                        template: response.error
                      });
                    } else {
                      var data = {
                        passengerDetails: passengerDetails,
                        outgoingFlightId: flights[1].flightId,
                        cost: parseInt(flights[1].cost),
                        paymentToken: response.id,
                        class: FlightsSrv.getClass()
                      };
                      console.log(data);

                      FlightsSrv.otherAirlineBooking(url, data).success(function (response, status) {
                        stripe.setPublishableKey('pk_test_lnXZPy220d1EMqYfHlOj1XOt');
                        FlightsSrv.setReservationNumber("Flight 1 ref = " + f1 + " Flight 2 ref = " + response.refNum);
                        console.log(response);
                        $scope.hide($ionicLoading);
                        $location.url('/thankYou');
                      });
                    }
                  });
                });

              });

            }
          });
          // reserve the second ticket


        } else if (flights[0].Airline != "Delta Airlines" && flights[1].Airline == "Delta Airlines") {
          var url = getURL(flights[0].Airline);
          FlightsSrv.otherAirlinePubKey(url).success(function (response, status) {
            stripe.setPublishableKey(response);
            stripe.card.createToken({
              number: $scope.creditNumber,
              cvc: $scope.CVC,
              exp_month: ("0" + ($scope.date.getMonth() + 1)).slice(-2),
              exp_year: $scope.date.getFullYear()
            }, function (status, response) {
              if (response.error) {
                $ionicPopup.alert({
                  title: 'Credit Card Information is Wrong ',
                  template: response.error
                });
              } else {
                var data = {
                  passengerDetails: passengerDetails,
                  outgoingFlightId: flights[0].flightId,
                  cost: parseInt(flights[0].cost),
                  paymentToken: response.id,
                  class: FlightsSrv.getClass()
                };
                console.log(data);

                FlightsSrv.otherAirlineBooking(url, data).success(function (response, status) {
                  stripe.setPublishableKey('pk_test_lnXZPy220d1EMqYfHlOj1XOt');
                  FlightsSrv.setReservationNumber("Flight 1 ref = " + response.refNum);
                  console.log(response);
                  stripe.card.createToken({
                    number: $scope.creditNumber,
                    cvc: $scope.CVC,
                    exp_month: ("0" + ($scope.date.getMonth() + 1)).slice(-2),
                    exp_year: $scope.date.getFullYear()
                  }, function (status, response) {
                    if (response.error) {
                      $ionicPopup.alert({
                        title: 'Credit Card Information is Wrong ',
                        template: response.error
                      });
                    } else {
                      var data = {
                        tripType: "OneWayTrip",
                        flights: [FlightsSrv.getFlights()[1]],
                        adults: FlightsSrv.getAdultsInfo(),
                        children: FlightsSrv.getChildrenInfo(),
                        classs: FlightsSrv.getClass(),
                        token: response.id

                      };

            FlightsSrv.postReservation(data).success(function(response,status){
                        FlightsSrv.setReservationNumber(FlightsSrv.getReservationNumber()+"Flight 2 ref= "+response.time);
                        $scope.hide($ionicLoading);
                        $location.url('/thankYou');

                      });

                    }
                  });
                });
              }
            });
          });


        } else if (flights[0].Airline != "Delta Airlines" && flights[1].Airline != "Delta Airlines" && flights[0].Airline === flights[1].Airline) {
          var url = getURL(flights[0].Airline);
          FlightsSrv.otherAirlinePubKey(url).success(function (response, status) {
            stripe.setPublishableKey(response);
            stripe.card.createToken({
              number: $scope.creditNumber,
              cvc: $scope.CVC,
              exp_month: ("0" + ($scope.date.getMonth() + 1)).slice(-2),
              exp_year: $scope.date.getFullYear()
            }, function (status, response) {
              if (response.error) {
                $ionicPopup.alert({
                  title: 'Credit Card Information is Wrong ',
                  template: response.error
                });
              } else {
                var data = {
                  passengerDetails: passengerDetails,
                  outgoingFlightId: flights[0].flightId,
                  returnFlightId: flights[1].flightId,
                  cost: parseInt(FlightsSrv.getTotalCost),
                  paymentToken: response.id,
                  class: FlightsSrv.getClass()
                };
                console.log(data);

                FlightsSrv.otherAirlineBooking(url, data).success(function (response, status) {
                  stripe.setPublishableKey('pk_test_lnXZPy220d1EMqYfHlOj1XOt');
                  FlightsSrv.setReservationNumber(response.refNum);
                  console.log(response);
                  $location.url('/thankYou');
                });
              }
            });
          });


        } else {
          var url = getURL(flights[0].Airline);
          FlightsSrv.otherAirlinePubKey(url).success(function (response, status) {
            stripe.setPublishableKey(response);
            stripe.card.createToken({
              number: $scope.creditNumber,
              cvc: $scope.CVC,
              exp_month: ("0" + ($scope.date.getMonth() + 1)).slice(-2),
              exp_year: $scope.date.getFullYear()
            }, function (status, response) {
              if (response.error) {
                $ionicPopup.alert({
                  title: 'Credit Card Information is Wrong ',
                  template: response.error
                });
              } else {
                var data = {
                  passengerDetails: passengerDetails,
                  outgoingFlightId: flights[0].flightId,
                  cost: parseInt(flights[0].cost),
                  paymentToken: response.id,
                  class: FlightsSrv.getClass()
                };
                console.log(data);

                FlightsSrv.otherAirlineBooking(url, data).success(function (response, status) {
                  stripe.setPublishableKey('pk_test_lnXZPy220d1EMqYfHlOj1XOt');
                  FlightsSrv.setReservationNumber("Flight 1 ref = " + response.refNum);
                  console.log(response);
                  var url = getURL(flights[1].Airline);
                  FlightsSrv.otherAirlinePubKey(url).success(function (response, status) {
                    stripe.setPublishableKey(response);
                    stripe.card.createToken({
                      number: $scope.creditNumber,
                      cvc: $scope.CVC,
                      exp_month: ("0" + ($scope.date.getMonth() + 1)).slice(-2),
                      exp_year: $scope.date.getFullYear()
                    }, function (status, response) {
                      if (response.error) {
                        $ionicPopup.alert({
                          title: 'Credit Card Information is Wrong ',
                          template: response.error
                        });
                      } else {
                        var data = {
                          passengerDetails: passengerDetails,
                          outgoingFlightId: flights[1].flightId,
                          cost: parseInt(flights[1].cost),
                          paymentToken: response.id,
                          class: FlightsSrv.getClass()
                        };
                        console.log(data);

                        FlightsSrv.otherAirlineBooking(url, data).success(function (response, status) {
                          stripe.setPublishableKey('pk_test_lnXZPy220d1EMqYfHlOj1XOt');
                          FlightsSrv.setReservationNumber(FlightsSrv.getReservationNumber() + "Flight 2 ref = " + response.refNum);
                          console.log(response);
                          $location.url('/thankYou');
                        });
                      }
                    });
                  });
                });
              }
            });
          });

        }
      }
      }

    }

});
