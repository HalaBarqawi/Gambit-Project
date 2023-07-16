import express from 'express';
const router = express.Router();
import {
  deleteTransaction,
  editTransaction,
  postTransaction,
  viewAllTransactions,
  viewTransactionId,
  getTransactions,
  getTransactionsByFiltring,
} from '../controllers/trans';
import { checkToken } from '../middleware/authValidation';
import { pagination } from '../middleware/pagination';

router.post('/transactions', checkToken, postTransaction);
router.get('/transactions/:id', checkToken, viewTransactionId);
router.get('/transactions', checkToken, pagination, viewAllTransactions);
router.get('/transactions/', checkToken, getTransactions);
router.get(
  '/filterTransactions',
  checkToken,
  pagination,
  getTransactionsByFiltring
);
router.put('/transactions/:id', checkToken, editTransaction);
router.delete('/transactions/:id', checkToken, deleteTransaction);

export { router };
