var flights = require('../flights.json');
var db = require('./app/db.js');

exports.flights = flights;

function seedDB (cb) {
    db.db().collection('flights').find().toArray(function (err, docs) {
        if (err) return cb(err);
        if (docs.length > 0)
            cb(null, false);
        else {
            db.db().collection('flights').insertMany(flights, function (err) {
                if (err) return cb(err);
                cb(null, true);
            });
        }
    });
}


exports.seed = seedDB;