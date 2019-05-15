/* eslint-disable linebreak-style */
import {
  addUserLoan, getLoanCount, getPendingLoans, getAllLoans, getCurrentLoans,
  getRepaidLoans,
} from '../helper/loansHelper';
import { getSingleUser } from '../helper/userHelper';
import { checkSpaces } from '../helper/string_check';

const Loan = require('../model/Loan');

export function getUserLoan(req, res) {
  const { email } = req.params;
  const { status, repaid } = req.query;
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
  } else if ((checkSpaces(status) && checkSpaces(repaid)) || (!status && !repaid)) {
    res.status(200).send({
      status: 200,
      data: getAllLoans(email),
    });
  } else {
    res.status(404).send({
      status: 404,
      message: 'Unable to access this endpoint, please verify your query parameters and make sure they are corrects',
    });
  }
}

export function addNewLoan(req, res) {
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