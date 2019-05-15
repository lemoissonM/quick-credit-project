/* eslint-disable linebreak-style */
import jwt from '../../node_modules/jsonwebtoken';
import config from '../config/config';
import { checkLoanEmail } from '../helper/userHelper';
import {
  validateToken, notValidToken, TokenUnauthorized, tokenError,
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
      if (checkLoanEmail(req.decoded.id, req.params.email) >= 0) { next(); } else {
        return TokenForbidden(res);
      }
    });
  } else {
    return tokenError(res);
  }
  return '';
}
