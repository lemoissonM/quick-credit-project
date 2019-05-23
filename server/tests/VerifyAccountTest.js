

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, closeServer } = require('../index');
const users = require('../models/User');

chai.use(chaiHttp);

const loginDetailsAdmin = {
  email: 'admin2@quick-credit.com',
  password: '12345678',
  firstname: 'lemoissn',
  lastname: 'metre',
  country: 'Republic of Rwanda ',
  address: 'Rubavu',
  city: 'Gisenyi',
  isAdmin: 'true',
};
let adminToken = '';
it('should return a 200 status and user data when everything is okey', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(loginDetailsAdmin)
    .end((err, res) => {
      adminToken = res.body.data.token;
      done();
    });
});

describe('verify user', () => {
  it('wrong authorization token provided', (done) => {
    chai.request(app)
      .patch('/api/v1/users/leol@gmail.com/verify')
      .set('Authorization', `Bearer ${users.users[1].token}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(403);
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
        done();
      });
  });

  it('No authorization token provided', (done) => {
    chai.request(app)
      .patch('/api/v1/users/leol@gmail.com/verify')
      .send('')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('it should not verify user if mail does not exist', (done) => {
    chai.request(app)
      .patch('/api/v1/users/leol@gmail.com/verify')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return a 200 and new userdata when email exists', (done) => {
    chai.request(app)
      .patch('/api/v1/users/lemoisson@quick-credit.com/verify')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        done();
        closeServer();
      });
  });
});
const userData = {
  newPassword: 'lemoisson',
  oldPassword: '12345678',
};

describe('Reset a password', () => {
  it('it should change the password to lemoisson', (done) => {
    chai.request(app)
      .patch('/api/v1/users/lemoissonM@quick-credit.com/resetPassword')
      .send(userData)
      .end((err, res) => {
        res.should.have.status(204);
        console.log(res.body.message);
        done();
      });
  });

  it('should return a 404 status since email does not exist', (done) => {
    chai.request(app)
      .patch('/api/v1/users/lemoissonM@gmail.com/resetPassword')
      .send('')
      .end((err, res) => {
        res.should.have.status(404);
        console.log(res.body);
        done();
        closeServer();
      });
  });
});
