/* eslint-disable linebreak-style */
import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/v1/auth_routes';
<<<<<<< HEAD
=======
import userRouter from './routes/v1/user_routes';
import loanRouter from './routes/v1/loan_routes';
>>>>>>> feature(new-loan-endpoint) add a new loan application [starts #165993306]

export const app = express();
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/auth', authRouter);
<<<<<<< HEAD
=======
app.use('/api/v1/users', userRouter);
app.use('/api/v1/loans', loanRouter);
>>>>>>> feature(new-loan-endpoint) add a new loan application [starts #165993306]
const PORT = process.env.PORT || 7000;
const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Quick credit, Take your project to the next level');
});
export function closeServer() {
  server.close();
}
