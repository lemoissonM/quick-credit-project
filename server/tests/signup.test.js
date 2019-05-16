/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, closeServer } = require('../index');

chai.use(chaiHttp);
const loginDetails = {
  email: 'lemoisson@quick-credit.com',
  password: '12345678',
  fname: 'lemoissn',
  lname: 'metre',
  country: 'Republic of Rwanda ',
  address: 'Rubavu',
  city: 'Gisenyi',
};

const loginDetailsUndefinned = {
  email: 'lemoisson@quick-credit.com',
  password: '12345678',
  fname: 'lemoissn',
  country: 'Republic of Rwanda ',
  address: 'Rubavu',
  city: 'Gisenyi',
};

const loginDetailsInvalidMail = {
  email: 'lemoissonquick-credit.com',
  password: '12345678',
};

const loginDetailsInvalidPassword = {
  email: 'lemoissonquick-credit.com',
  password: '1234',
};

const loginDetailsTrue = {
  email: 'lemoissonM@quick-credit.com',
  password: '12345678',
  fname: 'lemoissn',
  lname: 'metre',
  country: 'Republic of Rwanda ',
  address: 'Rubavu',
  city: 'Gisenyi',
};

describe('Signup', () => {
  it('it should not create an account with undefinned values', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send('')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should not create an account if the email is already taken', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(409);

        done();
      });
  });

  it('should return a 200 status and user data when everything is okey', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(loginDetailsTrue)
      .end((err, res) => {
        res.should.have.status(201);
        chai.expect(res.body.data.email).equal('lemoissonM@quick-credit.com');
        closeServer();
        done();
      });
  });


  it('should not create account with invalid mail', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(loginDetailsInvalidMail)
      .end((err, res) => {
        res.should.have.status(400);
        closeServer();
        done();
      });
  });

  it('should not create account with a password having less than 8 characters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(loginDetailsInvalidPassword)
      .end((err, res) => {
        res.should.have.status(400);
        closeServer();
        done();
      });
  });

  it('should not create account with undefinned parameters', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(loginDetailsUndefinned)
      .end((err, res) => {
        res.should.have.status(400);
        closeServer();
        done();
      });
  });
});
