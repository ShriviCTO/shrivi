import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

/**
 * Middleware: Authenticate JWT
 *
 * Validates the JWT token from the `Authorization` header and attaches the decoded payload to the request.
 *
 * Status Codes:
 * - 401: Unauthorized (if the token is missing or invalid)
 * - 403: Forbidden (if the token is valid but access is denied)
 */
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(' ')[1];

  // Check if the token is present
  if (!token) {
    res.status(401).json({
      status: 'error',
      message: 'Access denied. No token provided.',
    });
    return;
  }

  try {
    // Verify the token and attach the decoded payload to the request
    const decoded = verifyToken(token);
    req.user = decoded; // Assuming `verifyToken` returns an object with the user details
    next();
  } catch (error: unknown) {
    console.error('Error during token verification:', error);

    res.status(403).json({
      status: 'error',
      message: 'Access denied. Invalid or expired token.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Middleware: Authorize Roles
 *
 * Ensures the authenticated user has one of the required roles.
 *
 * @param roles - Array of allowed roles
 * @returns Middleware function
 *
 * Status Codes:
 * - 403: Forbidden (if the user does not have the required role)
 */
export const authorizeRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Ensure the user is authenticated and has a valid role
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        status: 'error',
        message: 'Access denied. Insufficient permissions.',
      });
      return;
    }

    next();
  };
};
