import jwt from 'jsonwebtoken';

export const generateToken = (payload: object, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn });
};
