const { checkEmail, checkSpaces } = require('../helper/stringCheck');

export default function checkSignupData(req, res, next) {
  const {
    email, password, firstname, lastname, address, country,
  } = req.body;
  let errorMessage = '';
  if (!email) errorMessage = 'please provide an email address';
  else if (!checkEmail(email)) errorMessage = 'Please provide a valid email address (example@provider.com)';
  else if (!password)errorMessage = 'The password is not defined';
  else if (checkSpaces(password) || password.length < 8) {
    errorMessage = 'Password should be at least 8 characters long and should not contain spaces only';
  } else if (!firstname || checkSpaces(firstname))errorMessage = 'Please provide a first last name';
  else if (!lastname || checkSpaces(lastname))errorMessage = 'Please provide a correct last name';
  else if (!address || checkSpaces(address))errorMessage = 'Please provide a correct address';
  else if (!country || checkSpaces(country))errorMessage = 'Please provide a correct country';
  if (errorMessage) {
    res.status(400).send({
      status: 400,
      message: errorMessage,
    });
  } else {
    next();
  }
}
