const Accessory = require('../models/accessoriesModel');

// Get all accessories
const getAccessories = async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.status(200).json(accessories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accessories', error: error.message });
  }
};

// Get a single accessory by ID
const getAccessoryById = async (req, res) => {
  try {
    const accessory = await Accessory.findById(req.params.id);
    if (!accessory) {
      return res.status(404).json({ message: 'Accessory not found' });
    }
    res.status(200).json(accessory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accessory', error: error.message });
  }
};

// Add a new accessory
const addAccessory = async (req, res) => {
  try {
    const { customerName, price, accessoryName, salespersonID, paymentDetails } = req.body;

    if (!customerName || !price || !accessoryName || !salespersonID || !paymentDetails?.method) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newAccessory = new Accessory({ customerName, price, accessoryName, salespersonID, paymentDetails });
    const savedAccessory = await newAccessory.save();

    res.status(201).json(savedAccessory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding accessory', error: error.message });
  }
};

// Update an accessory
const updateAccessory = async (req, res) => {
  try {
    const updatedAccessory = await Accessory.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedAccessory) {
      return res.status(404).json({ message: 'Accessory not found' });
    }

    res.status(200).json(updatedAccessory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating accessory', error: error.message });
  }
};

// Delete an accessory
const deleteAccessory = async (req, res) => {
  try {
    const deletedAccessory = await Accessory.findByIdAndDelete(req.params.id);

    if (!deletedAccessory) {
      return res.status(404).json({ message: 'Accessory not found' });
    }

    res.status(200).json({ message: 'Accessory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting accessory', error: error.message });
  }
};

module.exports = { getAccessories, getAccessoryById, addAccessory, updateAccessory, deleteAccessory };
