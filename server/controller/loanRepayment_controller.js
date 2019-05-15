/* eslint-disable linebreak-style */
import { getSingleLoan } from '../helper/loansHelper';
import { LoanRepayment } from '../model/LoanRepayment';
import { getLoanRepayment, addNewLoanRepayment, getRepaymentCount } from '../helper/loanRepaymentsHelper';

export function addPayment(req, res) {
  const loan = getSingleLoan(req.params.loanID);
  if (loan) {
    if (!loan.isRepaid()) {
      if (req.body.amount && !Number.isNaN(req.body.amount)) {
        const tenorCovered = Number.parseFloat(req.body.amount) / loan.getPaymentInstallment();
        const newRepayment = new LoanRepayment(getRepaymentCount(),
          loan.getID(), req.body.amount, tenorCovered);
        res.status(201).send({
          status: 201,
          data: addNewLoanRepayment(newRepayment),
        });
      } else {
        res.status(400).send({
          status: 400,
          message: 'Please provide a valid amount, it should be a number',
        });
      }
    } else {
      res.status(403).send({
        status: 403,
        message: 'You can\'t add a repayment transaction to this loan because it is completely repaid',
      });
    }
  } else {
    res.status(404).send({
      status: 404,
      message: 'There is no loan with such an ID, check the loan ID and try again',
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
      message: 'We cannot find a loan with such an ID, please check the loan ID and retry again',
    });
  }
}
