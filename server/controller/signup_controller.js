/* eslint-disable linebreak-style */
const { getSingleUser, getUsersCount, addUser } = require('../helper/userHelper');
const { User } = require('../model/user');

// Parse incoming requests data
function signup(req, res) {
  let errorMessage = '';
  const {
    email, password, fname, lname, address, country,
  } = req.body;

  if (!email) errorMessage = 'The email is not defined';
  else if (!password)errorMessage = 'The password is not defined';
  else if (!fname)errorMessage = 'The first name is not defined';
  else if (!lname)errorMessage = 'The last name is not defined';
  else if (!address)errorMessage = 'The address is not defined';
  else if (!country)errorMessage = 'The country is not defined';
  if (errorMessage) {
    res.status(400).send({
      status: 400,
      message: errorMessage,
    });
  } else {
    const [user] = getSingleUser(email);
    if (!user) {
      const newUser = new User(getUsersCount, email, fname,
        lname, password, address, country, 'unverified', false);
      addUser(newUser);
      res.status(201).send({
        status: 201,
        data: newUser.toJSON(),
      });
    } else {
      res.status(401).send({
        status: 401,
        message: 'This mail already exists',
      });
    }
  }
  return res;
}
module.exports = signup;
