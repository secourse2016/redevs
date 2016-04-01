/**
 * Reservation Search Service
 */
 var reservations=require("../reservations.json")
App.factory('reservationSearchSrv', function ($http) {
     return {
         getreservationNumber : function(number) {

          //where will I be calling it??
           var arrayOfReservations=$http.get('reservations.json');
           //ha return el element eli 3ndo nafs el resv Number
          for(i=0;i<reservations.length;i++){
            if(reservations[i].reservationNumber==number){
              return reservations[i];
            }
          }
          //law msh la2eto a throw error


         },
         setSelectedNumberOfTickets: function(value) {
           this.selectedNumberOfTickets = value;
         },
         getSelectedNumberOfTickets: function() {
           return this.selectedNumberOfTickets;
         },
         setSelectedClass: function(value) {
           this.selectedClass = value;
         },
         getSelectedClass: function() {
           return this.selectedClass;
         },
         setSelected1stFrom: function(value) {
           this.selected1stFrom = value;
         },
         getSelected1stFrom: function() {
           return this.selected1stFrom;
         },
         setSelected1stto: function(value) {
           this.selected1stto = value;
         },
         getSelected1stto: function() {
           return this.selected1stto;
         },
         setSelected1stFromDate: function(value) {
           this.selected1stFromDate = value;
         },
         getSelected1stFromDate: function() {
           return this.selected1stFromDate;
         },
         setSelected1stFromTime: function(value) {
           this.selected1stFromTime = value;
         },
         getSelected1stFromTime: function() {
           return this.selected1stFromTime;
         },
         setSelected1stFromTerminal: function(value) {
           this.selected1stFromTerminal = value;
         },
         getSelected1stFromTerminal: function() {
           return this.selected1stFromTerminal;
         },
         setSelected1sttoDate: function(value) {
           this.selected1sttoDate = value;
         },
         getSelected1sttoDate: function() {
           return this.selected1sttoDate;
         },
         setSSelected1sttoTime: function(value) {
           this.selected1sttoTime = value;
         },
         getSelected1sttoTime: function() {
           return this.selected1sttoTime;
         },
         setSelected1sttoTerminal: function(value) {
           this.selected1sttoTerminal = value;
         },
         getSelected1sttoTerminal: function() {
           return this.selected1sttoTerminal;
         },
         setSelected1stFlightNumber: function(value) {
           this.selected1stFlightNumber = value;
         },
         getSelected1stFlightNumber: function() {
           return this.selected1stFlightNumber;
         },

         //return flight
           setSelected2ndFrom: function(value) {
           this.selected2ndFrom = value;
         },
         getSelected2ndFrom: function() {
           return this.selected2ndFrom;
         },
         setSelected2ndto: function(value) {
           this.selected2ndto = value;
         },
         getSelected2ndto: function() {
           return this.selected2ndto;
         },
         setSelected2ndFromDate: function(value) {
           this.selected2ndFromDate = value;
         },
         getSelected2ndFromDate: function() {
           return this.selected2ndFromDate;
         },
         setSelected2ndFromTime: function(value) {
           this.selected2ndFromTime = value;
         },
         getSelected2ndFromTime: function() {
           return this.selected2ndFromTime;
         },
         setSelected2ndFromTerminal: function(value) {
           this.selected2ndFromTerminal = value;
         },
         getSelected2ndFromTerminal: function() {
           return this.selected2ndFromTerminal;
         },
         setSelected2ndtoDate: function(value) {
           this.selected2ndtoDate = value;
         },
         getSelected2ndtoDate: function() {
           return this.selected2ndtoDate;
         },
         setSSelected2ndtoTime: function(value) {
           this.selected2ndtoTime = value;
         },
         getSelected2ndtoTime: function() {
           return this.selected2ndtoTime;
         },
         setSelected2ndtoTerminal: function(value) {
           this.selected2ndtoTerminal = value;
         },
         getSelected2ndtoTerminal: function() {
           return this.selected2ndtoTerminal;
         },
         setSelected2ndFlightNumber: function(value) {
           this.selected2ndFlightNumber = value;
         },
         getSelected2ndFlightNumber: function() {
           return this.selected2ndFlightNumber;
         },

          setSelectedReservationNumber: function(value) {
           this.selectedReservationNumber = value;
         },
         getSelectedReservationNumber: function() {
           return this.selectedReservationNumber;
         }


     };
 });