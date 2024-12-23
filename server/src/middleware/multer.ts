import multer, { StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, 'uploads/images/'); // Main directory for images
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValidType = allowedTypes.test(file.mimetype);
  const isValidExt = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (isValidType && isValidExt) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg, and .png files are allowed.'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
});
