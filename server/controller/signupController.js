import pool from '../config/configDb';
import { getSignupQuery } from '../models/Queries';

const { User } = require('../models/User');

function signup(req, res) {
  const {
    email, password, firstname, lastname, address, country, isAdmin,
  } = req.body;
  let admin = false;
  if (isAdmin && isAdmin === 'true') admin = true;
  else admin = false;
  const user = new User(0, email, firstname,
    lastname, password, address, country, 'unverified', admin);
  const userDataArray = Object.keys(user).map(key => user[key]);
  userDataArray.splice(1, 1);
  pool.query(getSignupQuery(userDataArray))
    .then((result) => {
      const newUser = user;
      newUser.id = result.rows[0].id;
      return res.status(201).send({
        status: 201,
        data: newUser.toJSON(),
      });
    }).catch((err) => {
      if (err.constraint === 'users_email_key' || (err.routine && err.routine === '_bt_check_unique')) {
        return res.status(409).send({
          status: 409,
          message: 'User already exist',
        });
      }
    });
}
module.exports = signup;
