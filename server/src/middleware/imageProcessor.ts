import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

/**
 * Middleware to process uploaded images:
 * - Validate the image (aspect ratio, resolution, size, etc.)
 * - Create a thumbnail
 */
export const processImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Ensure file exists
    if (!req.file) {
      res.status(400).json({
        status: 'error',
        message: 'No image uploaded.',
      });
      return;
    }

    const filePath = path.join('uploads', 'images', req.file.filename);
    const thumbnailPath = path.join('uploads', 'thumbnails', req.file.filename);

    // Validate file size
    if (req.file.size > 15 * 1024 * 1024) {
      // 15 MB limit
      fs.unlinkSync(filePath); // Delete the uploaded file
      res.status(400).json({
        status: 'error',
        message: 'File size exceeds the limit of 15MB.',
      });
      return;
    }

    // Validate image dimensions using sharp
    const metadata = await sharp(filePath).metadata();
    if (
      metadata.width &&
      metadata.height &&
      metadata.width / metadata.height < 0.5
    ) {
      fs.unlinkSync(filePath); // Delete the uploaded file
      res.status(400).json({
        status: 'error',
        message: 'Invalid image dimensions. Aspect ratio is too narrow.',
      });
      return;
    }

    // Generate thumbnail
    await sharp(filePath)
      .resize(200) // Thumbnail size
      .toFile(thumbnailPath);

    // Add thumbnail path to the request object for further use
    req.file.thumbnail = thumbnailPath; // Use type assertion to avoid TypeScript errors

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.error('Error processing image:', error);
    next(error); // Pass error to the global error handler
  }
};

/**
 * Utility function to ensure a directory exists.
 * Creates the directory if it does not exist.
 */
const ensureDirectoryExists = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

/**
 * Middleware to process multiple uploaded images:
 * - Validate each image for size and aspect ratio.
 * - Generate thumbnails for valid images.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
export const processImages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.files || !(req.files instanceof Array)) {
      res.status(400).json({
        status: 'error',
        message: 'No images uploaded.',
      });
      return;
    }

    const files = req.files as Express.Multer.File[];
    const processedImages: Array<{ original: string; thumbnail: string }> = [];

    // Ensure the directories for images and thumbnails exist
    const imageDir = path.join('uploads', 'images');
    const thumbnailDir = path.join('uploads', 'thumbnails');
    ensureDirectoryExists(imageDir);
    ensureDirectoryExists(thumbnailDir);

    for (const file of files) {
      const filePath = path.join(imageDir, file.filename);
      const thumbnailPath = path.join(thumbnailDir, file.filename);

      try {
        // Validate file size (15 MB limit)
        if (file.size > 15 * 1024 * 1024) {
          console.error(`File ${file.originalname} exceeds size limit.`);
          throw new Error(
            `File ${file.originalname} exceeds the size limit of 15MB.`
          );
        }

        // Validate image dimensions using sharp
        const metadata = await sharp(filePath).metadata();
        if (
          metadata.width &&
          metadata.height &&
          metadata.width / metadata.height < 0.5
        ) {
          console.error(`File ${file.originalname} has invalid dimensions.`);
          throw new Error(
            `File ${file.originalname} has invalid dimensions. Aspect ratio is too narrow.`
          );
        }

        // Generate thumbnail
        await sharp(filePath)
          .resize(200) // Set thumbnail width
          .toFile(thumbnailPath);

        processedImages.push({
          original: filePath,
          thumbnail: thumbnailPath,
        });
      } catch (error) {
        // Clean up file if processing fails
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        console.error(`Error processing file ${file.originalname}:`, error);
        res.status(400).json({
          status: 'error',
          message: error,
        });
        return;
      }
    }

    // Attach processed image details to the request object
    req.body.processedImages = processedImages;

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.error('Error processing images:', error);
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred while processing images.',
    });
  }
};
