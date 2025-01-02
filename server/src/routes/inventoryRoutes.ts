import { Router } from 'express';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  bulkUpdateInventory,
  addProductDiscount,
  updateProductVariant,
  addProductImages,
  createVariant,
} from '../controllers/inventoryController';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';
import {
  createProductValidation,
  updateProductValidation,
  bulkUpdateInventoryValidation,
  addProductDiscountValidation,
  updateVariantValidation,
} from '../validations/inventoryValidation';
// import { upload } from '../middleware/multer';
import { validateRequest } from '../middleware/validateRequest';
import { upload } from '../middleware/multer';
import { processImages } from '../middleware/imageProcessor';

const router = Router();

/**
 * @route POST /inventory/products
 * @desc Create a new product
 * @access Restricted to 'founder' and 'inventory manager' roles
 */
router.post(
  '/products',
  authenticateJWT,
  authorizeRoles(['founder', 'inventory manager']),
  // upload.array('images', 10), // Max 10 images
  createProductValidation,
  validateRequest,
  createProduct
);

/**
 * @route POST /inventory/products/:id/images
 * @desc Add images to an existing product
 * @access Restricted to 'founder' and 'inventory manager' roles
 */
router.post(
  '/products/:id/images',
  authenticateJWT,
  authorizeRoles(['founder', 'inventory manager']),
  upload.array('images', 10), // Max 10 images
  processImages,
  validateRequest,
  addProductImages
);

/**
 * @route POST /inventory/products/:productId/variants
 * @desc Create a new variant for a product
 * @access Restricted to 'founder' and 'inventory manager'
 */
router.post(
  '/products/:productId/variants',
  authenticateJWT,
  authorizeRoles(['founder', 'inventory manager']),
  // createVariantValidation, // Middleware for validation
  validateRequest, // Middleware to check validation results
  createVariant // Controller function
);

/**
 * @route PUT /inventory/products/:id
 * @desc Update an existing product
 * @access Restricted to 'founder' and 'inventory manager' roles
 */
router.put(
  '/products/:id',
  authenticateJWT,
  authorizeRoles(['founder', 'inventory manager']),
  updateProductValidation,
  updateProduct
);

/**
 * @route DELETE /inventory/products/:id
 * @desc Soft delete a product
 * @access Restricted to 'founder' and 'inventory manager' roles
 */
router.delete(
  '/products/:id',
  authenticateJWT,
  authorizeRoles(['founder', 'inventory manager']),
  deleteProduct
);

/**
 * @route GET /inventory/products
 * @desc Fetch all products
 * @access Public
 */
router.get('/products', getAllProducts);

/**
 * @route GET /inventory/products/:id
 * @desc Fetch product by ID
 * @access Public
 */
router.get('/products/:id', getProductById);

/**
 * @route PUT /inventory/bulk-update
 * @desc Bulk update inventory for multiple products
 * @access Restricted to 'founder' and 'inventory manager' roles
 */
router.put(
  '/bulk-update',
  authenticateJWT,
  authorizeRoles(['founder', 'inventory manager']),
  bulkUpdateInventoryValidation,
  bulkUpdateInventory
);

/**
 * @route POST /inventory/products/:id/discount
 * @desc Add or update a discount for a product
 * @access Restricted to 'founder' and 'inventory manager' roles
 */
router.post(
  '/products/:id/discount',
  authenticateJWT,
  authorizeRoles(['founder', 'inventory manager']),
  addProductDiscountValidation,
  addProductDiscount
);

/**
 * @route PUT /inventory/products/:id/variants/:variantId
 * @desc Update stock or price for a specific variant
 * @access Restricted to 'founder' and 'inventory manager' roles
 */
router.put(
  '/products/:id/variants/:variantId',
  authenticateJWT,
  authorizeRoles(['founder', 'inventory manager']),
  updateVariantValidation,
  updateProductVariant
);

export default router;
