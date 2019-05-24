import { LoanRepayment } from '../models/LoanRepayment';
import {
  getSpecificLoanQuery, addRepaymentQuery, getRepaymentQuery, UpdateLoanQuery,
} from '../models/Queries';
import pool from '../config/configDb';

export function addPayment(req, res) {
  const { amount } = req.body;
  pool.query(getSpecificLoanQuery([req.params.loanID]))
    .then((existingLoan) => {
      if (existingLoan.rowCount < 1) {
        res.status(404).send({
          status: 404,
          message: 'No loan found for the given ID',
        });
      } else if (existingLoan.rows[0].repaid) {
        res.status(403).send({
          status: 403,
          message: 'Your loan is already fully paid',
        });
      } else if (existingLoan.rows[0].status !== 'approved') {
        res.status(403).send({
          status: 403,
          message: 'You are not authorized to add repayment for this loan',
        });
      } else {
        const tenorCovered = Number.parseFloat(amount) / existingLoan.rows[0].paymentinstallment;
        const newRepayment = new LoanRepayment(0,
          req.params.loanID, amount, tenorCovered);
        const values = Object.keys(newRepayment).map(key => newRepayment[key]);
        values.splice(0, 1);
        pool.query(addRepaymentQuery(values))
          .then((result) => {
            newRepayment.id = result.rows[0].id;
            
            const loan = existingLoan.rows[0];
            
            let balance = loan.balance - amount;
            if (balance <= 0) {
              loan.repaid = true;
              loan.status = 'repaid';
              balance = 0;
            }
            loan.balance = balance;
            const updateValue = [loan.repaid, loan.status, loan.balance, loan.id];
            pool.query(UpdateLoanQuery(updateValue)).then((newloan) => {
              res.status(201).send({
                status: 201,
                data: newloan.rows[0],
              });
            }).catch(e => console.log(e));
          }).catch((error) => {
            res.status(500).send({
              status: 500,
            });
          });
      }
    });
}
const loanNotFound = (res) => {
  res.status(404).send({
    status: 404,
    message: 'No loan found for the given ID',
  });
};

export function getRepayments(req, res) {
  pool.query(getSpecificLoanQuery([req.params.loanID]))
    .then((existingLoan) => {
      if (existingLoan.rowCount > 0) {
        pool.query(getRepaymentQuery([req.params.loanID]))
          .then((result) => {
            res.status(200).send({
              status: 200,
              data: result.rows,
            });
          }).catch((err) => {
            res.status(500).send({
              status: 500,
            });
          });
      } else loanNotFound(res);
    }).catch((error) => {
      loanNotFound(res);
    });
}
