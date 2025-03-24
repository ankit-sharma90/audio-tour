import express from 'express';
import { mockLandmarks } from '../data/mockData.js';

const router = express.Router();

// GET all landmarks
router.get('/', (req, res) => {
  try {
    const { city } = req.query;
    
    if (city) {
      const cityName = city.toLowerCase();
      const filteredLandmarks = mockLandmarks.filter(
        landmark => landmark.city.toLowerCase() === cityName
      );
      return res.json(filteredLandmarks);
    }
    
    res.json(mockLandmarks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET featured landmarks
router.get('/featured', (req, res) => {
  try {
    // For now, just return all landmarks as featured
    // In a real app, you might have a 'featured' flag or select random landmarks
    res.json(mockLandmarks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET landmark by ID
router.get('/:id', (req, res) => {
  try {
    const landmarkId = parseInt(req.params.id);
    const landmark = mockLandmarks.find(l => l.id === landmarkId);
    
    if (!landmark) {
      return res.status(404).json({ message: 'Landmark not found' });
    }
    
    res.json(landmark);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
