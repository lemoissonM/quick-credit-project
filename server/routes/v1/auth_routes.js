/* eslint-disable linebreak-style */
import express from 'express';
import login from '../../controller/login_controller';
import signup from '../../controller/signup_controller';

const router = express.Router();
// auths routes
router.post('/signin', login);
router.post('/signup', signup);
export default router;
