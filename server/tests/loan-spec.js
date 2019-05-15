/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { app } = require('../index');
const { users } = require('../model/user');

const should = chai.should();
chai.use(chaiHttp);

const newLoanCorrectData = {
  tenor: 12,
  amount: 2000,
};
const duplicateLoanRequestData = {
  tenor: 12,
  amount: 2000,
};
const FakeUserLoanRequestData = {
  tenor: 12,
  amount: 2000,
};
describe('Post a new loan', () => {
  it('it should a 400 status because of Undefinned values', (done) => {
    chai.request(app)
      .post('/api/v1/loans/')
      .set('Authorization', `Bearer ${users[2].token}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(400);
        console.log(res.body);
        done();
      });
  });
  it('it should a 401 status because the token is not defined', (done) => {
    chai.request(app)
      .post('/api/v1/loans/')
      .send('')
      .end((err, res) => {
        res.should.have.status(401);
        console.log(res.body);
        done();
      });
  });
  it('it should a 401 status because wrong token is provided', (done) => {
    chai.request(app)
      .post('/api/v1/loans/')
      .set('Authorization', 'Bearer jerhrjekekekekekek')
      .send('')
      .end((err, res) => {
        res.should.have.status(401);
        console.log(res.body);
        done();
      });
  });
  it('it should return the new loan data', (done) => {
    chai.request(app)
      .post('/api/v1/loans/')
      .set('Authorization', `Bearer ${users[2].token}`)
      .send(newLoanCorrectData)
      .end((err, res) => {
        res.should.have.status(201);
        console.log(res.body);
        done();
      });
  });
  it('it should return 403 status since the user has a current loan', (done) => {
    chai.request(app)
      .post('/api/v1/loans/')
      .set('Authorization', `Bearer ${users[1].token}`)
      .send(duplicateLoanRequestData)
      .end((err, res) => {
        res.should.have.status(403);
        console.log(res.body);
        done();
      });
  });
});

describe('Get all  loans specs', () => {
  it('it should return all loans', (done) => {
    chai.request(app)
      .get('/api/v1/loans/')
      .set('Authorization', `Bearer ${users[0].token}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        console.log(res.body);
        done();
      });
  });
  it('it should return all loans for a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/loans/user/lemoisson@quick-credit.com/')
      .set('Authorization', `Bearer ${users[0].token}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        expect(7).to.be.equal(res.body.data.length);
        console.log(res.body);
        done();
      });
  });
});
