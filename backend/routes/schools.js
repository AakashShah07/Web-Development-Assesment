const express = require('express');
const router = express.Router();
const db = require('../database/config');

// Get all schools
router.get('/', (req, res) => {
  const query = 'SELECT id, name, address, city, image FROM schools';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching schools:', err);
      return res.status(500).json({ error: 'Failed to fetch schools' });
    }
    res.json(results);
  });
});

// Add a new school
router.post('/', (req, res) => {
  const { name, address, city, state, contact, image, email_id } = req.body;
  
  const query = `
    INSERT INTO schools (name, address, city, state, contact, image, email_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.query(query, [name, address, city, state, contact, image, email_id], (err, results) => {
    if (err) {
      console.error('Error adding school:', err);
      return res.status(500).json({ error: 'Failed to add school' });
    }
    res.status(201).json({ message: 'School added successfully', id: results.insertId });
  });
});

module.exports = router;