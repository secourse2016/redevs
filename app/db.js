
    var client = require('mongodb').MongoClient;
    var db;
    //What is our dbURL??
    
    module.exports =  {
        init: function(dbURL, callback) {
            client.connect(dbURL, function(err, database) {
              if (err) console.log("[error] mongo connection: ", err);
              console.log('SUCCESS');
              db = database;
              if(callback) callback();
            });
        },
        db: function() {
            return db;
        },
        close: function() {
            db.close();
        }
    };