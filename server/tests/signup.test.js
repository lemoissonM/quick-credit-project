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
        console.log(res.body.message);
        done();
      });
  });

  it('it should not create an account if the email is already taken', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(401);
        console.log(res.body.message);
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
        console.log(res.body.data);
        closeServer();
        done();      
      });
  });
});
