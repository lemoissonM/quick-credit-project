import { loans } from '../models/Loan';
import pool from '../config/configDb';
import { getLoansQuery, getUserLoansQuery } from '../models/Queries';

export function updateLoan(loan) {
  loans[loan.id] = loan;
  return loans[loan.id];
}
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
        res.status(500).send({
          status: 500,
        });
        return null;
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
        res.status(500).send({
          status: 500,
        });
      });
  }
}
export function filterByUser(email, myloans) {
  return myloans.filter(loan => loan.userMail === email);
}
export function getAllLoans(email, res) {
  getLoans(email, undefined, undefined, res);
}
export function addUserLoan(newLoan) {
  loans.push(newLoan);
  return loans[newLoan.id];
}
export function getSingleLoan(loanID) {
  return loans[loanID];
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
