/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-console */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, closeServer } = require('../index');
const users = require('../model/user');

chai.use(chaiHttp);


describe('verify user', () => {
  it('wrong authorization token provided', (done) => {
    chai.request(app)
      .patch('/api/v1/users/leol@gmail.com/verify')
      .set('Authorization', `Bearer ${users.users[1].token}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(403);
        console.log(res.body.message);
        done();
      });
  });
  it('Bad authorization token provided', (done) => {
    chai.request(app)
      .patch('/api/v1/users/leol@gmail.com/verify')
      .set('Authorization', 'Bearer llelelel')
      .send('')
      .end((err, res) => {
        res.should.have.status(401);
        console.log(res.body.message);
        done();
      });
  });
  it('No authorization token provided', (done) => {
    chai.request(app)
      .patch('/api/v1/users/leol@gmail.com/verify')
      .send('')
      .end((err, res) => {
        res.should.have.status(401);
        console.log(res.body.message);
        done();
      });
  });
  it('No authorization token provided', (done) => {
    chai.request(app)
      .patch('/api/v1/users/leol@gmail.com/verify')
      .set('Authorization', 'Bearer ')
      .send('')
      .end((err, res) => {
        res.should.have.status(401);
        console.log(res.body.message);
        done();
      });
  });
  it('it should not verify user if mail does not exist', (done) => {
    chai.request(app)
      .patch('/api/v1/users/leol@gmail.com/verify')
      .set('Authorization', `Bearer ${users.users[0].token}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(403);
        console.log(res.body.message);
        done();
      });
  });
  it('should return a 200 and new userdata when email exists', (done) => {
    chai.request(app)
      .patch('/api/v1/users/lemoisson@quick-credit.com/verify')
      .set('Authorization', `Bearer ${users.users[0].token}`)
      .send('')
      .end((err, res) => {

        res.should.have.status(200);
        console.log(res.body);
        done();
        closeServer();
      });
  });
});
const userData = {
  newPassword: 'lemoisson',
};
describe('Reset a password', () => {
  it('it should change the apssword to lemoisson', (done) => {
    chai.request(app)
      .patch('/api/v1/users/lemoisson@quick-credit.com/resetPass')
      .send(userData)
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(users.users[1].password).to.equal('lemoisson');
        console.log(res.body.message);
        done();
      });
  });
  it('should return a 400 status since data are not present', (done) => {
    chai.request(app)
      .patch('/api/v1/users/lemoisson@gmail.com/resetPass')
      .send('')
      .end((err, res) => {
        res.should.have.status(400);
        console.log(res.body);
        done();
        closeServer();
      });
  });
});
