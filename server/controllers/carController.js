const Car = require('../models/carModel');

// Get all cars
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error: error.message });
  }
};

// Get a single car by ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car', error: error.message });
  }
};

// Add a new car
const addCar = async (req, res) => {
  try {
    const { Carid, price, model, status } = req.body;

    if (!Carid || !price || !model || !status ) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newCar = new Car({Carid, model, price, status });
    const savedCar = await newCar.save();

    res.status(201).json(savedCar);
  } catch (error) {
    res.status(500).json({ message: 'Error adding car', error: error.message });
  }
};

// Update an car
const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: 'Error updating car', error: error.message });
  }
};

// Delete an car
const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);

    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting car', error: error.message });
  }
};

module.exports = { getCar, getCarById, addCar, updateCar, deleteCar };
