import { NextFunction, Request, Response } from 'express';
import {
  addTransaction,
  deleteTransactionById,
  editTransactionById,
  viewTransactions,
  viewTransactionByCustomerId,
  viewTransactionById,
  filterTransactions,
} from '../service/trans';
export async function postTransaction(req: Request & any, res: Response) {
  const body = req.body;
  const transaction = await addTransaction(body, req.user.Id);
  if (!transaction) {
    return res.status(401).json({
      success: 0,
    });
  } else {
    return res.status(200).json({
      success: 1,
      message: 'Create successfully',
      data: transaction,
    });
  }
}

export async function getTransactions(req: Request & any, res: Response) {
  const transaction = await viewTransactionByCustomerId(req.user.Id);
  if (!transaction) {
    return res.status(401).json({
      success: 0,
    });
  }
  return res.status(200).json({
    success: 1,
    message: 'Returned Successfully',
    data: transaction,
  });
}

export async function viewAllTransactions(req: Request & any, res: Response) {
  const transactions = await viewTransactions(req.pagination);
  if (!transactions) {
    return res.status(401).json({
      success: 0,
    });
  }
  return res.status(200).json({
    success: 1,
    message: 'Returned Successfully',
    data: transactions,
  });
}

export async function viewTransactionId(req: Request & any, res: Response) {
  const transactions = await viewTransactionById(req.params.id, req.user.Id);
  if (!transactions) {
    return res.status(401).json({
      success: 0,
    });
  }
  return res.status(200).json({
    success: 1,
    message: 'Returned Successfully',
    data: transactions,
  });
}
export async function editTransaction(req: Request & any, res: Response) {
  const id = req.params.id;
  const body = req.body;
  let transaction: any = await editTransactionById(body, id);
  if (transaction) {
    res.status(200).send({ msg: 'success', content: transaction });
  } else {
    res.send({ msg: 'not exist ' });
  }
}
export async function deleteTransaction(req: Request & any, res: Response) {
  try {
    const transaction: any = await deleteTransactionById(req.params.id);
    if (!transaction) {
      return res.status(404).send('Failed');
    }
    res.status(200).send('Done Successfully');
  } catch (e) {
    res.status(500).send(e);
  }
}
export async function getTransactionsByFiltring(
  req: Request & any,
  res: Response
) {
  const transactions = await filterTransactions(req.pagination, req.query);

  if (!transactions) {
    return res.status(401).json({
      success: 0,
    });
  }
  return res.status(200).json({
    success: 1,
    message: 'Returned Successfully',
    data: transactions,
  });
}
