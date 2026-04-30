const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get all crypto assets' });
});

router.get('/gainers', (req, res) => {
  res.status(200).json({ message: 'Get top crypto gainers' });
});

router.get('/new', (req, res) => {
  res.status(200).json({ message: 'Get newly listed crypto assets' });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create a new crypto asset', data: req.body });
});

module.exports = router;
