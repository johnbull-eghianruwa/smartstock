import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDatabase from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import {
  notFoundHandler,
  errorHandler
} from './middleware/error.middleware.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:4200'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'SmartStock API is running'
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Register these after all valid routes
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`SmartStock API running on port ${PORT}`);
  });
};

startServer();
