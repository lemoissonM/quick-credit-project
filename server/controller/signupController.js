import pool from '../config/configDb';
import { getSignupQuery } from '../models/Queries';

const { User } = require('../models/User');

function signup(req, res) {
  const {
    email, password, fname, lname, address, country,
  } = req.body;
  const user = new User(0, email, fname,
    lname, password, address, country, 'unverified', false);
  const values = Object.keys(user).map(key => user[key]);
  values.splice(1, 1);
  pool.query(getSignupQuery(values))
    .then((result) => {
      const newUser = user;
      newUser.id = result.rows[0].id;
      return res.status(201).send({
        status: 201,
        data: newUser.toJSON(),
      });
    }).catch((err) => {
      if (err.constraint === 'users_email_key') {
        return res.status(409).send({
          status: 409,
          message: 'This mail already exists, please use another one to create an account',
        });
      }
      res.status(400).send({
        status: 400,
        message: 'An error occured when creating account',
      });
    });
}
module.exports = signup;
