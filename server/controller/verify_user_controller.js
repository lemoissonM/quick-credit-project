/* eslint-disable linebreak-style */
const { updateUser, getSingleUser } = require('../helper/userHelper');

// Parse incoming requests data
export default function verify(req, res) {
  if (req.params.userEmail) {
    const email = req.params.userEmail;

    const user = getSingleUser(email)[0];
    if (user) {
      user.setStatus('verified');
      const newUser = updateUser(user);
      delete newUser.password;
      res.status(200).send({
        status: 200,
        data: newUser,
      });
    } else {
      res.status(403).send({
        status: 403,
        message: 'This email does not exist',
      });
    }
  } else {
    res.status(400).send({
      status: 400,
      message: 'bad request, please provide valid parameter',
    });
  }
}
