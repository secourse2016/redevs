var moment = require('moment');

var today = moment();
console.log(today.year());



  function getAdults(passengerDetails){
    var adults = [];
   for(var i =0;i<passengerDetails;i++){

     if( (passengerDetails[i].dateOfBirth - today.year()) > 12  ){
       adults.push(passengerDetails[i]);
     }



   }
   return adults ;
  }

  function getChildren(passengerDetails){
    var children = [];
   for(var i =0;i<passengerDetails;i++){

     if( (passengerDetails[i].dateOfBirth - today.year()) <= 12  ){
       children.push(passengerDetails[i]);
     }



   }
   return children ;
  }


  exports.getAdults = getAdults ;
  exports.getChildren = getChildren;
