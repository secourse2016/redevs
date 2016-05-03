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

            var flag = false;
                for (var k = 0; k < $scope.Adults.length; k++){
                  if ($scope.Adults[k].firstName === undefined || $scope.Adults[k].lastName === undefined || $scope.Adults[k].passNumber === undefined ||
                    $scope.Adults[k].passNationality === undefined || $scope.Adults[k].email === undefined){
                    flag = true;
                    break;
                  }
                }
                for (var k = 0; k < $scope.Children.length; k++){
                  if ($scope.Children[k].firstName === undefined || $scope.Children[k].lastName === undefined || $scope.Children[k].passNumber === undefined ||
                    $scope.Children[k].passNationality === undefined || $scope.Children[k].email === undefined){
                    flag = true;
                    break;
                  }
                }

                if (!flag){
                   FlightsSrv.setAdultsInfo($scope.Adults);
                   FlightsSrv.setChildrenInfo($scope.Children);
                   $location.url('flightConfirmation');
                }
               }



					$location.url('/confirmation');




         }

         function getNationalities() {
            FlightsSrv.getNationalities().success(function(Nationalities){
               $scope.nationalities = Nationalities;

            });
         }

         getNationalities();

   		});
