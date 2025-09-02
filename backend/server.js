
console.log("🚀 server.js loaded, starting Express app...");

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log each request (for debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Serve uploaded images statically
app.use('/schoolImages', express.static(path.join(__dirname, 'uploads/schoolImages')));

// Routes
try {
  app.use('/api/schools', require('./routes/schools'));
  app.use('/api/upload', require('./routes/upload'));
} catch (err) {
  console.error("❌ Error loading routes:", err);
}

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Express error:", err.stack);
  res.status(500).json({ error: 'Something broke!', details: err.message });
});

// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
  console.log(`✅ Server running on port ${PORT}`);
});
