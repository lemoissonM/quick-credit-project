const wrongDataStatus = (res, message) => {
  res.status(400).send({
    status: 400,
    message,
  });
};
export default function checkSignupData(req, res, next) {
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
    next();
  }
}
