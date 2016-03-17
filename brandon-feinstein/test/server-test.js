'use strict';
var server = require(__dirname + '/../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let expect = chai.expect;
var request = chai.request;
// let mongoose = require('mongoose');
// let Ferrari = require(__dirname + '/../models/ferrari-f1-drivers');
// let Mercedes = require(__dirname + '/../models/mercedes-f1-drivers');
var port = 'localhost:3000';



describe('testing functionality of the server with Ferrari routes', function() {

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
      // .send({name:})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should PUT', (done) => {
    request(port)
      .put('/ferrari-drivers/')
      .end((err, res) => {
        // expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should DELETE', (done) => {
    request(port)
      .delete('/ferrari-drivers')
      .end((err, res) => {
        // expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
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

});

describe('testing functionality of the server with Mercedes routes', function() {

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
      // .send({name:})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should PUT', (done) => {
    request(port)
      .put('/mercedes-drivers/')
      .end((err, res) => {
        // expect(err).to.eql(null);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should DELETE', (done) => {
    request(port)
      .delete('/mercedes-drivers')
      .end((err, res) => {
        // expect(err).to.eql(null);
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

});
