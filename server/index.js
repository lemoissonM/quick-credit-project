/* eslint-disable linebreak-style */
import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/v1/authRoutes';
import userRouter from './routes/v1/userRoutes';
import loanRouter from './routes/v1/loanRoutes';
import pool from './config/configDb';
import { createTablesQuery, getSignupQuery } from './models/Queries';
import { User } from './models/User';

export const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/loans', loanRouter);

pool.query(createTablesQuery()).catch((err) => { });
if (process.env.NODE_ENV === 'test') {
  const user = new User(0, 'admin@quick-credit.com', 'admin',
    'harvest', '12345678', 'gisozi', 'kigali', 'verified', true);
  const userDataArray = Object.keys(user).map(key => user[key]);
  userDataArray.splice(1, 1);
  pool.query(getSignupQuery(userDataArray)).catch((err) => { console.debug(err); });
}
const PORT = process.env.PORT || 7000;
const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Quick credit, Take your project to the next level');
});

export function closeServer() {
  server.close();
}
