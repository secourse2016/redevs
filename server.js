var app     = require('./app/app');
var db = require('./app/db.js');
var flights = require('./app/flights.js');

db.connect(function(err){
	
	flights.seed(function(err,res){
		
		app.listen(process.env.PORT, function(){
  		console.log('[OK] => HTTP Server listening on http://localhost:3000');
		});
	});
});



