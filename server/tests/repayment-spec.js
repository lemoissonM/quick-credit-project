/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { app } = require('../index');
const users = require('../model/user');

chai.use(chaiHttp);
const fakeRepaymentData = {
  amount: 'lemoisson',
};
const correctRepaymentData = {
  amount: '210',
};
describe('Post a repayment transaction', () => {
  it('it should return a 400 status when amount is  not a number', (done) => {
    chai.request(app)
      .post('/api/v1/loans/0/repayment')
      .set('Authorization', `Bearer ${users.users[0].token}`)
      .send(fakeRepaymentData)
      .end((err, res) => {
        res.should.have.status(400);
        console.log(res.body);
        done();
      });
  });

  it('it should return a 400 status when amount is  undefined', (done) => {
    chai.request(app)
      .post('/api/v1/loans/0/repayment')
      .set('Authorization', `Bearer ${users.users[0].token}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(400);
        console.log(res.body);
        done();
      });
  });
  it('it should return a 400 status when the loan is not found', (done) => {
    chai.request(app)
      .post('/api/v1/loans/650/repayment')
      .set('Authorization', `Bearer ${users.users[0].token}`)
      .send(correctRepaymentData)
      .end((err, res) => {
        res.should.have.status(404);
        console.log(res.body);
        done();
      });
  });
  it('it should return a 200 status when everything is okey', (done) => {
    chai.request(app)
      .post('/api/v1/loans/0/repayment')
      .set('Authorization', `Bearer ${users.users[0].token}`)
      .send(correctRepaymentData)
      .end((err, res) => {
        res.should.have.status(201);
        console.log(res.body);
        done();
      });
  });
  it('it should return a 401 status loan is already repaid', (done) => {
    chai.request(app)
      .post('/api/v1/loans/1/repayment')
      .set('Authorization', `Bearer ${users.users[0].token}`)
      .send(correctRepaymentData)
      .end((err, res) => {
        res.should.have.status(403);
        console.log(res.body);
        done();
      });
  });
});
/*
describe('Get a loan repayment transaction', () => {
  it('it should return a 200 and a list containing one repayment', (done) => {
    chai.request(app)
      .get('/api/v1/loans/0/repayment')
      .set('Authorization', `Bearer ${users.users[0].token}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        expect(2).to.equal(res.body.data.length);
        console.log(res.body);
        done();
      });
  });
}); 
describe('It should check the token in authorization header before any repayment transaction', () => {
  it('it should return 401 status because a bad token is provided', (done) => {
    chai.request(app)
      .get('/api/v1/loans/0/repayment')
      .set('Authorization', `Bearer ${users.users[2].token}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(401);
        console.log(res.body);
        done();
      });
  });
  it('It should return 401 status when token is not provided', (done) => {
    chai.request(app)
      .get('/api/v1/loans/1/repayment')
      .set('Authorization', 'Bearer ')
      .send('')
      .end((err, res) => {
        res.should.have.status(401);
        console.log(res.body);
        done();
      });
  });
  it('It should return 401 status when bad token is  provided', (done) => {
    chai.request(app)
      .get('/api/v1/loans/1/repayment')
      .set('Authorization', 'Bearer ekekejejeekee')
      .send('')
      .end((err, res) => {
        res.should.have.status(401);
        console.log(res.body);
        done();
      });
  });
  it('it should return 401 status when authorization is undefinned', (done) => {
    chai.request(app)
      .get('/api/v1/loans/0/repayment')
      .set('Authorization', '')
      .send('')
      .end((err, res) => {
        res.should.have.status(401);
        console.log(res.body);
        done();
      });
  });
}); */
