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
      .send('') // this is like sending $http.post or this.http.post in Angular
      .end((err, res) => { // when we get a response from the endpoint
        // in other words,
        // the res object should have a status of 201
        res.should.have.status(403);
        console.log(res.body.message);
        done();
      });
  });
  it('Bad authorization token provided', (done) => {
    chai.request(app)
      .patch('/api/v1/users/leol@gmail.com/verify')
      .set('Authorization', 'Bearer llelelel')
      .send('') // this is like sending $http.post or this.http.post in Angular
      .end((err, res) => { // when we get a response from the endpoint
        // in other words,
        // the res object should have a status of 201
        res.should.have.status(401);
        console.log(res.body.message);
        done();
      });
  });
  it('No authorization token provided', (done) => {
    chai.request(app)
      .patch('/api/v1/users/leol@gmail.com/verify')
      .send('') // this is like sending $http.post or this.http.post in Angular
      .end((err, res) => { // when we get a response from the endpoint
        // in other words,
        // the res object should have a status of 201
        res.should.have.status(401);
        console.log(res.body.message);
        done();
      });
  });
  it('No authorization token provided', (done) => {
    chai.request(app)
      .patch('/api/v1/users/leol@gmail.com/verify')
      .set('Authorization', 'Bearer ')
      .send('') // this is like sending $http.post or this.http.post in Angular
      .end((err, res) => { // when we get a response from the endpoint
        // in other words,
        // the res object should have a status of 201
        res.should.have.status(401);
        console.log(res.body.message);
        done();
      });
  });
  it('it should not verify user if mail does not exist', (done) => {
    chai.request(app)
      .patch('/api/v1/users/leol@gmail.com/verify')
      .set('Authorization', `Bearer ${users.users[0].token}`)
      .send('') // this is like sending $http.post or this.http.post in Angular
      .end((err, res) => { // when we get a response from the endpoint
        // in other words,
        // the res object should have a status of 201
        res.should.have.status(403);
        console.log(res.body.message);
        done();
      });
  });
  it('should return a 200 and new userdata when email exists', (done) => {
    chai.request(app)
      .patch('/api/v1/users/lemoisson@quick-credit.com/verify')
      .set('Authorization', `Bearer ${users.users[0].token}`)
      .send('') // this is like sending $http.post or this.http.post in Angular
      .end((err, res) => { // when we get a response from the endpoint
        // in other words,
        // the res object should have a status of 201
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
