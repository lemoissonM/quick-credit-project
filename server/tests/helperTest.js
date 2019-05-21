/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import chai from 'chai';
import { hashPassword, comparePassword } from '../helper/hashPassword';

const plainPassword = 'lemoissonW';
const hashedPass = hashPassword(plainPassword);

describe('hash helper', () => {
  it('it should return correct hash result', (done) => {
    chai.expect(hashPassword()).equal(undefined);
    hashPassword(plainPassword).should.not.equal(undefined);
    chai.expect(comparePassword(plainPassword, hashedPass)).equal(true);
    comparePassword('lelel', hashedPass).should.equal(false);
    done();
  });
});
