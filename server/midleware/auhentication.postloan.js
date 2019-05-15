/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { checkLoan } from '../helper/userHelper';
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
      const { email } = checkLoan(req.decoded.id);
      if (email) {
        req.userMail = email;
        next();
      } else {
        res.status(404)
          .send({
            status: 404,
            message: 'We don\'t have a user with such a token, this user doesn\'t exist',
          });
      }
    });
  } else {
    return tokenError(res);
  }
  return '';
}
