import dotenv from 'dotenv';
import jwt from '../../node_modules/jsonwebtoken';
import { checkTokenAdmin } from '../helper/userHelper';
import {
  validateToken, notValidToken, TokenUnauthorized, tokenError,
} from '../helper/middlewareHelper';

dotenv.config();
export default function checkAdmin(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  token = validateToken(token);
  if (token) {
    const { secret } = process.env;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return notValidToken(res);
      }
      req.decoded = decoded;
      if (checkTokenAdmin(token) >= 0) { next(); } else {
        return TokenUnauthorized(res);
      }
    });
  } else {
    return tokenError(res);
  }
}
