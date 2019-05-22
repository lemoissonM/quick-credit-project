/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../index');

chai.use(chaiHttp);

let adminToken = '';
let normalUserToken = '';
const loginDetails = {
  email: 'lemoisson@quick-credit.com',
  password: 'metre',
};
const loginDetailsTrue = {
  email: 'lemoissonM@quick-credit.com',
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
        chai.expect(res.body.message).equal('The email is required');
        done();
      });
  });

  it('should return a 401 status when empty mail or password provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(loginDetailsEmpty)
      .end((err, res) => {
        res.should.have.status(401);
        chai.expect(res.body.message).equal('You provided a wrong email or password');
        done();
      });
  });

  it('should return a 401 status when wrong mail or password provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(401);
        chai.expect(res.body.message).equal('You provided a wrong email or password');
        done();
      });
  });

  it('should return a 200 status and user data when everything is okey', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(loginDetailsTrue)
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(res.body.data.email).equal('lemoissonM@quick-credit.com');
        normalUserToken = res.body.data.token;
        done();
      });
  });
});
export function getAdminToken() {
  return adminToken;
}

export function getNormalToken() {
  return normalUserToken;
}
