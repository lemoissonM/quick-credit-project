import randomstring from 'randomstring';
import { updateUserStatusQuery, getSingleUserQuery, updateUserPasswordQuery } from '../models/Queries';
import pool from '../config/configDb';
import { comparePassword, hashPassword } from '../helper/hashPassword';
import { sendMailPassword } from '../helper/sendMail';


// Parse incoming requests data
export function verify(req, res) {
  const { userEmail } = req.params;
  pool.query(updateUserStatusQuery([userEmail])).then((newUser) => {
    if (newUser.rowCount > 0) {
      delete newUser.rows[0].password;
      res.status(200).send({
        status: 200,
        data: newUser.rows[0],
      });
    } else {
      res.status(404).send({
        status: 404,
        message: 'This email does not exist',
      });
    }
  }).catch((err) => {
    console.debug(err);
  });
}
export function resetPassword(req, res) {
  const { userEmail } = req.params;
  const { newPassword, oldPassword } = req.body;

  pool.query(getSingleUserQuery([userEmail])).then((result) => {
    if (result.rowCount > 0) {
      if (newPassword && oldPassword) {
        if (comparePassword(oldPassword, result.rows[0].password)) {
          pool.query(updateUserPasswordQuery([hashPassword(newPassword), userEmail])).then((updateResult) => {
            if (updateResult.rowCount > 0) {
              res.status(204).send({
              });
            } else {
              res.status(500).send({
                message: 'Password reset failed, retry again',
                status: 500,
              });
            }
          });
        } else {
          res.status(401).send({
            message: 'The old password is wrong',
            status: 401,
          });
        }
      } else {
        const generatedPass = randomstring.generate(8);
        pool.query(updateUserPasswordQuery([hashPassword(generatedPass), userEmail])).then((updateResult) => {
          if (updateResult.rowCount > 0) {
            sendMailPassword(generatedPass, userEmail, res);
          } else {
            res.status(500).send({
              message: 'Password reset failed, retry again',
              status: 500,
            });
          }
        });
      }
    } else {
      res.status(404).send({
        message: 'There is no user with such an email address',
        status: 404,
      });
    }
  });
}
