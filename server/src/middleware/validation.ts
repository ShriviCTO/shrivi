import { check } from 'express-validator';

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
