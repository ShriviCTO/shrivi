import { Router } from 'express';
import {
  getLoggedInUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from '../controllers/userController';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { updateUserValidation } from '../validations/userValidation';

const router = Router();

// Get details of the logged-in user
router.get('/me', authenticateJWT, getLoggedInUser);

// Get details of another user (Founder only)
router.get('/:id', authenticateJWT, authorizeRoles(['founder']), getUserById);

// Get all users (Founder only)
router.get('/', authenticateJWT, authorizeRoles(['founder']), getAllUsers);

// Update user details (Logged-in users only)
router.put(
  '/me',
  authenticateJWT,
  updateUserValidation,
  validateRequest,
  updateUser
);

// Soft delete user account (Logged-in users only)
router.delete('/me', authenticateJWT, deleteUser);

export default router;
