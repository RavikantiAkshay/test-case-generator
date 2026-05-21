const { validationResult } = require('express-validator');
const authService = require('../services/authService');
const { createResponse } = require('../utils/helpers');
const logger = require('../utils/logger');

/**
 * POST /api/auth/signup
 */
const signup = async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => e.msg),
    });
  }

  const { name, email, password } = req.body;
  const result = await authService.register({ name, email, password });

  logger.success(`New user registered: ${email}`);
  res.status(201).json(createResponse(true, 'Account created successfully', result));
};

/**
 * POST /api/auth/login
 */
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => e.msg),
    });
  }

  const { email, password } = req.body;
  const result = await authService.login({ email, password });

  logger.success(`User logged in: ${email}`);
  res.status(200).json(createResponse(true, 'Login successful', result));
};

/**
 * GET /api/auth/me
 */
const getMe = async (req, res) => {
  const user = await authService.getProfile(req.user.id);
  res.status(200).json(createResponse(true, 'User profile retrieved', user));
};

module.exports = { signup, login, getMe };
