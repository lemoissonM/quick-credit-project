
export default function checkData(req, res, next) {
  const { status } = req.body;
  if (status === 'approved' || status === 'rejected') next();
  else {
    res.status(400).send({
      status: 400,
      error: 'Please provide a valid loan status',
    });
  }
}
