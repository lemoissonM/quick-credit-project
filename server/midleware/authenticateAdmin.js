import jwt from '../../node_modules/jsonwebtoken';
import {
  validateToken, TokenUnauthorized, tokenError,
} from '../helper/middlewareHelper';
import pool from '../config/configDb';
import { isadminQuery } from '../models/Queries';

export default function checkAdmin(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  token = validateToken(token);
  if (token) {
    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return tokenError(res);
      }
      req.decoded = decoded;
      pool.query(isadminQuery([req.decoded.id]))
        .then((result) => {
          if (result.rowCount > 0) next();
          else TokenUnauthorized(res);
        });
    });
  } else {
    return tokenError(res);
  }
}
