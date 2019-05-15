/* eslint-disable linebreak-style */
import {
  getCurrentLoans, getRepaidLoans, getAllLoans, getSingleLoan,
  updateLoan, getPendingLoans, getDeniedLoans,
} from '../helper/loansHelper';

export function getloans(req, res) {
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
  } else if (status === 'pending') {
    res.status(200).send({
      status: 200,
      data: getPendingLoans(),
    });
  } else if (status === 'rejected') {
    res.status(200).send({
      status: 200,
      data: getDeniedLoans(),
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

export function getSpecificLoan(req, res) {
  const { loanID } = req.params;
  if (loanID && !isNaN(loanID)) {
    const loan = getSingleLoan(loanID);
    if (loan) {
      res.status(200).send({
        status: 200,
        data: loan,
      });
    } else {
      res.status(404).send({
        status: 404,
        error: 'We cannot find a loan with such an ID, please check the loan ID and try again',
      });
    }
  } else {
    res.status(400).send({
      status: 400,
      error: 'You should provide a valid loan ID, it should be a number',
    });
  }
}
