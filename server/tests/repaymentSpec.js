/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { app } = require('../index');

const users = require('../models/User');

chai.use(chaiHttp);
const fakeRepaymentData = {
  amount: 'lemoisson',
};
const correctRepaymentData = {
  amount: '2100',
};
const loginDetailsAdmin = {
  email: 'admin@quick-credit.com',
  password: '12345678',
};
let adminToken = '';
it('should return a 200 status and user data when everything is okey', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signin')
    .send(loginDetailsAdmin)
    .end((err, res) => {
      adminToken = res.body.data.token;
      done();
    });
});
let loanID = 0;
describe('Post a repayment transaction', () => {
  let loanAmount = 0;
  it('it should return the currents loans', (done) => {
    chai.request(app)
      .get('/api/v1/loans/?status=approved&repaid=false')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.data.length).to.be.equal(1);
        loanID = res.body.data[0].id;
        loanAmount = res.body.data.amount;
        done();
      });
  });
  it('it should return a 400 status when amount is  not a number', (done) => {
    chai.request(app)
      .post(`/api/v1/loans/${loanID}/repayment`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(fakeRepaymentData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should return a 400 status when amount is  undefined', (done) => {
    chai.request(app)
      .post(`/api/v1/loans/${loanID}/repayment`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should return a 400 status when the loan is not found', (done) => {
    chai.request(app)
      .post('/api/v1/loans/650/repayment')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(correctRepaymentData)
      .end((err, res) => {
        res.should.have.status(404);

        done();
      });
  });

  it('it should return a 200 status when everything is okey', (done) => {
    chai.request(app)
      .post(`/api/v1/loans/${loanID}/repayment`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(correctRepaymentData)
      .end((err, res) => {
        res.should.have.status(201);

        done();
      });
  });

  it('it should return a 403 status loan is already repaid', (done) => {
    chai.request(app)
      .post(`/api/v1/loans/${loanID}/repayment`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send(correctRepaymentData)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

describe('Get a loan repayment transaction', () => {
  it('it should return a 200 and a list containing one repayment', (done) => {
    chai.request(app)
      .get(`/api/v1/loans/${loanID}/repayment`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        expect(1).to.equal(res.body.data.length);
        done();
      });
  });
});

describe('It should check the token in authorization header before any repayment transaction', () => {
  it('it should return 401 status because a wrong token is provided', (done) => {
    chai.request(app)
      .get('/api/v1/loans/0/repayment')
      .set('Authorization', `Bearer ${users.users[2].token}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(401);
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
        done();
      });
  });
});
