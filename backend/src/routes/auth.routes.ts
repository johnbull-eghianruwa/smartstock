import { Router } from 'express';

import {
  register,
  login,
  getCurrentUser
} from '../controllers/auth.controller.js';

import { authenticateToken } from '../middleware/auth.middleware.js';

import {
  registerValidation,
  loginValidation,
  handleValidationErrors
} from '../validators/auth.validators.js';
import { loginRateLimiter } from '../middleware/rate-limit.middleware.js';

const router = Router();

router.post(
  '/register',
  registerValidation,
  handleValidationErrors,
  register
);

router.post(
  '/login',
  loginRateLimiter,
  loginValidation,
  handleValidationErrors,
  login
);

router.get('/me', authenticateToken, getCurrentUser);

export default router;
