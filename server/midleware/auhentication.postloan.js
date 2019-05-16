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
      const resultUser = checkLoan(req.decoded.id);
      if (resultUser) {
        const { email } = resultUser;
        if (email) {
          req.userMail = email;
          next();
        } else {
          res.status(403)
            .send({
              status: 403,
              message: 'You are not authorized to acces this resource',
            });
        }
      } else {
        res.status(403)
          .send({
            status: 403,
            message: 'You are not authorized to acces this resource',
          });
      }
    });
  } else {
    return tokenError(res);
  }
  return '';
}
