/* eslint-disable linebreak-style */
import { getSingleLoan } from '../helper/loansHelper';
import { LoanRepayment } from '../model/LoanRepayment';
import { getLoanRepayment, addNewLoanRepayment, getRepaymentCount } from '../helper/loanRepaymentsHelper';

export function addPayment(req, res) {
  const loan = getSingleLoan(req.params.loanID);
  const { amount } = req.body;

  if (loan) {
    if (!loan.isRepaid()) {
      if (loan.status === 'approved') {
        if (amount && !Number.isNaN(amount) && amount > 0) {
          const tenorCovered = Number.parseFloat(amount) / loan.getPaymentInstallment();
          const newRepayment = new LoanRepayment(getRepaymentCount(),
            loan.getID(), amount, tenorCovered);
          res.status(201).send({
            status: 201,
            data: addNewLoanRepayment(newRepayment),
          });
        } else {
          res.status(400).send({
            status: 400,
            message: 'Amount should be a positive number',
          });
        }
      } else {
        res.status(403).send({
          status: 403,
          message: 'You are not authorized to add repayment for this loan',
        });
      }
    } else {
      res.status(403).send({
        status: 403,
        message: 'Your loan is already fully paid',
      });
    }
  } else {
    res.status(404).send({
      status: 404,
      message: 'No loan found for the given ID',
    });
  }
}

export function getRepayments(req, res) {
  const loans = getLoanRepayment(req.params.loanID);

  if (loans) {
    res.status(200).send({
      status: 200,
      data: loans,
    });
  } else {
    res.status(404).send({
      status: 404,
      message: 'No loan found for the given ID',
    });
  }
}
