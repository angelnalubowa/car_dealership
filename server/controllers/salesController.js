const Sale = require('../models/salesModel'); // Import the Sale model

// Get all sales
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales', error: error.message });
  }
};

// Get a single sale by ID
const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sale', error: error.message });
  }
};

// Add a new sale
const addSale = async (req, res) => {
  try {
    const { 
      customerName, phoneNumber, email, address, driversLicense, 
      carID, model, price, paymentMethod, paymentStatus, salespersonID 
    } = req.body;

    // Validate required fields
    if (!customerName || !phoneNumber || !email || !address || !driversLicense || 
        !carID || !model || !price || !paymentMethod || !salespersonID) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newSale = new Sale({ 
      customerName, phoneNumber, email, address, driversLicense, 
      carID, model, price, paymentMethod, paymentStatus, salespersonID 
    });

    const savedSale = await newSale.save();

    res.status(201).json(savedSale);
  } catch (error) {
    res.status(500).json({ message: 'Error adding sale', error: error.message });
  }
};

// Update an existing sale
const updateSale = async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(500).json({ message: 'Error updating sale', error: error.message });
  }
};

// Delete a sale
const deleteSale = async (req, res) => {
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id);

    if (!deletedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sale', error: error.message });
  }
};

module.exports = { getSales, getSaleById, addSale, updateSale, deleteSale };
