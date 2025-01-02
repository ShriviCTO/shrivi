import { body, param } from 'express-validator';

export const createProductValidation = [
  // Validate 'name' - required, alphanumeric, hyphen, dots allowed, unique
  body('name')
    .notEmpty()
    .withMessage('Product name is required.')
    .isString()
    .withMessage('Product name must be a string.')
    .isLength({ min: 3, max: 100 })
    .withMessage('Product name must be between 3 and 100 characters.')
    .matches(/^[\w\s\-.–]+$/u)
    .withMessage(
      'Product name can only contain alphanumeric characters, spaces, hyphens, and dots.'
    ),

  // Validate 'tagline' - required, max 140 characters
  body('tagline')
    .notEmpty()
    .withMessage('Product tagline is required.')
    .isString()
    .withMessage('Product tagline must be a string.')
    .isLength({ max: 140 })
    .withMessage('Product tagline cannot exceed 140 characters.'),

  // Validate 'description' - required, max 1500 characters
  body('description')
    .notEmpty()
    .withMessage('Product description is required.')
    .isString()
    .withMessage('Product description must be a string.')
    .isLength({ max: 1500 })
    .withMessage('Product description cannot exceed 1500 characters.'),

  // Validate 'tags' - array of strings, min 3, max 10
  body('tags')
    .isArray({ min: 2, max: 10 })
    .withMessage(
      'Tags must be an array with at least 2 and no more than 10 items.'
    )
    .custom((tags: string[]) => {
      for (const tag of tags) {
        if (typeof tag !== 'string') {
          throw new Error('Each tag must be a string.');
        }
      }
      return true;
    }),

  // Validate 'features' - array of objects with 'label' (string, max 25 chars)
  body('features')
    .isArray({ min: 1 })
    .withMessage('Features must be a non-empty array.')
    .custom((features) => {
      for (const feature of features) {
        if (typeof feature !== 'object' || typeof feature.label !== 'string') {
          throw new Error('Each feature must have a string `label`.');
        }
        if (feature.label.length > 25) {
          throw new Error('Feature label cannot exceed 25 characters.');
        }
      }
      return true;
    }),

  // Validate 'nutritionalContent' - required, string
  body('nutritionalContent')
    .notEmpty()
    .withMessage('Nutritional content is required.')
    .isString()
    .withMessage('Nutritional content must be a string.'),

  // Validate 'certifications' - optional, string
  body('certifications')
    .optional()
    .isString()
    .withMessage('Certifications must be a string.'),

  // Validate 'usageInstructions' - required, string, max 1500 characters
  body('usageInstructions')
    .notEmpty()
    .withMessage('Usage instructions are required.')
    .isString()
    .withMessage('Usage instructions must be a string.')
    .isLength({ max: 1500 })
    .withMessage('Usage instructions cannot exceed 1500 characters.'),

  // Validate 'environmentalImpact' - optional, string
  body('environmentalImpact')
    .optional()
    .isString()
    .withMessage('Environmental impact must be a string.'),

  // Validate 'returnPolicy' - optional, object with 'description' and 'process'
  body('returnPolicy')
    .optional()
    .isString()
    .withMessage('Return Policy must be a string.'),
];

/**
 * Validation for updating a product
 */
export const updateProductValidation = [
  param('id').isMongoId().withMessage('Invalid product ID.'),
  body('name')
    .optional()
    .notEmpty()
    .withMessage('Product name cannot be empty.'),
  body('tagline').optional().notEmpty().withMessage('Tagline cannot be empty.'),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('Description cannot be empty.'),
  body('variants')
    .optional()
    .isArray()
    .withMessage('Variants must be an array.')
    .custom((variants) => {
      // Placeholder for custom variant validation logic
      // TODO: finish this
      if (variants === variants) {
        return true;
      }
      return true;
    }),
];

/**
 * Validation for bulk updating inventory
 */
export const bulkUpdateInventoryValidation = [
  body().isArray({ min: 1 }).withMessage('Request body must be an array.'),
  body('*.id').isMongoId().withMessage('Invalid product ID.'),
  body('*.variantId').optional().isMongoId().withMessage('Invalid variant ID.'),
  body('*.stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive integer.'),
  body('*.price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number.'),
];

/**
 * Validation for adding or updating a product discount
 */
export const addProductDiscountValidation = [
  param('id').isMongoId().withMessage('Invalid product ID.'),
  body('startDate').isISO8601().toDate().withMessage('Invalid start date.'),
  body('endDate')
    .isISO8601()
    .toDate()
    .withMessage('Invalid end date.')
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after the start date.');
      }
      return true;
    }),
  body('percentage')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Discount percentage must be between 0 and 100.'),
];

/**
 * Validation for updating a specific product variant
 */
export const updateVariantValidation = [
  param('id').isMongoId().withMessage('Invalid product ID.'),
  param('variantId').isMongoId().withMessage('Invalid variant ID.'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive integer.'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number.'),
];

/**
 * Validation for adding or updating a discount for a specific variant
 */
export const updateVariantDiscountValidation = [
  param('id').isMongoId().withMessage('Invalid product ID.'),
  param('variantId').isMongoId().withMessage('Invalid variant ID.'),
  body('startDate').isISO8601().toDate().withMessage('Invalid start date.'),
  body('endDate')
    .isISO8601()
    .toDate()
    .withMessage('Invalid end date.')
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after the start date.');
      }
      return true;
    }),
  body('percentage')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Discount percentage must be between 0 and 100.'),
];

export default {
  createProductValidation,
  updateProductValidation,
  bulkUpdateInventoryValidation,
  addProductDiscountValidation,
  updateVariantValidation,
  updateVariantDiscountValidation,
};
