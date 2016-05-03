	App.controller('infoCtrl', function($scope, $http,$location,FlightsSrv){

   		$scope.AdultsCount = FlightsSrv.getNumberOfAdults();
   		$scope.ChildrenCount = FlightsSrv.getNumberOfChildren();
   		$scope.AdultsArray = new Array($scope.AdultsCount);
   		$scope.ChildrenArray = new Array($scope.ChildrenCount);

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

			function setDates(){
				for(var i = 0;i<$scope.Adults.length;i++){
					if($scope.Adults[i].dateOfBirth != undefined)
					$scope.Adults[i].dateOfBirth = moment($scope.Adults[i].dateOfBirth,'DD/MM/YYYY').toDate().getTime();
				}

				for(var i = 0;i<$scope.Children.length;i++){
					if($scope.Children[i].dateOfBirth != undefined)
					$scope.Children[i].dateOfBirth = moment($scope.Children[i].dateOfBirth,'DD/MM/YYYY').toDate().getTime();
				}
			}

         $scope.proceed = function() {
					 setDates();

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
					$location.url('/confirmation');




         }

         function getNationalities() {
            FlightsSrv.getNationalities().success(function(Nationalities){
               $scope.nationalities = Nationalities;

            });
         }

         getNationalities();

   		});
