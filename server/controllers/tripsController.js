const Trip = require('../models/Trip'); // Import the Trip model

// Get all trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error: error.message });
  }
};

// Get a single trip by ID
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip', error: error.message });
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

    const newTrip = new Trip({ 
      carID, startDate, endDate, price, mileage, 
      customerDetails, paymentDetails, status 
    });

    const savedTrip = await newTrip.save();

    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error adding trip', error: error.message });
  }
};

// Update an existing trip
const updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error updating trip', error: error.message });
  }
};

// Delete a trip
const deleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);

    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting trip', error: error.message });
  }
};

module.exports = { getTrips, getTripById, addTrip, updateTrip, deleteTrip };
