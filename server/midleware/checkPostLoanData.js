
export default function checkPostLoanData(req, res, next) {
  let errorMessage = '';
  const status = 400;
  const { userMail } = req;
  const { tenor, amount } = req.body;
  if (!userMail) errorMessage = 'Please provide the user email';
  else if (!tenor || !Number.isInteger(tenor) || tenor < 1) errorMessage = 'Tenor should be a strict positive number';
  else if (!amount || !Number.isInteger(amount) || amount < 1) errorMessage = 'Amount should be a strict positive number';
  else {
    next();
  }
  if (errorMessage) {
    res.status(status).send({
      status,
      error: errorMessage,
    });
  }
}