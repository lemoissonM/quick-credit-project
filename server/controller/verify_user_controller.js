/* eslint-disable linebreak-style */
const { updateUser, getSingleUser } = require('../helper/userHelper');

// Parse incoming requests data
export function verify(req, res) {
  const { userEmail } = req.params;
  if (userEmail) {
    const [user] = getSingleUser(userEmail);
    if (user) {
      user.setStatus('verified');
      const newUser = updateUser(user);
      delete newUser.password;
      res.status(200).send({
        status: 200,
        data: newUser,
      });
    } else {
      res.status(404).send({
        status: 404,
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
  const { userEmail } = req.params;
  const { newPassword } = req.body;

  if (newPassword) {
    const [user] = getSingleUser(userEmail);
    if (user) {
      user.password = newPassword;
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
