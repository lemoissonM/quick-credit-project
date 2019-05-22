
import { hashPassword, comparePassword } from '../helper/hashPassword';
import createToken from '../midleware/createToken';

export class User {
  constructor(id, email, firstName, lastName, password, address, country, status, isAdmin) {
    this.token = createToken(email);
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = hashPassword(password);
    this.address = address;
    this.country = country;
    this.status = status;
    this.isAdmin = isAdmin;
  }

  validatePassword(password) {
    if (comparePassword(password, this.password)) return true;
    return false;
  }

  toJSON() {
    const obj = {
      token: this.token,
      country: this.country,
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      status: this.status,
      isAdmin: this.isAdmin,
    };
    return obj;
  }

  setStatus(status) {
    this.status = status;
  }


  getUserID() {
    return this.id;
  }
}

const admin = new User(0, 'admin@quick-credit.com', 'lemoisson', 'Metre', '12345678', 'Gisozi, Kigali', 'Republic of Rwanda', 'verified', true);
const normalUser = new User(1, 'lemoisson@quick-credit.com', 'lemoisson', 'Metre', '12345678', 'Gisozi, Kigali', 'Republic of Rwanda', 'unverified', false);
const normalUser1 = new User(2, 'murhulametre@quick-credit.com', 'lemoisson', 'Metre', '12345678', 'Gisozi, Kigali', 'Republic of Rwanda', 'unverified', false);

export const users = [admin, normalUser, normalUser1];
