/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { app } = require('../index');
const { users } = require('../models/User');

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

const loginDetailsAdmin = {
  email: 'admin@quick-credit.com',
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

const loginDetails = {
  email: 'lemoisson@quick-credit.com',
  password: '12345678',
  firstname: 'lemoissn',
  lastname: 'metre',
  country: 'Republic of Rwanda ',
  address: 'Rubavu',
  city: 'Gisenyi',
};
let normalToken = '';
let newLoanID = '';
it('should return a 200 status and user data when everything is okey', (done) => {
  chai.request(app)
    .post('/api/v1/auth/signup')
    .send(loginDetails)
    .end((err, res) => {
      normalToken = res.body.data.token;
      done();
    });
});

describe('Post a new loan', () => {
  it('it should a 400 status because of Undefinned values', (done) => {
    chai.request(app)
      .post('/api/v1/loans/')
      .set('Authorization', `Bearer ${normalToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error).to.be.equal('Tenor should be a strict positive number');
        done();
      });
  });

  it('it should a 401 status because the token is not defined', (done) => {
    chai.request(app)
      .post('/api/v1/loans/')
      .send('')
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.message).to.be.equal('The authorization token provided is invalid');
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
        expect(res.body.message).to.be.equal('The authorization token provided is invalid');
        done();
      });
  });

  it('it should return the new loan data', (done) => {
    chai.request(app)
      .post('/api/v1/loans/')
      .set('Authorization', `Bearer ${normalToken}`)
      .send(newLoanCorrectData)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res.body.data.balance).to.be.equal(2100);
        newLoanID = res.body.data.id;
        console.debug(newLoanID);
        done();
      });
  });

  it('it should return 403 status since the user has a current loan', (done) => {
    chai.request(app)
      .post('/api/v1/loans/')
      .set('Authorization', `Bearer ${normalToken}`)
      .send(duplicateLoanRequestData)
      .end((err, res) => {
        res.should.have.status(403);
        expect(res.body.message).to.be.equal('You still have another pending loan');
        done();
      });
  });
});

describe('Get all  loans specs', () => {
  it('it should return all loans', (done) => {
    chai.request(app)
      .get('/api/v1/loans/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.data.length).to.be.equal(1);
        done();
      });
  });

  it('it should return all loans for a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/loans/user/lemoisson@quick-credit.com/')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        expect(1).to.be.equal(res.body.data.length);
        done();
      });
  });
});

describe('Get current loans spec', () => {
  it('it should return the currents loans', (done) => {
    chai.request(app)
      .get('/api/v1/loans/?status=approved&repaid=false')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.data.length).to.be.equal(0);
        done();
      });
  });

  it('it should return the current loans of lemoisson@quick-credit.com', (done) => {
    chai.request(app)
      .get('/api/v1/loans/user/lemoisson@quick-credit.com/?status=approved&repaid=false')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        expect(0).to.be.equal(res.body.data.length);
        done();
      });
  });
});

describe('Get all repaid loans specs', () => {
  it('it should return all the repaid loans', (done) => {
    chai.request(app)
      .get('/api/v1/loans/?status=approved&repaid=true')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.data.length).to.be.equal(0);
        done();
      });
  });

  it('it should return all the repaid loans for a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/loans/user/lemoisson@quick-credit.com/?status=approved&repaid=true')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(0).to.be.equal(res.body.data.length);
        done();
      });
  });
});

describe('Get all pending loans specs', () => {
  it('it should return all the pending loans for a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/loans/user/lemoisson@quick-credit.com/?status=pending')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(1).to.be.equal(res.body.data.length);
        done();
      });
  });

  it('it should return all the pending loans ', (done) => {
    chai.request(app)
      .get('/api/v1/loans/?status=pending')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(1).to.be.equal(res.body.data.length);

        done();
      });
  });
});

describe('Get all rejected  loans specs', () => {
  it('it should return all the rejected loans for a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/loans/user/lemoisson@quick-credit.com/?status=rejected')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(0).to.be.equal(res.body.data.length);
        done();
      });
  });

  it('it should return all the rejected loans for a specific user', (done) => {
    chai.request(app)
      .get('/api/v1/loans/?status=rejected')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        chai.expect(0).to.be.equal(res.body.data.length);
        done();
      });
  });
});

describe('Get single loan spec', () => {
  it('it should return the loan with id=0', (done) => {
    chai.request(app)
      .get(`/api/v1/loans/${newLoanID}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.data.usermail).to.be.equal('lemoisson@quick-credit.com');
        expect(res.body.data.amount).to.be.equal('2000');
        done();
      });
  });

  it('it should an error since a string is provided as loan id', (done) => {
    chai.request(app)
      .get('/api/v1/loans/lee')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error).to.be.equal('Provide a valid loan id');
        done();
      });
  });

  it('it should return a 404 status since the loan id 1500 doesn\'t exist', (done) => {
    chai.request(app)
      .get('/api/v1/loans/1500')
      .set('Authorization', `Bearer ${adminToken}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.error).to.be.equal('No loan found for the given ID');
        done();
      });
  });
});

describe('approve or reject loan', () => {
  it('it should a 404 status because for not found loan id', (done) => {
    chai.request(app)
      .patch('/api/v1/loans/200')
      .set('Authorization', `Bearer ${users[0].token}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(404);
        expect(res.body.error).to.be.equal('No loan found for the given ID');
        done();
      });
  });

  it('it should a 200 status and loan data when everything is okay', (done) => {
    const requestString = {
      status: 'approved',
    };
    chai.request(app)
      .patch('/api/v1/loans/0')
      .set('Authorization', `Bearer ${users[0].token}`)
      .send(requestString)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.data.userMail).to.be.equal('lemoisson@quick-credit.com');
        expect(res.body.data.interest).to.be.equal(60);
        done();
      });
  });

  it('it should a 403 status when loan already approved', (done) => {
    chai.request(app)
      .patch('/api/v1/loans/0')
      .set('Authorization', `Bearer ${users[0].token}`)
      .send('')
      .end((err, res) => {
        res.should.have.status(403);
        expect(res.body.error).to.be.equal('You are not authorized to acces this loan status');
        done();
      });
  });
});
