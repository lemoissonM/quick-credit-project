/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { app } = require('../index');
const { users } = require('../model/user');

const should = chai.should();
chai.use(chaiHttp);

const loginDetails = {
  email: 'lemoisson@quick-credit.com',
  password: 'metre',
};
const loginDetailsTrue = {
  email: 'lemoisson@quick-credit.com',
  password: '12345678',
};
const loginDetailsEmpty = {
  email: 'lemoisson@quick-credit.com',
  password: '',
};

describe('login', () => {
  it('it should not login with undefinned values', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send('')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return a 401 status when empty mail or password provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(loginDetailsEmpty)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should return a 401 status when wrong mail or password provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should return a 200 status and user data when everything is okey', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(loginDetailsTrue)
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.data.email).equal('lemoisson@quick-credit.com');
        done();
      });
  });
});
