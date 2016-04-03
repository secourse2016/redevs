App.factory('FlightsSrv', function ($http) {
     return {
         getAirportCodes : function() {
           return $http.get('/api/data/codes');
<<<<<<< HEAD

         },
=======
         },

         getNationalities : function() {
            return $http.get('/api/data/nationalities');
         },

>>>>>>> 87d80b08298b1fa287cef22a128e56fd36b245f4
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
         },

         setAdultsInfo: function(value){
           this.adultsInfo = value;
         },

         setChildrenInfo: function(value){
            this.childrenInfo = value;
         },

         getAdultsInfo: function(){
           return this.adultsInfo;
         },

         getChildrenInfo: function(){
            return this.childrenInfo;
         },

        setNumberOfChildren: function(value){
          this.numberOfChildren=value;
        } ,
        setNumberOfAdults: function(value){
          this.numberOfAdults=value;
        } ,
        getNumberOfChildren: function(){
          return this.numberOfChildren;
        },
        getNumberOfAdults: function(){
          return this.numberOfAdults;
        }


     };
 });

