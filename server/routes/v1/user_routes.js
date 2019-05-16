/* eslint-disable linebreak-style */
import express from 'express';
import { verify, resetPassword } from '../../controller/verify_user_controller';
import adminCheck from '../../midleware/authenticateAdmin';

const router = express.Router();

router.patch('/:userEmail/verify', adminCheck, verify);
router.patch('/:userEmail/resetPass', resetPassword);
export default router;
