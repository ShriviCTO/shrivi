import { body, param } from 'express-validator';

export const createProductValidation = [
  // Validate 'name' - required, string, and unique
  body('name')
    .notEmpty()
    .withMessage('Product name is required.')
    .isString()
    .withMessage('Product name must be a string.')
    .isLength({ max: 100 })
    .withMessage('Product name cannot exceed 100 characters.'),

  // Validate 'tagline' - required and string
  body('tagline')
    .notEmpty()
    .withMessage('Product tagline is required.')
    .isString()
    .withMessage('Product tagline must be a string.')
    .isLength({ max: 150 })
    .withMessage('Product tagline cannot exceed 150 characters.'),

  // Validate 'description' - required and string
  body('description')
    .notEmpty()
    .withMessage('Product description is required.')
    .isString()
    .withMessage('Product description must be a string.')
    .isLength({ max: 2000 })
    .withMessage('Product description cannot exceed 2000 characters.'),

  // Validate 'tags' - must be an array of strings
  body('tags')
    .isArray({ min: 1 })
    .withMessage('Tags must be a non-empty array.')
    .custom((tags: string[]) => {
      for (const tag of tags) {
        if (typeof tag !== 'string') {
          throw new Error('Each tag must be a string.');
        }
      }
      return true;
    }),

  // Validate 'features' - must be an array of objects with 'icon' and 'label'
  body('features')
    .isArray({ min: 1 })
    .withMessage('Features must be a non-empty array.')
    .custom((features) => {
      for (const feature of features) {
        if (
          typeof feature !== 'object' ||
          typeof feature.icon !== 'string' ||
          typeof feature.label !== 'string'
        ) {
          throw new Error(
            'Each feature must have a string `icon` and a string `label`.'
          );
        }
      }
      return true;
    }),

  // Validate 'images' - optional, must be an array of objects with 'url', 'altText', and 'isPrimary'
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array.')
    .custom((images) => {
      for (const image of images) {
        if (
          typeof image !== 'object' ||
          typeof image.url !== 'string' ||
          typeof image.altText !== 'string' ||
          typeof image.isPrimary !== 'boolean'
        ) {
          throw new Error(
            'Each image must have a string `url`, string `altText`, and boolean `isPrimary`.'
          );
        }
      }
      return true;
    }),
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
