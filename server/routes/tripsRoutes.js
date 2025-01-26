const express = require('express');
const router = express.Router();
const { getTrips, addTrip } = require('../controllers/tripsController');

router.route('/').get(getTrips).post(addTrip);

module.exports = router;