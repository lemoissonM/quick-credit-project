/* eslint-disable linebreak-style */
import express from 'express';
import verify from '../../controller/verify_user_controller';
import adminCheck from '../../midleware/authenticateAdmin';

const router = express.Router();

router.patch('/:userEmail/verify', adminCheck, verify);

export default router;
