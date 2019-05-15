/* eslint-disable linebreak-style */
import { getSingleUser } from '../helper/userHelper';

const wrongDataStatus = (res, message) => {
  res.status(400).send({
    status: 400,
    message,
  });
};

export default function login(req, res) {
  const { email, password } = req.body;
  if (email === undefined) {
    res.status(400).send({
      status: 400,
      message: 'The email is required',
    });
  } else if (password === undefined) {
    wrongDataStatus(res, 'The password is required');
  } else if (!password || !email) {
    res.status(401).send({
      status: 401,
      message: 'You provided a wrong email or password',
    });
  } else {
    const [user] = getSingleUser(email);
    if (user && user.validatePassword(password)) {
      return res.status(200).json({
        status: 200,
        data: user.toJSON(),
      });
    }
    return res.status(401).send({
      status: 401,
      message: 'You provided a wrong email or password',
    });
  }
  return res;
}
