'use strict';
process.env.MONGOLAB_URI = 'mongodb://localhost/testdb';
var server = require(__dirname + '/../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let expect = chai.expect;
var request = chai.request;
let mongoose = require('mongoose');
// let Ferrari = require(__dirname + '/../models/ferrari-f1-drivers');
// let Mercedes = require(__dirname + '/../models/mercedes-f1-drivers');
var port = 'localhost:3000';

describe('testing functionality of the server', function() {
  after((done) => {
    mongoose.connection.db.dropDatabase(() =>{
      done();
    });
  });
  it('should GET', (done) => {
    request(port)
      .get('/ferrari-drivers')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('should POST', (done) => {
    request(port)
      .post('/ferrari-drivers')
      .send({name: 'test driver', raceWins: 1})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body._id).to.exist;//check for id
        done();
      });
  });

  it('should GET', (done) => {
    request(port)
      .get('/mercedes-drivers')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('should POST', (done) => {
    request(port)
      .post('/mercedes-drivers')
      .send({name: 'test driver', raceWins: 1})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body._id).to.exist;
        done();
      });
  });

  it('should GET', (done) => {
    request(port)
      .get('/ferr-mostwins')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should GET', (done) => {
    request(port)
      .get('/merc-mostwins')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  var putId;
  describe('test put and delete functions', function () {
    before((done) => {
      request(port)
        .post('/ferrari-drivers')
        .send({name: 'test driver', raceWins: 1})
        .end((err, res) => {
          putId = res.body._id;
          console.log(res.body._id);
          done();
        });
    });
    it('should PUT', function(done) {
      request(port)
        .put('/ferrari-drivers/' + putId)
        .send({name: 'test driver', raceWins: 2})
        .end(function (err, res) {
          expect(err).to.eql(null);
          expect(res.body.raceWins).to.eql(2);
          done();
        });
    });

    it('should DELETE', (done) => {
      request(port)
      .delete('/ferrari-drivers/' + putId)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.text).to.equal('{"message":"Ferrari driver removed"}');
        done();
      });
    });
  });
  var putId2;
  describe('test put and delete functions', function () {
    before((done) => {
      request(port)
        .post('/mercedes-drivers')
        .send({name: 'test driver', raceWins: 1})
        .end((err, res) => {
          putId2 = res.body._id;
          console.log(res.body._id);
          done();
        });
    });
    it('should PUT', function(done) {
      request(port)
        .put('/mercedes-drivers/' + putId2)
        .send({name: 'test driver', raceWins: 2})
        .end(function (err, res) {
          expect(err).to.eql(null);
          expect(res.body.raceWins).to.eql(2);
          done();
        });
    });

    it('should DELETE', (done) => {
      request(port)
        .delete('/mercedes-drivers/' + putId2)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.text).to.equal('{"message":"Mercedes driver removed"}');
          done();
        });
    });
  });

});
