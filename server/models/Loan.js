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
    if (balance <= 0) {
      this.setRepaidStatus(true);
      this.setStatus('repaid');
      this.balance = 0;
    }
  }
}

const firstLoan = new Loan(0, 'lemoisson@quick-credit.com', 12, 1200);
export const loans = [firstLoan];
