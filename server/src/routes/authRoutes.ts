import { Router } from 'express';
import {
  registerUser,
  loginUser,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  socialLogin,
} from '../controllers/authController';
import { registerRateLimiter } from '../middleware/rateLimiter';
import { registerValidation } from '../middleware/validation';

const router = Router();

router.post('/register', registerRateLimiter, registerValidation, registerUser);
router.post('/login', loginUser);
router.get('/verify-email', verifyEmail);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.post('/social-login', socialLogin);

export default router;
