App.factory('FlightsSrv', function ($http) {
     return {
         getAirportCodes : function() {
           return $http.get('/api/data/codes');

         },


         getNationalities : function() {
            return $http.get('/api/data/nationalities');
         },

         getRoundTripSearchResults : function(origin, destination, departingdate, returningdate, classs){
            return $http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingdate+'/'+returningdate+'/'+classs);

         },

         getOneWayTripSearchResults : function(origin, destination, departingdate, classs){
            return $http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingdate+'/'+classs);

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
         this.tripType=value;
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
        },
        setTotalCost :function(value){
          this.totalCost = value;
        },
        getTotalCost :function(){
          return this.totalCost;
        }


     };
 });
