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
    errorMessage = 'Password should be at least 8 characters long and should not contain spaces only';
  } else if (!fname || checkSpaces(fname))errorMessage = 'Please provide a first last name';
  else if (!lname || checkSpaces(lname))errorMessage = 'Please provide a correct last name';
  else if (!address || checkSpaces(address))errorMessage = 'Please provide a correct address';
  else if (!country || checkSpaces(country))errorMessage = 'Please provide a correct country';

  if (errorMessage) {
    res.status(400).send({
      status: 400,
      message: errorMessage,
    });
  } else {
    const [user] = getSingleUser(email);
    if (!user) {
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
