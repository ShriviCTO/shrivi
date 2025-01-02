import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import { Product } from '../models/Product';

/**
 * @desc Create a new product along with its variants
 * @route POST /inventory/products
 * @access Restricted to 'founder' and 'inventory manager'
 */
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    name,
    tagline,
    description,
    tags,
    features,
    videos,
    nutritionalContent,
    certifications,
    usageInstructions,
    environmentalImpact,
    returnPolicy,
  } = req.body;

  try {
    // Check if a product with the same name exists (including soft-deleted)
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      res.status(400).json({
        status: 'error',
        message: 'A product with this name already exists.',
      });
      return;
    }

    // Create the product
    const product = new Product({
      name,
      tagline,
      description,
      tags,
      features,
      videos,
      nutritionalContent,
      certifications,
      usageInstructions,
      environmentalImpact,
      returnPolicy,
      status: 'inactive', // Default status
    });

    // Save the product
    await product.save();

    res.status(201).json({
      status: 'success',
      message: 'Product created successfully.',
      data: product,
    });
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

/**
 * @desc Add images to an existing product
 * @route POST /inventory/products/:id/images
 * @access Restricted to 'founder' and 'inventory manager'
 *
 * @responses
 * - 200: Images added successfully.
 * - 400: Invalid input (e.g., archived/deleted product, invalid image count, no images uploaded).
 * - 404: Product not found.
 * - 500: Internal server error.
 */
export const addProductImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    console.log(`Received request to add images to product ID: ${id}`);

    // Ensure the product exists
    const product = await Product.findById(id);
    if (!product) {
      console.log(`Product with ID ${id} not found.`);
      res.status(404).json({
        status: 'error',
        message: 'Product not found.',
      });
      return;
    }

    // Check if the product status allows image updates
    if (['archived', 'deleted'].includes(product.status)) {
      console.log(
        `Cannot add images to product with ID ${id}, status: ${product.status}`
      );
      res.status(400).json({
        status: 'error',
        message: `Cannot add images to a product that is ${product.status}.`,
      });
      return;
    }

    // Validate if files are uploaded
    if (!req.files || !(req.files as Express.Multer.File[]).length) {
      console.log(`No images uploaded for product ID: ${id}`);
      res.status(400).json({
        status: 'error',
        message: 'No images uploaded.',
      });
      return;
    }

    // Validate image count
    const existingImageCount = product.images.length;
    const newImages = req.files as Express.Multer.File[];
    const totalImages = existingImageCount + newImages.length;

    if (totalImages < 3 || totalImages > 10) {
      console.log(
        `Invalid total image count for product ID: ${id}. Existing: ${existingImageCount}, New: ${newImages.length}`
      );
      res.status(400).json({
        status: 'error',
        message: `A product must have between 3 and 10 images. Current count: ${existingImageCount}, trying to add: ${newImages.length}.`,
      });
      return;
    }

    // Extract image URLs and set the first new image as primary if no primary exists
    const uploadedFiles = newImages.map((file, index) => ({
      url: `/uploads/images/${file.filename}`,
      altText: file.originalname, // Default altText as filename
      isPrimary: existingImageCount === 0 && index === 0, // Set primary if no images exist
    }));

    if (existingImageCount > 0) {
      const primaryExists = product.images.some((img) => img.isPrimary);
      if (!primaryExists) {
        uploadedFiles[0].isPrimary = true; // Ensure one primary image exists
      }
    }

    // Update the product with new images
    product.images = [...product.images, ...uploadedFiles];
    await product.save();

    console.log(`Images added successfully to product ID: ${id}.`);

    res.status(200).json({
      status: 'success',
      message: 'Images added successfully.',
      data: product.images,
    });
  } catch (error) {
    console.error('Error in addProductImages:', error);
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred while adding images.',
    });
  }
};

/**
 * @desc Upload a product image
 * @route POST /product/image
 * @access Restricted to authorized users
 * @middleware Uses `upload` for file handling and `processImage` for image processing
 *
 * Request:
 * - Content-Type: multipart/form-data
 * - Field: `image` (required)
 *
 * Response:
 * - 201: Image uploaded successfully
 * - 400: Missing file or validation error
 * - 500: Internal server error
 */

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Check if the file was uploaded
    if (!req.file) {
      res.status(400).json({
        status: 'error',
        message: 'No image file uploaded. Please provide an image.',
      });
      return;
    }

    // Extract file details
    const { filename, mimetype, size } = req.file;

    // Log file details (optional, for debugging purposes)
    console.log(
      `File uploaded: ${filename}, Type: ${mimetype}, Size: ${size} bytes`
    );

    // Ensure the uploaded file exists on the server
    const filePath = path.join('uploads/images', filename);
    if (!fs.existsSync(filePath)) {
      res.status(500).json({
        status: 'error',
        message: 'Image upload failed. File does not exist on the server.',
      });
      return;
    }

    // Response to the client
    res.status(201).json({
      status: 'success',
      message: 'Image uploaded successfully.',
      data: {
        filename,
        url: `/uploads/images/${filename}`,
      },
    });
  } catch (error) {
    console.error('Error in uploadImage:', error);

    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred while uploading the image.',
    });
  }
};

/**
 * @desc Update an existing product
 * @route PUT /inventory/products/:id
 * @access Restricted to 'founder' and 'inventory manager'
 */
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Placeholder logic
    res.status(501).json({
      status: 'error',
      message: 'This functionality is not implemented yet.',
    });
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

/**
 * @desc Soft delete a product
 * @route DELETE /inventory/products/:id
 * @access Restricted to 'founder' and 'inventory manager'
 */
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Placeholder logic
    res.status(501).json({
      status: 'error',
      message: 'This functionality is not implemented yet.',
    });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

/**
 * @desc Get details of a single product by ID
 * @route GET /inventory/products/:id
 * @access Public
 */
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Placeholder logic
    res.status(501).json({
      status: 'error',
      message: 'This functionality is not implemented yet.',
    });
  } catch (error) {
    console.error('Error in getProductById:', error);
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

/**
 * @desc Get all products
 * @route GET /inventory/products
 * @access Public
 */
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Placeholder logic
    res.status(501).json({
      status: 'error',
      message: 'This functionality is not implemented yet.',
    });
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

/**
 * @desc Bulk update inventory
 * @route PUT /inventory/bulk-update
 * @access Restricted to 'founder' and 'inventory manager'
 */
export const bulkUpdateInventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Placeholder logic
    res.status(501).json({
      status: 'error',
      message: 'This functionality is not implemented yet.',
    });
  } catch (error) {
    console.error('Error in bulkUpdateInventory:', error);
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

/**
 * @desc Add or update a discount for a product
 * @route POST /inventory/products/:id/discount
 * @access Restricted to 'founder' and 'inventory manager'
 */
export const addProductDiscount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Placeholder logic
    res.status(501).json({
      status: 'error',
      message: 'This functionality is not implemented yet.',
    });
  } catch (error) {
    console.error('Error in addProductDiscount:', error);
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};

/**
 * @desc Update stock or price for a specific variant
 * @route PUT /inventory/products/:id/variants/:variantId
 * @access Restricted to 'founder' and 'inventory manager'
 */
export const updateProductVariant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Placeholder logic
    res.status(501).json({
      status: 'error',
      message: 'This functionality is not implemented yet.',
    });
  } catch (error) {
    console.error('Error in updateProductVariant:', error);
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred.',
    });
  }
};
