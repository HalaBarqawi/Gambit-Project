import { Request, Response, NextFunction } from 'express';

export function exceptionHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { status, message }: any = err;

  res.status(status).send({
    message: message,
    path: req.originalUrl,
  });
  next();
}
