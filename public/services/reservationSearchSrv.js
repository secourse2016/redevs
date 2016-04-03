
App.factory('reservationSearchSrv', function() {
  return {
  getReservationNumber: function(){
    return this.reservationNumber; 
  }, 
  setReservationNumber: function(resNum)
  {
    this.reservationNumber = resNum;
  }
};

});