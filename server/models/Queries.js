
const createUserTableString = `CREATE TABLE public.users ( 
     id serial PRIMARY KEY,
     email varchar(50) unique,
     firstname varchar(30),
     lastname varchar(30), 
     password text, 
     address text, 
     country varchar(50), 
     status varchar(50), 
     isAdmin boolean,
     token text
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

export const createTablesQuery = () => ({
  text: `${createUserTableString} ${createLoanTableString} ${createRepaymentTableString}`,
});

export const getSignupQuery = values => ({
  text: 'INSERT INTO users (token,email,firstName, lastName, password, address, country, status, isadmin) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',
  values,
});

export const getDeleteUserQuery = values => ({
  text: 'DELETE from users where email = $1',
  values,
});
export const getSigninQuery = values => ({
  text: 'SELECT * from users where email = $1',
  values,
});

export const getSpecificLoanQuery = values => ({
  text: 'select * from loans where id = $1',
  values,
});

export const isadminQuery = values => ({
  text: 'select isadmin from users where email = $1 and isadmin=true',
  values,
});

export const isOWnerQuery = values => ({
  text: 'select count(*) from loans, users where ((usermail = $1 and loans.id = $2) or users.isadmin = true) and  users.email =$1',
  values,
});

export const addLoanQuery = values => ({
  text: 'INSERT INTO loans (userMail, tenor, amount, repaid, interest, paymentinstallment, balance, createdon, status) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',
  values,
});

export const getUserLoanRequestBuilder = (repaid, status) => {
  if (repaid && status) return `and repaid = '${repaid}' and status = '${status}'`;
  if (repaid) return ` and repaid = '${repaid}'`;
  if (status) return `and status = '${status}'`;
  return '';
};
export const getUserLoansQuery = (repaid, status, value) => ({
  text: `select * from loans where usermail = '${value}' ${getUserLoanRequestBuilder(repaid, status)}`,
});
export const getLoanRequestBuilder = (repaid, status) => {
  if (repaid && status) return `where repaid = '${repaid}' and status = '${status}'`;
  if (repaid) return `where repaid = '${repaid}'`;
  if (status) return `where status = '${status}'`;
  return '';
};
export const getLoansQuery = (repaid, status) => ({
  text: `select * from loans ${getLoanRequestBuilder(repaid, status)}`,
});
export const UpdateLoanQuery = values => ({
  text: 'update loans set status = $2, repaid = $1, balance = $3 where id = $4 RETURNING *',
  values,
});
export const setUserTokenQuery = values => ({
  text: 'update users set token=$1 where email=$2',
  values,
});

export const addRepaymentQuery = values => ({
  text: 'insert into loanrepayments (createdon, loanid,amount,tenorcovered) values ($1, $2, $3, $4) RETURNING id ',
  values,
});

export const getRepaymentQuery = values => ({
  text: 'select * from loanrepayments where loanid = $1',
  values,
});
export const approveLoanQuery = values => ({
  text: 'update loans set status = $2 where id = $1 returning *',
  values,
});
