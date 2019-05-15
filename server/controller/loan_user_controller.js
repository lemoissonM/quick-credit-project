/* eslint-disable linebreak-style */
import {
  addUserLoan, getLoanCount, getPendingLoans,
} from '../helper/loansHelper';
import { getSingleUser } from '../helper/userHelper';

const Loan = require('../model/Loan');

export default function addNewLoan(req, res) {
  let errorMessage = '';
  let status = 400;
  const { userMail } = req;
  if (!userMail) errorMessage = 'Please provide the user email';
  else if (!req.body.tenor || Number.isNaN(req.body.tenor)) errorMessage = ' Please provide a valide tenor (Tenor must be numeric and must not be null)';
  else if (!req.body.amount || Number.isNaN(req.body.amount)) errorMessage = 'please provide a valid loan amount ( The loan amount should be numeric and should not be null)';
  else {
    const user = getSingleUser(userMail);
    const currentLoans = getPendingLoans(userMail);
    if (!user[0]) {
      errorMessage = 'No user found with such a Email, You cannot add a loan for an unexisting user,please Sign up before';
      status = 404;
    } else if (currentLoans[0]) {
      errorMessage = 'You still have a not fully paid loan, please pay your loan before requesting another';
      status = 403;
    } else {
      // eslint-disable-next-line max-len
      const newLoan = addUserLoan(new Loan.Loan(getLoanCount(), userMail, Number.parseInt(req.body.tenor, 10), Number.parseInt(req.body.amount, 10)));
      res.status(201).send({
        status: 201,
        data: newLoan,
      });
    }
  }
  if (errorMessage) {
    res.status(status).send({
      status,
      error: errorMessage,
    });
  }
}
