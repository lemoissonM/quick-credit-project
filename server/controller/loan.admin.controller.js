/* eslint-disable linebreak-style */
import {
  getCurrentLoans, getRepaidLoans, getAllLoans, getSingleLoan,
  updateLoan, getPendingLoans, getDeniedLoans,
} from '../helper/loansHelper';

export default function getloans(req, res) {
  res.status(200).send({
    status: 200,
    data: getAllLoans(),
  });
}
