import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define a custom payload interface for type safety
export interface CustomJwtPayload extends JwtPayload {
  id: string;
  name: string;
  role: string;
}

/**
 * Generates a JSON Web Token (JWT) for user authentication.
 *
 * @param id - The unique identifier of the user.
 * @param name - The name of the user.
 * @param role - The role of the user (e.g., admin, customer).
 * @returns A signed JWT as a string.
 */
export const generateToken = (
  id: string,
  name: string,
  role: string
): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  return jwt.sign({ id, name, role }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

/**
 * Verifies a JWT and returns its decoded payload.
 *
 * @param token - The JWT to verify.
 * @returns The decoded payload as `CustomJwtPayload`.
 * @throws Throws an error if the token is invalid or expired.
 */
export const verifyToken = (token: string): CustomJwtPayload => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET) as CustomJwtPayload;
  } catch (error: unknown) {
    throw new Error('Invalid or expired token.' + error);
  }
};
