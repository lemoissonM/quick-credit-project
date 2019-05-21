import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { checkUserLoan } from '../helper/userHelper';
import {
  validateToken, notValidToken, tokenError,
} from '../helper/middlewareHelper';

dotenv.config();
export default function checkToken(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  token = validateToken(token);
  if (token) {
    const { secret } = process.env;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return notValidToken(res);
      }
      req.decoded = decoded;
      if (checkUserLoan(req.decoded.id, req.params.loanID) >= 0
      || checkUserLoan(req.decoded.id, req.params.loanID) === -2) { next(); } else {
        return tokenError(res);
      }
    });
  } else {
    return tokenError(res);
  }
}
