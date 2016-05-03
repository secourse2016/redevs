	App.controller('infoCtrl', function($scope, $http,$state,FlightsSrv){

   		$scope.AdultsCount = FlightsSrv.getNumberOfAdults();
   		$scope.ChildrenCount = FlightsSrv.getNumberOfChildren();
    console.log(FlightsSrv.getNumberOfAdults());
    console.log(FlightsSrv.getNumberOfChildren());
    console.log(FlightsSrv.getNumberOfAdults()+FlightsSrv.getNumberOfChildren());

   		$scope.AdultsArray = new Array($scope.AdultsCount);
   		$scope.ChildrenArray = new Array($scope.ChildrenCount);

         /* TRYING TO GET A PIECE OF DUMMY DATA FROM SERVER */
         // function getDummyDataFromServer(){
         //    FlightsSrv.getDummyDataFromServer().success(function(response){
         //       console.log(response);
         //    });
         // }
         // getDummyDataFromServer();

         console.log($scope.AdultsCount);

   		$scope.Adults = [];
   		$scope.Children = [];

   		for(var i = 0; i < $scope.AdultsCount; i++){
   			$scope.Adults[i] = {};
   		}

   		for(var j = 0; j < $scope.ChildrenCount; j++){
   			$scope.Children[j] = {};
   		}

   		$scope.thereIsAdults = !($scope.Adults.length === 0);
   		$scope.thereIsChildren = !($scope.Children.length === 0);

         $scope.proceed = function() {

            FlightsSrv.setAdultsInfo($scope.Adults);
            FlightsSrv.setChildrenInfo($scope.Children);


          //   FlightsSrv.setAdultsInfo($scope.Adults);
          //   FlightsSrv.setChildrenInfo($scope.Children);

					// 	var data = {
					// 		tripType:FlightsSrv.getTripType(),
					// 		flights:FlightsSrv.getFlights(),
					// 		adults:FlightsSrv.getAdultsInfo(),
					// 		children:FlightsSrv.getChildrenInfo(),
					// 		creditCardNumber:"123",
					// 		classs:FlightsSrv.getClass()
					// 	};
					// $http.post('/api/postReservation/',data).success(function(data,status){
					//

					// })


					// });
					$state.go('flightConfirmation');




         }

         function getNationalities() {
            FlightsSrv.getNationalities().success(function(Nationalities){
               $scope.nationalities = Nationalities;

            });
         }

         getNationalities();

   		});
