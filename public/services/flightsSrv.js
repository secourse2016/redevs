App.factory('FlightsSrv', function ($http) {
     return {
         getAirportCodes : function() {
           return $http.get('/api/data/codes');

         },
         setSelectedOriginAirport: function(value) {
           this.selectedOriginAirport = value;
         },
         getSelectedOriginAirport: function() {
           return this.selectedOriginAirport;
         },
         setSelectedDestinationAirport: function(value) {
           this.selectedDestinationAirport = value;
         },
         getSelectedDestinationAirport: function() {
           return this.selectedDestinationAirport;
         },
         getSelectedDepartureDate: function(){
           return this.selectedDepartureDate;
         },
         getSelectedArrivalDate: function(){
           return this.selectedArrivalDate;
         },
         setSelectedDepartureDate: function(value){
            this.selectedDepartureDate=value;
         },
         setSelectedArrivalDate: function(value){
            this.selectedArrivalDate=value;
         },

         setFlights: function(value){
           this.selectedFlights = value;
         },
         getFlights: function(){
           return this.selectedFlights;
         },

         setClasses : function(value){
         this.classes=value;
         },
         getClasses : function (){
         return this.classes;
         },
         setTripType : function(value){
         this.tripTpe=value;
         },
         getTripType: function(){
                    return this.tripType;
                  }

     };
 });
