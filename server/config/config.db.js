/* eslint-disable linebreak-style */
// configuring my database
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const conString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: conString,
});
export default pool;
