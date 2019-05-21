import { loanRepaymentData } from '../models/LoanRepayment';
import { getSingleLoan, updateLoan } from './loansHelper';

export function updateLoanPayment(loanID, newAmount) {
  const loan = getSingleLoan(loanID);
  loan.setBalance(loan.getBalance() - newAmount);
  return updateLoan(loan);
}
updateLoanPayment(0, loanRepaymentData[0].getAmount());

export function addNewLoanRepayment(newRepayment) {
  loanRepaymentData.push(newRepayment);
  return updateLoanPayment(newRepayment.getLoanId(), newRepayment.getAmount());
}
export function getRepaymentCount() {
  return loanRepaymentData.length;
}
export function getLoanRepayment(loanID) {
  return loanRepaymentData.filter(repayment => repayment.getLoanId().toString() === loanID);
}
