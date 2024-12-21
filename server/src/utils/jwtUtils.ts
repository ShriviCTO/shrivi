import jwt from 'jsonwebtoken';
import { CustomJwtPayload } from '../types/express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const generateToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string): CustomJwtPayload => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET || 'secret'
  ) as CustomJwtPayload;
};
