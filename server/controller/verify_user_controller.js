/* eslint-disable linebreak-style */
const { updateUser, getSingleUser } = require('../helper/userHelper');

// Parse incoming requests data
export function verify(req, res) {
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
export function resetPassword(req, res) {
  if (req.body.newPassword) {
    const user = getSingleUser(req.params.userEmail)[0];
    if (user) {
      user.password = req.body.newPassword;
      const result = updateUser(user);
      if (result) {
        res.status(200).send({
          message: 'Your password has been successfuly changed',
          status: 200,
        });
      } else {
        res.status(202).send({
          message: 'Password reset failed, retry again',
          status: 202,
        });
      }
    } else {
      res.status(404).send({
        message: 'There is no user with such an email address',
        status: 404,
      });
    }
  } else {
    res.status(400).send({
      message: 'The new password is required',
      status: 400,
    });
  }
}
