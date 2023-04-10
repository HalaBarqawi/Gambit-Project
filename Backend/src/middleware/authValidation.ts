import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const checkToken = (req: any, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (token) {
        // Remove Bearer from string
        token = token.slice(7);
        jwt.verify(token, "secret", (err: any, decoded: any) => {
            if (err) {
                return res.json({
                    success: 0,
                    message: 'Invalid Token...',
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: 0,
            message: 'Access Denied! Unauthorized User',
        });
    }
};

export default checkToken;
