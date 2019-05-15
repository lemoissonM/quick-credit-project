/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import config from '../config/config';

export default function createToken(email) {
  const token = jwt.sign({ id: email },
    config.secret,
    {
      expiresIn: '24h',
    });
  return token;
}
