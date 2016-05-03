	App.controller('infoCtrl', function($scope, $http,$state,FlightsSrv, $ionicPopup){

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
					$state.go('flightConfirmation');
          }else{
          $ionicPopup.alert({
              title: 'Attention!',
              template: 'Please complete filling passenger information.'
           });
        }
        }

         function getNationalities() {
            FlightsSrv.getNationalities().success(function(Nationalities){
               $scope.nationalities = Nationalities;

            });
         }

         getNationalities();

   		});
