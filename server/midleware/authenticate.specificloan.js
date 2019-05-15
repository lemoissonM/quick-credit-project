/* eslint-disable linebreak-style */
import jwt from '../../node_modules/jsonwebtoken';
import config from '../config/config';
import { checkUserLoan } from '../helper/userHelper';
import {
  validateToken, notValidToken, tokenError,
} from '../helper/middleware.helper';

export default function checkToken(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  token = validateToken(token);
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return notValidToken(res);
      }
      req.decoded = decoded;
      if (checkUserLoan(req.decoded.id, req.params.loanID) >= 0 || checkUserLoan(req.decoded.id, req.params.loanID) === -2) { next(); } else {
        return tokenError(res);
      }
    });
  } else {
    return tokenError(res);
  }
  return '';
}
