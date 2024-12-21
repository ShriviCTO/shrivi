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
import {
  loginValidation,
  registerValidation,
  requestPasswordResetValidation,
  resetPasswordValidation,
  verifyEmailValidation,
} from '../validations/authValidation';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

router.post(
  '/register',
  registerRateLimiter,
  registerValidation,
  validateRequest,
  registerUser
);
router.post('/login', loginValidation, validateRequest, loginUser);
router.post(
  '/verify-email',
  verifyEmailValidation,
  validateRequest,
  verifyEmail
);
router.post(
  '/request-password-reset',
  requestPasswordResetValidation,
  validateRequest,
  requestPasswordReset
);
router.post(
  '/reset-password',
  resetPasswordValidation,
  validateRequest,
  resetPassword
);
router.post('/social-login', socialLogin);

export default router;
