var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var flight = require('../flights.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
    db.connect
    (function(err, db) {
       if (err) return done(err);
        else done();
     });
});

describe('getTicketsFromDB', function() {
    it('should return all tickets documents in the database', function(done) {
        // TODO: there should be 2 documents in the db
        flight.getTicketsFromDB(function(error,tickets){
            assert.lengthOf(tickets,2);
            done();
        });
    });
});



describe('reservationSearch', function() {
    it('should return the info of ticket AXY123  document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
       flight.reservationSearch('AXY123',function(error,ticket){
        var allTickets= flight.getTicketsFromJSON();
        assert.include(allTickets,ticket);
        done();
       });
    });

});
