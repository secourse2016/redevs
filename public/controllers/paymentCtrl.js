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
      case "Air Madagascar": return "http://54.191.202.17"; ;break;
      case "AirNewZealand": return "http://52.28.246.230"; break;
      case "IBERIA": return "http://52.58.24.76" ; break;
      case "Lufthansa" : return "ec2-54-152-123-100.compute-1.amazonaws.com";break;
      case "Emirates Airlines" : return "http://52.90.46.68";break;
      case "Japan Airlines" : return "http://54.187.208.145" ;break;
      case "Singapore air" : return "http://52.38.234.54" ; break;
      case "Dragonair" : return "http://52.58.46.74";break;
      case "South African Airways" : return "http://54.213.157.185";break;
      case "Malaysia Airlines" : return "http://52.32.109.147";break;
      case "Northwest Airlines": return "http://52.36.169.206";break;
      case "Cathay Pacific Airlines":return "ec2-52-91-94-227.compute-1.amazonaws.com";break;
      case "Alaska" : return "http://52.207.211.179";break;
      case "Virgin australia" : return "http://54.93.116.90" ;break ;
      case "United" : return "http://54.187.103.196" ; break;
      case "Alitalia":return "http://54.93.74.125" ; break;
      case "Air Canada": return "http://52.36.250.55" ; break ;


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
            $scope.error = true;
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
        FlightsSrv.otherAirlinePubKey(url).success(function(response,status){
          stripe.setPublishableKey(response);
          stripe.card.createToken({
            number: $scope.creditNumber,
            cvc : $scope.CVC,
            exp_month:$scope.month,
            exp_year:$scope.year
          },function(status,response){
            if(response.error){
              console.log(response.error);
              $scope.error = true;
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
                $location.url('/thankYou');
              });
            }
          });
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
            $scope.error = true;
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
      }else if(flights[0].Airline==="Delta Airlines" && flights[1].Airline!="Delta Airlines" ){
        var f1;
        var f2;
        //Reserve the first ticket
        stripe.card.createToken({
          number: $scope.creditNumber,
          cvc : $scope.CVC,
          exp_month:$scope.month,
          exp_year:$scope.year
        },function(status,response){
          if(response.error){
            $scope.error = true;
            console.log(response.error);
            console.log($scope.year);
          }else{
            var data = {
              tripType:"OneWayTrip",
              flights:[FlightsSrv.getFlights()[0]],
              adults:FlightsSrv.getAdultsInfo(),
              children:FlightsSrv.getChildrenInfo(),
              classs:FlightsSrv.getClass(),
              token:response.id

            };

            FlightsSrv.postReservation(data).success(function(response,status){
              f1 = response.time;
              var url = getURL(flights[1].Airline);
              FlightsSrv.otherAirlinePubKey(url).success(function(response,status){
                stripe.setPublishableKey(response);
                stripe.card.createToken({
                  number: $scope.creditNumber,
                  cvc : $scope.CVC,
                  exp_month:$scope.month,
                  exp_year:$scope.year
                },function(status,response){
                  if(response.error){
                    $scope.error = true;
                    console.log(response.error);
                  }else{
                    var data={
                      passengerDetails : passengerDetails,
                      outgoingFlightId:flights[1].flightId,
                      cost:parseInt(flights[1].cost),
                      paymentToken:response.id,
                      class:FlightsSrv.getClass()
                    };
                    console.log(data);

                    FlightsSrv.otherAirlineBooking(url,data).success(function(response,status){
                      stripe.setPublishableKey('pk_test_lnXZPy220d1EMqYfHlOj1XOt');
                      FlightsSrv.setReservationNumber("Flight 1 ref = "+f1+" Flight 2 ref = "+response.refNum);
                      console.log(response);
                      $location.url('/thankYou');
                    });
                  }
                });
              });

            });

          }
        });
        // reserve the second ticket






      }else if(flights[0].Airline!="Delta Airlines" && flights[1].Airline=="Delta Airlines" ){
        var url = getURL(flights[0].Airline);
        FlightsSrv.otherAirlinePubKey(url).success(function(response,status){
          stripe.setPublishableKey(response);
          stripe.card.createToken({
            number: $scope.creditNumber,
            cvc : $scope.CVC,
            exp_month:$scope.month,
            exp_year:$scope.year
          },function(status,response){
            if(response.error){
              $scope.error = true;
              console.log(response.error);
            }else{
              var data={
                passengerDetails : passengerDetails,
                outgoingFlightId:flights[0].flightId,
                cost:parseInt(flights[0].cost),
                paymentToken:response.id,
                class:FlightsSrv.getClass()
              };
              console.log(data);

              FlightsSrv.otherAirlineBooking(url,data).success(function(response,status){
                stripe.setPublishableKey('pk_test_lnXZPy220d1EMqYfHlOj1XOt');
                FlightsSrv.setReservationNumber("Flight1 ref = "+response.refNum);
                console.log(response);
                stripe.card.createToken({
                  number: $scope.creditNumber,
                  cvc : $scope.CVC,
                  exp_month:$scope.month,
                  exp_year:$scope.year
                },function(status,response){
                  if(response.error){
                    $scope.error = true;
                    console.log(response.error);
                    console.log($scope.year);
                  }else{
                    var data = {
                      tripType:"OneWayTrip",
                      flights:[FlightsSrv.getFlights()[1]],
                      adults:FlightsSrv.getAdultsInfo(),
                      children:FlightsSrv.getChildrenInfo(),
                      classs:FlightsSrv.getClass(),
                      token:response.id

                    };

                    FlightsSrv.postReservation(data).success(function(response,status){
                      FlightsSrv.setReservationNumber(FlightsSrv.getReservationNumber()+" Flight2 refNum = "+response.time);
                      $location.url('/thankYou');

                    });

                  }
                });
              });
            }
          });
        });






      }else if(flights[0].Airline!="Delta Airlines" && flights[1].Airline!="Delta Airlines" &&  flights[0].Airline === flights[1].Airline  ){
        var url = getURL(flights[0].Airline);
        FlightsSrv.otherAirlinePubKey(url).success(function(response,status){
        stripe.setPublishableKey(response);
        stripe.card.createToken({
          number: $scope.creditNumber,
          cvc : $scope.CVC,
          exp_month:$scope.month,
          exp_year:$scope.year
        },function(status,response){
          if(response.error){
            $scope.error = true;
            console.log(response.error);
          }else{
            var data={
              passengerDetails : passengerDetails,
              outgoingFlightId:flights[0].flightId,
              returnFlightId:flights[1].flightId,
              cost:parseInt(FlightsSrv.getTotalCost),
              paymentToken:response.id,
              class:FlightsSrv.getClass()
            };
            console.log(data);

            FlightsSrv.otherAirlineBooking(url,data).success(function(response,status){
              stripe.setPublishableKey('pk_test_lnXZPy220d1EMqYfHlOj1XOt');
              FlightsSrv.setReservationNumber(response.refNum);
              console.log(response);
              $location.url('/thankYou');
            });
          }
        });
      });


      }else{
        var url = getURL(flights[0].Airline);
        FlightsSrv.otherAirlinePubKey(url).success(function(response,status){
          stripe.setPublishableKey(response);
          stripe.card.createToken({
            number: $scope.creditNumber,
            cvc : $scope.CVC,
            exp_month:$scope.month,
            exp_year:$scope.year
          },function(status,response){
            if(response.error){
              $scope.error = true;
              console.log(response.error);
            }else{
              var data={
                passengerDetails : passengerDetails,
                outgoingFlightId:flights[0].flightId,
                cost:parseInt(flights[0].cost),
                paymentToken:response.id,
                class:FlightsSrv.getClass()
              };
              console.log(data);

              FlightsSrv.otherAirlineBooking(url,data).success(function(response,status){
                stripe.setPublishableKey('pk_test_lnXZPy220d1EMqYfHlOj1XOt');
                FlightsSrv.setReservationNumber("Flight1 ref = "+response.refNum);
                console.log(response);
                var url = getURL(flights[1].Airline);
                FlightsSrv.otherAirlinePubKey(url).success(function(response,status){
                  stripe.setPublishableKey(response);
                  stripe.card.createToken({
                    number: $scope.creditNumber,
                    cvc : $scope.CVC,
                    exp_month:$scope.month,
                    exp_year:$scope.year
                  },function(status,response){
                    if(response.error){
                      $scope.error = true;
                      console.log(response.error);
                    }else{
                      var data={
                        passengerDetails : passengerDetails,
                        outgoingFlightId:flights[1].flightId,
                        cost:parseInt(flights[1].cost),
                        paymentToken:response.id,
                        class:FlightsSrv.getClass()
                      };
                      console.log(data);

                      FlightsSrv.otherAirlineBooking(url,data).success(function(response,status){
                        stripe.setPublishableKey('pk_test_lnXZPy220d1EMqYfHlOj1XOt');
                        FlightsSrv.setReservationNumber(FlightsSrv.getReservationNumber()+" Flight2 ref = "+response.refNum);
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

});
