'use strict';
process.env.MONGOLAB_URI = 'mongodb://localhost/testdb';
var server = require(__dirname + '/../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let expect = chai.expect;
var request = chai.request;
let mongoose = require('mongoose');
var port = 'localhost:3000';

describe('testing functionality of the server', function() {
  after((done) => {
    mongoose.connection.db.dropDatabase(() =>{
      done();
    });
  });
  it('should GET', (done) => {
    request(port)
      .get('/users')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('should POST', (done) => {
    request(port)
      .post('/users')
      .send({name: 'testUser', password: '123'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body._id).to.exist;//check for id
        done();
      });
  });

  it('should GET', (done) => {
    request(port)
      .get('/files')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('should POST', (done) => {
    request(port)
      .post('/files')
      .send({name: 'test driver', raceWins: 1})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body._id).to.exist;
        done();
      });
  });

  var putId;
  describe('test put and delete functions', function () {
    before((done) => {
      request(port)
        .post('/users')
        .send({name: 'testUser', password: '123'})
        .end((err, res) => {
          putId = res.body._id;
          done();
        });
    });
    // it('should PUT', function(done) {
    //   request(port)
    //     .put('/users/' + putId)
    //     .send({name: 'testUser', password: '231'})
    //     .end(function (err, res) {
    //       expect(err).to.eql(null);
    //       console.log(res.text);
    //       expect(res.text.password).to.eql('231');
    //       done();
    //     });
    // });

    // it('should DELETE', (done) => {
    //   request(port)
    //   .delete('/users/' + putId)
    //   .end((err, res) => {
    //     expect(err).to.eql(null);
    //     expect(res.text).to.equal('{"message":"User removed"}');
    //     done();
    //   });
    // });
  });
  var putId2;
  describe('test put and delete functions', function () {
    before((done) => {
      request(port)
        .post('/files')
        .send({name: 'testFile', content: 'Hello Test'})
        .end((err, res) => {
          putId2 = res.body._id;
          done();
        });
    });
    it('should PUT', function(done) {
      request(port)
        .put('/files/' + putId2)
        .send({name: 'testFile', content: 'Hello Test Put'})
        .end(function (err, res) {
          expect(err).to.eql(null);
          expect(res.body.content).to.eql('Hello Test Put');
          done();
        });
    });

    it('should DELETE', (done) => {
      request(port)
        .delete('/files/' + putId2)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.text).to.equal('{"message":"File removed"}');
          done();
        });
    });
  });

});

// it('should GET', (done) => {
//   request(port)
//     .get('/ferr-mostwins')
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       expect(res.body).to.be.an('object');
//       done();
//     });
// });

// it('should GET', (done) => {
//   request(port)
//     .get('/merc-mostwins')
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       expect(res.body).to.be.an('object');
//       done();
//     });
// });
