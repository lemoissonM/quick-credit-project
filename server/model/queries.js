/* eslint-disable linebreak-style */


const createUserTableString = `CREATE TABLE public.users ( 
     id serial PRIMARY KEY,
     email varchar(50) unique,
     firstname varchar(30),
     lastname varchar(30), 
     password text, 
     addess text, 
     country varchar(20), 
     status varchar(20), 
     isAdmin boolean
     );
     `;
const createLoanTableString = `CREATE TABLE public.loans ( 
    id serial PRIMARY KEY, 
    usermail varchar(50) unique, 
    tenor integer, 
    amount numeric, 
    repaid boolean, 
    interest numeric, 
    paymentInstallment integer, 
    balance numeric, 
    createdOn date, 
    status varchar(20),
    CONSTRAINT user_fk FOREIGN KEY (usermail)
        REFERENCES public.users (email) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );`;
const createRepaymentTableString = `CREATE TABLE loanRepayments (
    id serial PRIMARY KEY, 
    createdOn date, 
    loanid integer, 
    amount numeric, 
    tenorCovered numeric,
    CONSTRAINT loan_fk FOREIGN KEY (loanid)
        REFERENCES public.loans (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );`;

const createTablesQuery = () => ({
  text: `${createUserTableString} ${createLoanTableString} ${createRepaymentTableString}`,
});
export default createTablesQuery;
