import { check, body } from 'express-validator';

export const registerValidation = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  check('phoneNumber')
    .optional()
    .isMobilePhone('any')
    .withMessage('Invalid phone number'),
];

export const loginValidation = [
  check('email').notEmpty().isEmail().withMessage('Invalid email address'),
  check('password').notEmpty().withMessage('Password is required'),
];

export const verifyEmailValidation = [
  check('token').notEmpty().withMessage('Verification token is required.'),
];

export const requestPasswordResetValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .notEmpty()
    .withMessage('Email is required.'),
];

export const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Reset token is required.'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long.'),
];
