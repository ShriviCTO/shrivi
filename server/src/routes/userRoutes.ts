import { Router } from 'express';
import { getAllUsers, getUserProfile } from '../controllers/userController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

// Get all users (Admin only)
router.get('/', authenticateJWT, getAllUsers);

// Get user profile
router.get('/:id', authenticateJWT, getUserProfile);

export default router;
