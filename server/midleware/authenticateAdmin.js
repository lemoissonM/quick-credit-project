/* eslint-disable linebreak-style */
import jwt from '../../node_modules/jsonwebtoken';
import config from '../config/config';
import { checkTokenAdmin } from '../helper/userHelper';
import {
  validateToken, notValidToken, TokenUnauthorized, tokenError,
} from '../helper/middleware.helper';

export default function checkAdmin(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  token = validateToken(token);
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
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
