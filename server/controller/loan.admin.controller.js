/* eslint-disable linebreak-style */
import {
  getCurrentLoans, getRepaidLoans, getAllLoans, getSingleLoan,
  updateLoan, getPendingLoans, getDeniedLoans, getApprovedLoans,
} from '../helper/loansHelper';

export function getloans(req, res) {
  let { status, repaid } = req.query;
  if (repaid) { repaid = repaid.trim().toLowerCase(); }
  if (status) { status = status.trim().toLowerCase(); }

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
  } else if (status === 'approved') {
    res.status(200).send({
      status: 200,
      data: getCurrentLoans(),
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
      message: 'Nothing found at this resource',
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
        error: 'No loan found for the given ID',
      });
    }
  } else {
    res.status(400).send({
      status: 400,
      error: 'Provide a valid loan id',
    });
  }
}

export function approveLoan(req, res) {
  const loan = getSingleLoan(req.params.loanID);
  const { status } = req.body;

  if (loan) {
    if (loan.status === 'approved') {
      res.status(403).send({
        status: 403,
        error: 'You are not authorized to acces this loan status',
      });
    } else if (status === 'approved') {
      loan.status = 'approved';
      res.status(200).send({
        status: 200,
        data: updateLoan(loan),
      });
    } else if (status === 'rejected') {
      loan.status = 'rejected';
      res.status(200).send({
        status: 200,
        data: updateLoan(loan),
      });
    } else {
      res.status(400).send({
        status: 400,
        error: 'Please provide a valid loan status',
      });
    }
  } else {
    res.status(404).send({
      status: 404,
      error: 'No loan found for the given ID',
    });
  }
}
