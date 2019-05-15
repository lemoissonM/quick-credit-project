/* eslint-disable linebreak-style */

export class Loan {
  constructor(id, userMail, tenor, amount) {
    this.id = id;
    this.userMail = userMail;
    this.tenor = tenor;
    this.amount = amount;
    this.repaid = false;
    this.interest = (amount * 5) / 100;
    this.paymentInstallment = (this.amount + this.interest) / this.tenor;
    this.balance = amount + this.interest;
    this.createdOn = new Date();
    this.status = 'pending';
  }

  getID() {
    return this.id;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
  }

  getUserMail() {
    return this.userMail;
  }

  getPaymentInstallment() {
    return this.paymentInstallment;
  }

  getBalance() {
    return this.balance;
  }

  isRepaid() {
    return this.repaid;
  }

  setRepaidStatus(repaidStatus) {
    this.repaid = repaidStatus;
  }

  setBalance(balance) {
    this.balance = balance;
    if (balance < 0) {
      this.setRepaidStatus(true);
      this.balance = 0;
    }
  }

  getInterest() {
    return this.interest;
  }

  getCreatedOn() {
    return this.createdOn;
  }
}

const firstLoan = new Loan(0, 'lemoisson@quick-credit.com', 12, 1200);
export const loans = [firstLoan];
loans.push(new Loan(1, 'lemoissonM@quick-credit.com', 10, 2000));
loans.push(new Loan(2, 'lemoissonM@quick-credit.com', 9, 1500));
loans.push(new Loan(3, 'lemoisson@quick-credit.com', 2, 500));
loans.push(new Loan(4, 'lemoisson@quick-credit.com', 4, 5000));
loans.push(new Loan(5, 'lemoisson@quick-credit.com', 7, 8000));
loans.push(new Loan(6, 'lemoisson@quick-credit.com', 4, 300));
loans.push(new Loan(7, 'lemoisson@quick-credit.com', 9, 5000));
loans.push(new Loan(8, 'lemoisson@quick-credit.com', 10, 2000));
loans[0].setStatus('approved');
loans[1].setStatus('approved');
loans[2].setStatus('approved');
loans[3].setStatus('approved');
loans[1].setRepaidStatus(true);
loans[3].setRepaidStatus(true);