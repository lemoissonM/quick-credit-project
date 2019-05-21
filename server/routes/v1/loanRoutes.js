import express from 'express';
import { addNewLoan, getUserLoan } from '../../controller/loanUserController';
import checkToken from '../../midleware/auhenticationPostloan';
import { getloans, getSpecificLoan, approveLoan } from '../../controller/loanAdminController';
import checkTokenLoan from '../../midleware/authenticateLoans';
import checkAdmin from '../../midleware/authenticateAdmin';
import { addPayment, getRepayments } from '../../controller/loanRepaymentController';
import checkSpecificLoan from '../../midleware/authenticateSpecificloan';
import checkPostLoanData from '../../midleware/checkPostLoanData';

const router = express.Router();

// loans routes
router.post('/', checkToken, checkPostLoanData, addNewLoan);
router.get('/', checkAdmin, getloans);
router.get('/user/:email/', checkTokenLoan, getUserLoan);
router.get('/:loanID', checkSpecificLoan, getSpecificLoan);
router.patch('/:loanID', checkAdmin, approveLoan);

// loans repayment route
router.post('/:loanID/repayment', checkAdmin, addPayment);
router.get('/:loanID/repayment', checkSpecificLoan, getRepayments);


export default router;
