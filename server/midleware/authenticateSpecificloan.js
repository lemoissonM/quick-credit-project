import jwt from 'jsonwebtoken';
import {
  validateToken, notValidToken, tokenError,
} from '../helper/middlewareHelper';
import pool from '../config/configDb';
import { isOWnerQuery } from '../models/Queries';

export default function checkToken(req, res, next) {
  const { loanID } = req.params;
  if (loanID && !isNaN(loanID)) {
    let token = req.headers['x-access-token'] || req.headers.authorization;
    token = validateToken(token);
    if (token) {
      jwt.verify(token, process.env.secret, (err, decoded) => {
        if (err) {
          return notValidToken(res);
        }
        req.decoded = decoded;
        pool.query(isOWnerQuery([req.decoded.id, req.params.loanID]))
          .then((result) => {
            if (result.rows[0].count > 0) next();
            else tokenError(res);
          }).catch(error => tokenError(res));
      });
    } else {
      return tokenError(res);
    }
  } else {
    res.status(400).send({
      status: 400,
      error: 'Provide a valid loan id',
    });
  }
}
