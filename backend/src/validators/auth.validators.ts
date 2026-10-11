import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const registerValidation = [
  body('name')
    .trim()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .isString()
    .withMessage('Email must be a string')
    .bail()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .isString()
    .withMessage('Password must be a string')
    .bail()
    .isLength({ min: 8, max: 72 })
    .withMessage('Password must be between 8 and 72 characters')
];

export const loginValidation = [
  body('email')
    .isString()
    .withMessage('Email must be a string')
    .bail()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .isString()
    .withMessage('Password must be a string')
    .withMessage('Password is required')
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((error) => ({
        field: error.type === 'field' ? error.path : 'request',
        message: error.msg
      }))
    });
    return;
  }

  next();
};
