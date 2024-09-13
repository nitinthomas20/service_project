// routes/events.js

const express = require('express');
const router = express.Router();
const Event = require('../models/event');

// Sample data
const sampleEvents = [
  {
    name: "Music Festival",
    description: "A grand musical event.",
    date: new Date('2024-12-01T18:30:00.000Z'),
    location: "Sydney Opera House"
  },
  {
    name: "Food Expo",
    description: "Explore delicious cuisines.",
    date: new Date('2024-11-15T10:00:00.000Z'),
    location: "Melbourne Convention Center"
  }
];

// Endpoint to get all events
router.get('/', async (req, res) => {
  try {
    // Check if data exists in the database
    const events = await Event.find();
    
    if (events.length === 0) {
      // If no events found, use sample data
      await Event.insertMany(sampleEvents);
      res.json(sampleEvents);
    } else {
      res.json(events);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to get a single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
