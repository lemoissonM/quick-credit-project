// configuring my database
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let user = '';
let database = '';
let password = '';
let host = '';
if (process.env.NODE_ENV === 'production') {
  user = process.env.userProduction;
  database = process.env.databaseProduction;
  password = process.env.passwordProduction;
  host = process.env.hostProduction;
} else if (process.env.NODE_ENV === 'test') {
  user = process.env.userTest;
  database = process.env.databaseTest;
  password = process.env.passwordTest;
  host = process.env.hostTest;
} else {
  user = process.env.user;
  database = process.env.database;
  password = process.env.password;
  host = process.env.host;
}


const pool = new Pool({
  user,
  host,
  database,
  password,
});
export default pool;
