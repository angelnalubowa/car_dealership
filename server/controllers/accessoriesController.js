const Accessory = require('../models/accessoriesModel'); // Import the Accessory model

// Get all accessories
const getAccessories = async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.status(200).json(accessories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accessories', error: error.message });
  }
};

// Add a new accessory
const addAccessory = async (req, res) => {
  try {
    const { customerName, price, accessoryName, salespersonID, paymentDetails } = req.body;

    // Validate required fields
    if (!customerName || !price || !accessoryName || !salespersonID || !paymentDetails?.method) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Create new accessory
    const newAccessory = new Accessory({ customerName, price, accessoryName, salespersonID, paymentDetails });

    // Save to database
    const savedAccessory = await newAccessory.save();

    res.status(201).json(savedAccessory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding accessory', error: error.message });
  }
};

module.exports = { getAccessories, addAccessory };
