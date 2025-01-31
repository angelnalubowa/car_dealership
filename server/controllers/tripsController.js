const Trip = require('../models/tripModel'); // Import the Trip model

// Get all trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error: error.message });
  }
};

// Add a new trip
const addTrip = async (req, res) => {
  try {
    const { 
      carID, startDate, endDate, price, mileage, 
      customerDetails, paymentDetails, status 
    } = req.body;

    // Validate required fields
    if (!carID || !startDate || !endDate || !price || !mileage || !customerDetails?.name || 
        !customerDetails?.phoneNumber || !customerDetails?.driversLicense || 
        !paymentDetails?.method || !status) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Ensure endDate is after startDate
    if (new Date(endDate) <= new Date(startDate)) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    // Create new trip
    const newTrip = new Trip({ 
      carID, startDate, endDate, price, mileage, 
      customerDetails, paymentDetails, status 
    });

    // Save to database
    const savedTrip = await newTrip.save();

    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error adding trip', error: error.message });
  }
};

module.exports = { getTrips, addTrip };
