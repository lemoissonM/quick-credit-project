/* eslint-disable linebreak-style */
import express from 'express';
import { addNewLoan, getUserLoan } from '../../controller/loan_user_controller';
import checkToken from '../../midleware/auhentication.postloan';
import { getloans, getSpecificLoan } from '../../controller/loan.admin.controller';
import checkTokenLoan from '../../midleware/authenticateLoans';
import checkAdmin from '../../midleware/authenticateAdmin';
import { addPayment, getRepayments } from '../../controller/loanRepayment_controller';
import checkSpecificLoan from '../../midleware/authenticate.specificloan';

const router = express.Router();

// loans routes
router.post('/', checkToken, addNewLoan);
router.get('/', checkAdmin, getloans);
router.get('/user/:email/', checkTokenLoan, getUserLoan);
router.get('/:loanID', checkSpecificLoan, getSpecificLoan);

// loans repayment route
router.post('/:loanID/repayment', checkAdmin, addPayment);
router.get('/:loanID/repayment', checkSpecificLoan, getRepayments);


export default router;
