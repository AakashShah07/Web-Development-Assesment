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

// Serve uploaded images statically
app.use('/schoolImages', express.static(path.join(__dirname, 'uploads/schoolImages')));

// Routes
app.use('/api/schools', require('./routes/schools'));
app.use('/api/upload', require('./routes/upload'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});