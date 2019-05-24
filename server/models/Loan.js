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
}

const firstLoan = new Loan(0, 'lemoisson@quick-credit.com', 12, 1200);
export const loans = [firstLoan];
