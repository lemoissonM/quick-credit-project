/* eslint-disable linebreak-style */
import {
  addUserLoan, getLoanCount, getPendingLoans, getAllLoans, getCurrentLoans,
  getRepaidLoans, getDeniedLoans,
} from '../helper/loansHelper';
import { getSingleUser } from '../helper/userHelper';

const Loan = require('../model/Loan');

export function getUserLoan(req, res) {
  let { status, repaid } = req.query;
  const { email } = req.params;

  if (repaid) { repaid = Boolean(repaid); }
  if (status) { status = status.trim().toLowerCase(); }

  if (status === 'approved' && !repaid) {
    res.status(200).send({
      status: 200,
      data: getCurrentLoans(email),
    });
  } else if (status === 'approved' && repaid) {
    res.status(200).send({
      status: 200,
      data: getRepaidLoans(email),
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
  let errorMessage = '';
  let status = 400;
  const { userMail } = req;
  const { tenor, amount } = req.body;

  if (!userMail) errorMessage = 'Please provide the user email';
  else if (!tenor || isNaN(tenor) || tenor < 1) errorMessage = 'Tenor should be a strict positive number';
  else if (!amount || isNaN(amount) || amount < 1) errorMessage = 'Amount should be a strict positive number';
  else {
    const [user] = getSingleUser(userMail);
    const [currentLoans] = getPendingLoans(userMail);
    if (!user) {
      errorMessage = 'No user found for the given email';
      status = 404;
    } else if (currentLoans) {
      errorMessage = 'You still have another pending loan';
      status = 403;
    } else {
      // eslint-disable-next-line max-len
      const newLoan = addUserLoan(new Loan.Loan(getLoanCount(), userMail, Number.parseInt(tenor, 10), Number.parseInt(amount, 10)));
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
