App.factory('FlightsSrv', function ($http) {
     return {
         getAirportCodes : function() {
           return $http.get('/api/data/codes');

         },


         getNationalities : function() {
            return $http.get('/api/data/nationalities');
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

         setClass : function(value){
         this.classes=value;
         },
         getClass : function (){
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
        },




        getName : function(){
                return this.name;
            },
            setName : function(value){
                 this.name = value ;
            },
        getCreditCardNumber : function(){
            return this.creditNumber;
        },
         setCreditCardNumber : function(value){
             this.creditNumber = value;
        },
        getCVC : function(){
            return this.CVC;
        },
         setCVC : function(value){
             this.CVC = value;
        },

        setMonth : function(value){
             this.month = value;
        },
        getMonth : function(){
            return this.month;
        },
        getYear : function(){
            return this.year;
        },
        setYear : function(value){
            this.year = value;
        }


     };
 });
