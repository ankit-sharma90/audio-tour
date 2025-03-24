import express from 'express';
import { mockCities } from '../data/mockData.js';

const router = express.Router();

// GET all cities
router.get('/', (req, res) => {
  try {
    res.json(mockCities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET city by name
router.get('/:name', (req, res) => {
  try {
    const cityName = req.params.name.toLowerCase();
    const city = mockCities.find(c => c.name.toLowerCase() === cityName);
    
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
