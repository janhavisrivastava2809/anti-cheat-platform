// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

// Route Imports
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const portalRoutes = require('./routes/portalRoutes');
const proctorRoutes = require('./routes/proctorRoutes'); // Anti-cheat & proctoring route

const app = express();

// Connect to Database
connectDB();

// Core Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Frontend URL (Vite default: 5173)
  credentials: true,
}));
app.use(express.json({ limit: '10mb' })); // Higher limit for proctoring payloads/snapshots
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'active', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/portal', portalRoutes);
app.use('/api/proctor', proctorRoutes); // Anti-cheat logging endpoint

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found at ${req.originalUrl}`,
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in \({process.env.NODE_ENV || 'development'} mode on port\){PORT}`);
});

// Handle unhandled promise rejections (e.g. DB disconnects)
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});