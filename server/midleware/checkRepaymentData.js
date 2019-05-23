export default function checkRepaymentData(req, res, next) {
  const { amount } = req.body;

  if (amount && Number.isInteger(+amount) && amount > 0) {
    next();
  } else {
    res.status(400).send({
      status: 400,
      message: 'Amount should be a positive number',
    });
  }
}
