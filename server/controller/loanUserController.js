import {
  getLoanCount, getPendingLoans, getAllLoans, getCurrentLoans, getApprovedLoans,
  getRepaidLoans, getDeniedLoans,
} from '../helper/loansHelper';
import pool from '../config/configDb';
import { addLoanQuery, getUserLoansQuery } from '../models/Queries';
import { Loan } from '../models/Loan';

export function getUserLoan(req, res) {
  let { status, repaid } = req.query;
  const { email } = req.params;

  if (repaid) { repaid = repaid.trim().toLowerCase(); }
  if (status) { status = status.trim().toLowerCase(); }

  if (repaid) { repaid = repaid.trim().toLowerCase(); }
  if (status) { status = status.trim().toLowerCase(); }

  if (status === 'approved' && repaid === 'false') {
    getCurrentLoans(email, res);
  } else if (status === 'approved' && repaid === 'true') {
    getRepaidLoans(email, res);
  } else if (status === 'pending') {
    getPendingLoans(email, res);
  } else if (status === 'approved') {
    getApprovedLoans(email, res);
  } else if (status === 'rejected') {
    getDeniedLoans(email, res);
  } else if (!status && !repaid) {
    getAllLoans(email, res);
  } else {
    res.status(404).send({
      status: 404,
      message: 'Nothing found at this resource',
    });
  }
}

export function addNewLoan(req, res) {
  const { userMail } = req;
  const { tenor, amount } = req.body;
  const newLoan = new Loan(getLoanCount(), userMail, Number.parseInt(tenor, 10),
    Number.parseInt(amount, 10));
  const loanDataArray = Object.keys(newLoan).map(key => newLoan[key]);
  loanDataArray.splice(0, 1);
  pool.query(getUserLoansQuery(undefined, 'pending', newLoan.userMail))
    .then((result) => {
      if (result.rowCount < 1) {
        pool.query(addLoanQuery(loanDataArray))
          .then((myloans) => {
            const myLoan = newLoan;
            myLoan.id = myloans.rows[0].id;
            return res.status(201).send({
              status: 201,
              data: myLoan,
            });
          }).catch((errs) => {
            res.status(500).send({
              status: 500,
              message: 'An error occured when creating account',
            });
          });
      } else {
        res.status(403).send({
          status: 403,
          message: 'You still have another pending loan',
        });
      }
    })
    .catch((err) => {
    });
}
