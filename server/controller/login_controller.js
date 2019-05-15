/* eslint-disable linebreak-style */
import { getSingleUser } from '../helper/userHelper';

const wrongDataStatus = (res, message) => {
  res.status(400).send({
    status: 400,
    message,
  });
};

export default function login(req, res) {
  if (req.body.email === undefined) {
    res.status(400).send({
      status: 400,
      message: 'the email is required, please provide it before proceeding',
    });
  } else if (req.body.password === undefined) {
    wrongDataStatus(res, 'the password is required, please provide it before proceeding');
  } else if (!req.body.password || !req.body.email) {
    wrongDataStatus(res, 'lease provide correct parameters, (email and password) ensure they are not emppty');
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
          status: 401,
          message: 'You provided a wrong email or password',
        });
      }
    } else {
      res.status(401).send({
        status: 401,
        message: 'You provided a wrong email or password',
      });
    }
  }
  return res;
}
