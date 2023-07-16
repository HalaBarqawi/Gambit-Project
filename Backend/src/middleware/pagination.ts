import { Request, Response, NextFunction } from 'express';

export function pagination(
  req: Request & any,
  res: Response,
  next: NextFunction
) {
  const pageNumber: number = Number.parseInt(req.query.page);
  const sizeNumber: number = Number.parseInt(req.query.size);

  let page = 0;
  if (!Number.isNaN(pageNumber) && pageNumber > 0) {
    page = pageNumber;
  }
  let size = 10;
  if (!Number.isNaN(sizeNumber) && !(sizeNumber > 10) && !(sizeNumber < 1)) {
    size = sizeNumber;
  }
  req.pagination = {
    page,
    size,
  };
  next();
}
