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
      if (err.constraint === 'users_email_key' || (err.routine && err.routine === '_bt_check_unique')) {
        return res.status(409).send({
          status: 409,
          message: 'This mail already exists, please use another one to create an account',
        });
      }
      console.debug(err);
      res.status(204).send({
        status: 204,
      });
    });
}
module.exports = signup;
