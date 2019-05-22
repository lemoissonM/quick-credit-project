import {
  getCurrentLoans, getRepaidLoans, getAllLoans, getSingleLoan,
  updateLoan, getPendingLoans, getDeniedLoans, getApprovedLoans,
} from '../helper/loansHelper';
import pool from '../config/configDb';
import { getSpecificLoanQuery, UpdateLoanQuery, approveLoanQuery } from '../models/Queries';

export function getloans(req, res) {
  const { status, repaid } = req.query;

  if (status === 'approved' && repaid === 'false') {
    getCurrentLoans(undefined, res);
  } else if (status === 'approved' && repaid === 'true') {
    getRepaidLoans(undefined, res);
  } else if (status === 'pending') {
    getPendingLoans(undefined, res);
  } else if (status === 'approved') {
    getApprovedLoans(undefined, res);
  } else if (status === 'rejected') {
    getDeniedLoans(undefined, res);
  } else if (!status && !repaid) {
    getAllLoans(undefined, res);
  } else {
    res.status(404).send({
      status: 404,
      message: 'Nothing found at this resource',
    });
  }
}

export function getSpecificLoan(req, res) {
  const { loanID } = req.params;

  pool.query(getSpecificLoanQuery([loanID])).then((result) => {
    if (result.rowCount > 0) {
      res.status(200).send({
        status: 200,
        data: result.rows[0],
      });
    } else {
      res.status(404).send({
        status: 404,
        error: 'No loan found for the given ID',
      });
    }
  });
}

export function approveLoan(req, res) {
  const { loanID } = req.params;
  const { status } = req.body;

  pool.query(getSpecificLoanQuery([loanID])).then((result) => {
    if (result.rowCount > 0) {
      const newLoan = result.rows[0];
      if (result.rows[0].status === 'pending') {
        pool.query(approveLoanQuery([loanID, status])).then((newRepayment) => {
          newLoan.status = status;
          res.status(200).send({
            status: 200,
            data: newLoan,
          });
        });
      } else {
        res.status(403).send({
          status: 403,
          error: 'You are not authorized to acces this loan status',
        });
      }
    } else {
      res.status(404).send({
        status: 404,
        error: 'No loan found for the given ID',
      });
    }
  });
}
