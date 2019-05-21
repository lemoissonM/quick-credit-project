import {
  getLoanCount, getPendingLoans, getAllLoans, getCurrentLoans,
  getRepaidLoans, getDeniedLoans,
} from '../helper/loansHelper';
import pool from '../config/configDb';
import { addLoanQuery, getUserLoansQuery } from '../models/Queries';

const Loan = require('../models/Loan');

export function getUserLoan(req, res) {
  let { status, repaid } = req.query;
  const { email } = req.params;

  if (repaid) { repaid = repaid.trim().toLowerCase(); }
  if (status) { status = status.trim().toLowerCase(); }

  if (status === 'approved' && repaid === 'false') {
    res.status(200).send({
      status: 200,
      data: getCurrentLoans(email),
    });
  } else if (status === 'approved' && repaid === 'true') {
    res.status(200).send({
      status: 200,
      data: getRepaidLoans(email),
    });
  } else if (status === 'pending') {
    res.status(200).send({
      status: 200,
      data: getPendingLoans(email),
    });
  } else if (status === 'rejected') {
    res.status(200).send({
      status: 200,
      data: getDeniedLoans(email),
    });
  } else if (status === 'approved') {
    res.status(200).send({
      status: 200,
      data: getCurrentLoans(email),
    });
  } else if (!repaid && !status) {
    res.status(200).send({
      status: 200,
      data: getAllLoans(email),
    });
  } else {
    res.status(404).send({
      status: 404,
      message: 'We cannot access to this resource',
    });
  }
}

export function addNewLoan(req, res) {
  const { userMail } = req;
  const { tenor, amount } = req.body;
  const newLoan = new Loan.Loan(getLoanCount(), userMail, Number.parseInt(tenor, 10),
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
            console.log(errs);
            res.status(203).send({
              status: 203,
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
      console.log(err);
    });
}
