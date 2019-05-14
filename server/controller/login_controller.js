/* eslint-disable linebreak-style */
import { getSingleUser } from '../helper/userHelper';

export default function login(req, res) {
  if (!req.body.email) {
    res.status(400).send({
      success: 'false',
      message: 'the email is required',
    });
  } else if (!req.body.password) {
    res.status(400).send({
      success: 'false',
      message: 'the password is required',
    });
  } else {
    const user = getSingleUser(req.body.email);
    if (user[0]) {
      if (user[0].validatePassword(req.body.password)) {
        const userN = user[0];
        res.status(200).json({
          status: 200,
          data: userN.toJSON(),
        });
      } else {
        res.status(401).send({
          status: 400,
          message: 'wrong email or password',
        });
      }
    } else {
      res.status(401).send({
        status: 400,
        message: 'wrong email or password',
      });
    }
  }
  return res;
}
