/* eslint-disable linebreak-style */
import express from 'express';
import addNewLoan from '../../controller/loan_user_controller';
import checkToken from '../../midleware/auhentication.postloan';


const router = express.Router();

// loans routes
router.post('/', checkToken, addNewLoan);
export default router;
