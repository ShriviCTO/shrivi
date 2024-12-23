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
 * Middleware to process multiple uploaded images:
 * - Validate each image (aspect ratio, resolution, size, etc.)
 * - Create thumbnails for each image
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

    const files = req.files as Express.Multer.File[]; // Type assertion for uploaded files
    const processedImages: Array<{ original: string; thumbnail: string }> = [];

    for (const file of files) {
      const filePath = path.join('uploads', 'images', file.filename);
      const thumbnailPath = path.join('uploads', 'thumbnails', file.filename);

      // Validate file size
      if (file.size > 15 * 1024 * 1024) {
        // 15 MB limit
        fs.unlinkSync(filePath); // Delete the uploaded file
        res.status(400).json({
          status: 'error',
          message: `File ${file.originalname} exceeds the size limit of 15MB.`,
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
          message: `File ${file.originalname} has invalid dimensions. Aspect ratio is too narrow.`,
        });
        return;
      }

      // Generate thumbnail
      await sharp(filePath)
        .resize(200) // Thumbnail size
        .toFile(thumbnailPath);

      processedImages.push({
        original: filePath,
        thumbnail: thumbnailPath,
      });
    }

    // Attach processed image details to the request object
    req.body.processedImages = processedImages;

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.error('Error processing images:', error);
    next(error); // Pass error to the global error handler
  }
};
