import express from 'express';
const router = express.Router();
import {
  deleteTransaction,
  editTransaction,
  postTransaction,
  viewAllTransactions,
  viewTransactionId,
  getTransactions,
} from '../controllers/trans';
import { checkToken } from '../middleware/authValidation';

router.post('/transactions', checkToken, postTransaction);
router.get('/transactions/:id', checkToken, viewTransactionId);
router.get('/transactions', checkToken, viewAllTransactions);
router.get('/transactions/', checkToken, getTransactions);
router.put('/transactions/:id', checkToken, editTransaction);
router.delete('/transactions/:id', checkToken, deleteTransaction);

export { router };
