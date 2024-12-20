import { Router } from 'express';
import { login, socialAuth } from '../controllers/authController';

const router = Router();

// Employee/Admin Login
router.post('/login', login);

// Social Media Authentication
router.post('/social-auth', socialAuth);

export default router;
