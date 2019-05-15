/* eslint-disable linebreak-style */
import {
  getCurrentLoans, getRepaidLoans, getAllLoans, getSingleLoan,
  updateLoan, getPendingLoans, getDeniedLoans,
} from '../helper/loansHelper';

export default function getloans(req, res) {
  let { status, repaid } = req.query;
  if (status) { status = status.trim(); }
  if (repaid) { repaid = repaid.trim(); }
  if (status === 'approved' && repaid === 'false') {
    res.status(200).send({
      status: 200,
      data: getCurrentLoans(),
    });
  } else if (status === 'approved' && repaid === 'true') {
    res.status(200).send({
      status: 200,
      data: getRepaidLoans(),
    });
  } else if (!status && !repaid) {
    res.status(200).send({
      status: 200,
      data: getAllLoans(),
    });
  } else {
    res.status(404).send({
      status: 404,
      message: 'Unable to access this endpoint, please verify your query parameters and make sure they are corrects',
    });
  }
}
