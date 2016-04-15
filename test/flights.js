var assert = require('chai').assert;
var app = require('../app/app.js');
var request = require('supertest');
var Quote = require('../flights.js');
var db = require('../db.js');
before(function(done) {
    db.connect(function(err, db) {
        if (err) return done(err);
        else done();
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err, seeded) {
            if (err) return done(err);
            assert.isTrue(seeded);
            done();
        });
    });
    /*it('should have populated the quotes collection with 102 document', function(done) {
        db.db().collection('quotes').find({}).toArray(function(err, quotes) {
            if (err) return done(err);
            assert.equal(quotes.length, 102);
            done();
        });
    });*/
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(err, seeded) {
            if (err) return done(err);
            assert.isFalse(seeded);
            done();
        });
    });
    /*it('should not seed db again if db is not empty quotes collection should remain 102', function(done) {
        db.db().collection('quotes').find({}).toArray(function(err, quotes) {
            if (err) return done(err);
            assert.equal(quotes.length, 102);
            done();
        });
    });*/
});
