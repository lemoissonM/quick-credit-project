import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { secret } = process.env;

export default function createToken(email) {
  const token = jwt.sign({ id: email },
    secret,
    {
      expiresIn: '24h',
    });

  return token;
}
