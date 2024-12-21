import { body } from 'express-validator';

export const updateUserValidation = [
  body('name').optional().notEmpty().withMessage('Name must not be empty.'),
  body('email').optional().isEmail().withMessage('Invalid email address.'),
  body('phoneNumber')
    .optional()
    .isMobilePhone('any')
    .withMessage('Invalid phone number.'),
  body('bio')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Bio must be under 200 characters.'),
];
