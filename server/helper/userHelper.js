/* eslint-disable linebreak-style */
import { users } from '../model/user';
// import { getSingleLoan } from './loansHelper';


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
export function checkLoanEmail(id, email) {
  const result = users.findIndex(user => ((user.email === email && user.id === id) || (user.id === id && user.isAdmin)));
  console.log(`id ${id} email ${email} result ${result} `);
  return result;
}
export function checkLoan(id) {
  const result = users.find(user => ((user.id === id) || (user.id === id && user.isAdmin)));
  return result;
}
/*
export function checkUserLoan(id, loanID) {
  const loan = getSingleLoan(loanID);
  if (loan) {
    const email = loan.userMail;
    const result = users.findIndex(user => ((user.email === email && user.id === id) || (user.id === id && user.isAdmin)));
    /* console.log(`id ${id} email ${email} result ${result} `); */
//  return result;
// } return -2;
// }
