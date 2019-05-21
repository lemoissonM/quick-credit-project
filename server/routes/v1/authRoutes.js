import express from 'express';
import login from '../../controller/loginController';
import signup from '../../controller/signupController';
import checkSignupData from '../../midleware/checkSignupData';
import checkSigninData from '../../midleware/checkLoginData';

const router = express.Router();
// auths routes
router.post('/signin', checkSigninData, login);
router.post('/signup', checkSignupData, signup);
export default router;
