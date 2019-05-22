import express from 'express';
import { addNewLoan, getUserLoan } from '../../controller/loanUserController';
import checkToken from '../../midleware/auhenticationPostloan';
import { getloans, getSpecificLoan, approveLoan } from '../../controller/loanAdminController';
import checkAdmin from '../../midleware/authenticateAdmin';
import { addPayment, getRepayments } from '../../controller/loanRepaymentController';
import { checkSpecificLoan, checkOwnerToken } from '../../midleware/authenticateSpecificloan';
import checkPostLoanData from '../../midleware/checkPostLoanData';
import normalizeRequest from '../../midleware/checkLoanListRequest';
import checkApproveLoanData from '../../midleware/CheckApproveLoanData';

const router = express.Router();

// loans routes
router.post('/', checkToken, checkPostLoanData, addNewLoan);
router.get('/', checkAdmin, normalizeRequest, getloans);
router.get('/user/:email/', checkOwnerToken, normalizeRequest, getUserLoan);
router.get('/:loanID', checkSpecificLoan, getSpecificLoan);
router.patch('/:loanID', checkAdmin, checkApproveLoanData, approveLoan);

// loans repayment route
router.post('/:loanID/repayment', checkAdmin, addPayment);
router.get('/:loanID/repayment', checkSpecificLoan, getRepayments);


export default router;
