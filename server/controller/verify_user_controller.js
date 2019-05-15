/* eslint-disable linebreak-style */
const { updateUser, getSingleUser } = require('../helper/userHelper');
const { checkSpaces } = require('../helper/string_check');

// Parse incoming requests data
export default function verify(req, res) {
  const { userEmail } = req.params;
  if (userEmail) {
    const user = getSingleUser(userEmail)[0];
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
        message: 'We do not find a user with such a mail, please verify and try again',
      });
    }
  } else if (checkSpaces(userEmail)) {
    res.status(404).send({
      status: 404,
      message: 'We do not find a user with such a mail, please verify and try again',
    });
  } else {
    res.status(400).send({
      status: 400,
      message: 'bad request, please provide valid parameter',
    });
  }
}
