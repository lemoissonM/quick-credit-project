import jwt from 'jsonwebtoken';
import { checkLoan } from '../helper/userHelper';
import {
  validateToken, notValidToken, tokenError,
} from '../helper/middlewareHelper';

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

      const email = decoded.id;
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
    });
  } else {
    return tokenError(res);
  }
}
