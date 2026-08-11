const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const cropAnalysisRoutes = require('./routes/cropAnalysis');
const weatherRoutes = require('./routes/weather');
const soilRoutes = require('./routes/soil');
const irrigationRoutes = require('./routes/irrigation');
const riskScoreRoutes = require('./routes/riskScore');
const copilotRoutes = require('./routes/copilot');
const alertsRoutes = require('./routes/alerts');
const tasksRoutes = require('./routes/tasks');
const historyRoutes = require('./routes/history');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FarmSense AI Backend API Server active', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', profileRoutes);
app.use('/api/crop-analysis', cropAnalysisRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/soil', soilRoutes);
app.use('/api/irrigation', irrigationRoutes);
app.use('/api/risk-score', riskScoreRoutes);
app.use('/api/copilot', copilotRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled API Error:", err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🌱 FarmSense AI Backend running on http://localhost:${PORT}`);
  console.log(`==================================================`);
});
