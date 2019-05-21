import { comparePassword } from '../helper/hashPassword';
import { getSigninQuery } from '../models/Queries';
import pool from '../config/configDb';

export default function login(req, res) {
  const { email, password } = req.body;

  const userDataArray = [email];
  pool.query(getSigninQuery(userDataArray))
    .then((result) => {
      if (result.rowCount > 0) {
        const user = result.rows[0];
        if (user && comparePassword(password, user.password)) {
          user.password = '';
          res.status(200).json({
            status: 200,
            data: user,
          });
        } else {
          res.status(401).send({
            status: 401,
            message: 'You provided a wrong email or password',
          });
        }
      } else {
        res.status(401).send({
          status: 401,
          message: 'You provided a wrong email or password',
        });
      }
    })
    .catch((err) => {
      res.status(401).send({
        status: 401,
        message: 'You provided a wrong email or password',
      });
    });
  return res;
}
