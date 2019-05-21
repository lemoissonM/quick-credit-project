/* eslint-disable linebreak-style */
// configuring my database
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
  user: process.env.user,
  host: 'localhost',
  database: process.env.database,
  password: process.env.password,
});
export default pool;
