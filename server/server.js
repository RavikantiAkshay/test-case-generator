const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middlewares/errorHandler');
const logger = require('./src/utils/logger');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// --- Security Middleware ---
app.use(helmet({ contentSecurityPolicy: false }));
app.use(mongoSanitize());

// --- Middleware ---
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// --- API Routes ---
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/projects', require('./src/routes/projectRoutes'));
app.use('/api/repositories', require('./src/routes/repositoryRoutes'));
app.use('/api/generate', require('./src/routes/generateRoutes'));
app.use('/api/chat', require('./src/routes/chatRoutes'));
app.use('/api/export', require('./src/routes/exportRoutes'));

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// --- Global Error Handler ---
app.use(errorHandler);

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.success(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});

module.exports = app;
