/* eslint-disable linebreak-style */
import express from 'express';
import { addNewLoan, getUserLoan } from '../../controller/loan_user_controller';
import checkToken from '../../midleware/auhentication.postloan';
import getLoans from '../../controller/loan.admin.controller';
import checkTokenLoan from '../../midleware/authenticateLoans';
import checkAdmin from '../../midleware/authenticateAdmin';

const router = express.Router();

// loans routes
router.post('/', checkToken, addNewLoan);
router.get('/', checkAdmin, getLoans);
router.get('/user/:email/', checkTokenLoan, getUserLoan);
export default router;
