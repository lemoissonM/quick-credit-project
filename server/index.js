import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/v1/authRoutes';
import userRouter from './routes/v1/userRoutes';
import loanRouter from './routes/v1/loanRoutes';
import pool from './config/configDb';
import { createTablesQuery } from './models/Queries';

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/users', userRouter);

app.use('/api/v1/loans', loanRouter);

pool.query(createTablesQuery()).catch((err) => { });

const PORT = process.env.PORT || 7000;
const server = app.listen(PORT, () => {
  console.debug('Quick credit, Take your project to the next level');
});

export function closeServer() {
  server.close();
}
