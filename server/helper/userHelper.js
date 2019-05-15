/* eslint-disable linebreak-style */
import { users } from '../model/user';
<<<<<<< HEAD
=======
import { getSingleLoan } from './loansHelper';
>>>>>>> feature(add-repayment-endpoint) creates the endppoint to add repayment [starts #166024906]


export const getUsersCount = users.length;

export const addUser = (user) => {
  users.push(user);
};
export function getSingleUser(email) {
  return users.filter(user => user.email === email);
}
export function updateUser(user) {
  users[user.getUserID()] = user;
  return users[user.getUserID()];
}
export function checkTokenAdmin(token) {
  const result = users.findIndex(user => (user.isAdmin && user.token === token));
  return result;
}
<<<<<<< HEAD
<<<<<<< HEAD
export function checkLoan(id, email) {
  const result = users.findIndex(user => ((user.email === email && user.id === id) || (user.id === id && user.isAdmin)));
=======
=======
export function checkLoanEmail(id, email) {
  const result = users.findIndex(user => ((user.email === email && user.id === id) || (user.id === id && user.isAdmin)));
  console.log(`id ${id} email ${email} result ${result} `);
  return result;
}
>>>>>>> feature(get-all-loans) Creates endpoints to get all loans [starts #166023103]
export function checkLoan(id) {
  const result = users.find(user => ((user.id === id) || (user.id === id && user.isAdmin)));
>>>>>>> feature(new-loan-endpoint) add a new loan application [starts #165993306]
  return result;
}
<<<<<<< HEAD
=======

export function checkUserLoan(id, loanID) {
  const loan = getSingleLoan(loanID);
  if (loan) {
    const email = loan.userMail;
    const result = users.findIndex(user => ((user.email === email && user.id === id) || (user.id === id && user.isAdmin)));
    /* console.log(`id ${id} email ${email} result ${result} `); */
    return result;
  } return -2;
}
>>>>>>> feature(add-repayment-endpoint) creates the endppoint to add repayment [starts #166024906]
