/* eslint-disable linebreak-style */
import express from 'express';
import login from '../../controller/login_controller';

const router = express.Router();
// auths routes
router.post('/signin', login);
export default router;
