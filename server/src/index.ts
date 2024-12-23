import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Server is healthy!' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/inventory', inventoryRoutes);

app.use(
  '/uploads/images',
  express.static(path.join(__dirname, 'uploads/images'))
);
app.use(
  '/uploads/thumbnails',
  express.static(path.join(__dirname, 'uploads/thumbnails'))
);

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.info(`🚀 Server is running at http://localhost:${PORT}`);
});
