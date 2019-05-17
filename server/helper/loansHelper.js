/* eslint-disable linebreak-style */
import { loans } from '../model/Loan';

export function updateLoan(loan) {
  loans[loan.id] = loan;
  return loans[loan.id];
}
export function getLoanCount() {
  return loans.length;
}
export function filterByUser(email, myloans) {
  return myloans.filter(loan => loan.userMail === email);
}
export function getAllLoans(email) {
  if (email) return filterByUser(email, loans);
  return loans;
}
export function addUserLoan(newLoan) {
  loans.push(newLoan);
  return loans[newLoan.id];
}
export function getSingleLoan(loanID) {
  return loans[loanID];
}
export function getApprovedLoans(email) {
  if (email) return (email, filterByUser(email, loans.filter(loan => loan.getStatus() === 'approved')));
  return loans.filter(loan => loan.getStatus() === 'approved');
}
export function getCurrentLoans(email) {
  return getApprovedLoans(email).filter(loan => loan.isRepaid() === false);
}
export function getRepaidLoans(email) {
  return getAllLoans(email).filter(loan => loan.isRepaid() === true);
}
export function getPendingLoans(email) {
  if (email) return (email, filterByUser(email, loans.filter(loan => loan.getStatus() === 'pending')));
  return loans.filter(loan => loan.getStatus() === 'pending');
}
export function getDeniedLoans(email) {
  if (email) return (email, filterByUser(email, loans.filter(loan => loan.getStatus() === 'denied')));
  return loans.filter(loan => loan.getStatus() === 'denied');
}
