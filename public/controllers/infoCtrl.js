	App.controller('infoCtrl', function($scope){
   		
   		$scope.AdultsCount = FlightsSrv.getNumberOfAdults;
   		$scope.ChildrenCount = FlightsSrv.getNumberOfChildren;
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

         $scope.proceed = function() {
            FlightsSrv.setAdultsInfo(Adults);
            FlightsSrv.setChildrenInfo(Adults);
         }

   		});