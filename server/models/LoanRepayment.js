// creating the loan repayment class
export class LoanRepayment {
  constructor(id, loanId, amount, tenorCovered) {
    this.id = id;
    this.createdOn = new Date();
    this.loanId = loanId;
    this.amount = amount;
    this.tenorCovered = tenorCovered;
  }

  getLoanId() {
    return this.loanId;
  }

  getAmount() {
    return this.amount;
  }
}
// defining a basic datastructure to contain loan repayments
const loanRepaymentex1 = new LoanRepayment(0, 0, 210, 2);
export const loanRepaymentData = [loanRepaymentex1];
