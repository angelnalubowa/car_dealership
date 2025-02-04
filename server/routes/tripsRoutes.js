const express = require('express');
const router = express.Router();
const { 
  getTrips, 
  getTripById, 
  addTrip, 
  updateTrip, 
  deleteTrip 
} = require('../controllers/tripsController');

// GET all trips & POST new trip
router.route('/')
  .get(getTrips)
  .post(addTrip);

// GET, UPDATE, and DELETE a single trip by ID
router.route('/:id')
  .get(getTripById)
  .put(updateTrip)
  .delete(deleteTrip);

module.exports = router;
