import { loans } from '../models/Loan';
import pool from '../config/configDb';
import { getLoansQuery, getUserLoansQuery } from '../models/Queries';

export function getLoanCount() {
  return loans.length;
}
function getLoans(email, status, repaid, res) {
  if (!email) {
    pool.query(getLoansQuery(repaid, status))
      .then((result) => {
        res.status(200).send({
          status: 200,
          data: result.rows,
        });
        return result;
      })
      .catch((err) => {
      });
  } else {
    pool.query(getUserLoansQuery(repaid, status, [email]))
      .then((result) => {
        res.status(200).send({
          status: 200,
          data: result.rows,
        });
      })
      .catch((err) => {
      });
  }
}
export function getAllLoans(email, res) {
  getLoans(email, undefined, undefined, res);
}

export function getApprovedLoans(email, res) {
  getLoans(email, 'approved', undefined, res);
}
export function getCurrentLoans(email, res) {
  getLoans(email, 'approved', false, res);
}
export function getRepaidLoans(email, res) {
  getLoans(email, undefined, true, res);
}
export function getPendingLoans(email, res) {
  getLoans(email, 'pending', undefined, res);
}
export function getDeniedLoans(email, res) {
  getLoans(email, 'denied', undefined, res);
}
