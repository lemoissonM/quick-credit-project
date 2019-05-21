import express from 'express';
import login from '../../controller/loginController';
import signup from '../../controller/signupController';
import checkSignupData from '../../midleware/checkSignupData';

const router = express.Router();
// auths routes
router.post('/signin', login);
router.post('/signup', checkSignupData, signup);
export default router;
