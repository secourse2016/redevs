App.factory('reservationSearchSrv', function ($http) {
  return {
  getReservationNumber: function(){
    return this.reservationNumber;
  },
  setReservationNumber: function(resNum)
  {
    this.reservationNumber = resNum;
  },
   getReservationSearch: function(resNum){
    return $http.get('http://localhost:3000/api/reservationSearch/'+resNum, {
       "headers" : { 'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJyZWRldnMubWUiLCJpYXQiOjE0NjEwMjI3ODQsImV4cCI6MTQ5MjU1ODc5NSwiYXVkIjoicmVkZXZzLm1lIiwic3ViIjoicmVkZXZzLm1lIn0.1g63kQXEOKBTQ7gEQ4nxbPI0pXJiM7-g7UH24Y-hKlk' }
    }); 
  }
};

/**
  
  we should check the $http.get method to contact the server correctly (localhost:300/api... OR /api bas)
**/

});
