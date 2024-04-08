import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { UserDocument } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
      const user = await User.findById(decoded.userId);
      if (!user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
  
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };

  //check if the user is an admin
  
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === 'admin') {
    next(); 
  } else {
    res.status(403).json({ error: 'Access denied. You do not have permission to perform this action.' });
  }
};