
App.factory('reservationSearchSrv', function($http) {
  return {
  getReservationNumber: function(){
    return this.reservationNumber;
  },
  setReservationNumber: function(resNum)
  {
    this.reservationNumber = resNum;
  },
   getReservationSearch: function(resNum){
    return $http.get('/api/reservationSearch/'+resNum); 
  }
};

});
