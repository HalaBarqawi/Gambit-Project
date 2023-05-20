import { Request, Response } from 'express';
import { postTrans, previewTrans } from '../service/trans';
export async function Trans_Add(req: Request, res: Response) {
  const body = req.body;
  const transaction = await postTrans(body);
  if (!transaction) {
    return res.status(401).json({
      success: 0,
    });
  }
  return res.status(200).json({
    success: 1,
    message: 'Create successfully',
    data: transaction,
  });
}

export async function transaction(req: Request, res: Response) {
  const id: number = Number(req.params.id);
  const transaction = await previewTrans(id);
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
