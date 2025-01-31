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

    // Create new sale
    const newSale = new Sale({ 
      customerName, phoneNumber, email, address, driversLicense, 
      carID, model, price, paymentMethod, paymentStatus, salespersonID 
    });

    // Save to database
    const savedSale = await newSale.save();

    res.status(201).json(savedSale);
  } catch (error) {
    res.status(500).json({ message: 'Error adding sale', error: error.message });
  }
};

module.exports = { getSales, addSale };
