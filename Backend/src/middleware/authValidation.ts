import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import { Customer } from '../models/customer';

export const checkToken = async (
  req: Request & any,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (token) {
    // Remove Bearer from string
    token = token.slice(7);

    const decoded = jwt.verify(token, 'secret') as JwtPayload;
    const user = await Customer.findByPk(decoded.id);

    console.log(decoded.Id);
    if (decoded) {
      console.log(user);
      req.user = user;
      req.token = token;
      next();
    } else {
      return res.json({
        success: 0,
        message: 'Tokens not matched !',
      });
    }
  } else {
    return res.status(401).json({
      success: 0,
      message: 'Access Denied! Unauthorized User',
    });
  }
};
