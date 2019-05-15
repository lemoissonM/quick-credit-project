/* eslint-disable linebreak-style */
const { getSingleUser, getUsersCount, addUser } = require('../helper/userHelper');
const { User } = require('../model/user');
const { checkEmail, checkSpaces } = require('../helper/string_check');

// Parse incoming requests data
function signup(req, res) {
  let errorMessage = '';
  const {
    email, password, fname, lname, address, country,
  } = req.body;
  if (!email) errorMessage = 'please provide an email address';
  else if (!checkEmail(email)) errorMessage = 'Please provide a valid email address (example@provider.com)';
  else if (!password)errorMessage = 'The password is not defined';
  else if (checkSpaces(password) || password.length < 8) {
    errorMessage = 'Please provide a correct password, it should have at least 8 character and should not contain only spaces';
  } else if (!fname)errorMessage = 'The first name is not defined';
  else if (checkSpaces(fname)) errorMessage = 'Please provide a correct first name, it should not contain only spaces';
  else if (!req.body.lname)errorMessage = 'The last name is not defined';
  else if (checkSpaces(lname)) errorMessage = 'Please provide a correct last name, it should not contain only spaces';
  else if (!address)errorMessage = 'the address is not defined';
  else if (checkSpaces(address)) errorMessage = 'Please provide a correct address, it should not contain only spaces';
  else if (!country)errorMessage = 'The country does not exist';
  else if (checkSpaces(country)) errorMessage = 'Please provide a correct country, it should not contain only spaces';
  if (errorMessage) {
    res.status(400).send({
      status: 400,
      message: errorMessage,
    });
  } else {
    const user = getSingleUser(email);
    if (!user[0]) {
      const newUser = new User(getUsersCount, email, req.body.fname,
        req.body.lname, req.body.password, req.body.address, req.body.country, 'unverified', false);
      addUser(newUser);
      res.status(201).send({
        status: 201,
        data: newUser.toJSON(),
      });
    } else {
      res.status(409).send({
        status: 409,
        message: 'This mail already exists, please use another one to create an account',
      });
    }
  }
  return res;
}
module.exports = signup;
