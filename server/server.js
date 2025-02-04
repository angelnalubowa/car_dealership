const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
  const port = 5000;
// Middleware
app.use(express.json());
app.use(cors());

// Example Route
app.get('/', (req, res) => {
  res.send('Car Dealership Management System Backend is running');
});

// Hardcoded password for demo purposes (store securely in production)
const PASSWORD = "octopus8Rosette.";

// Endpoint to validate password
app.post('/api/validate-password', (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

  app.use(bodyParser.json());
  
  // In-memory storage (for demonstration purposes)
  const cars = [];
  const carSales = [];
  const trips = [];
  const accessories = [];
  
  // Routes
  
  // Cars Available
  app.post("/cars", (req, res) => {
    const { carID, model, price, availability } = req.body;
    cars.push({ carID, model, price, availability });
    res.status(201).send({ message: "Car added successfully", car: { carID, model, price, availability } });
  });
  
  app.get("/cars", (req, res) => {
    res.status(200).send(cars);
  });
  
  // Car Sales
  app.post("/car-sales", (req, res) => {
    const { name, phone, email, address, driversLicense, carID, model, price, paymentMethod, paymentStatus, salespersonID } = req.body;
    carSales.push({ name, phone, email, address, driversLicense, carID, model, price, paymentMethod, paymentStatus, salespersonID });
    res.status(201).send({ message: "Car sale recorded successfully", sale: { name, phone, email, carID, model, price } });
  });
  
  app.get("/car-sales", (req, res) => {
    res.status(200).send(carSales);
  });
  
  // Trips
  app.post("/trips", (req, res) => {
    const { carID, startDate, finishDate, price, mileage, customerName, driversLicense, paymentStatus, status } = req.body;
    trips.push({ carID, startDate, finishDate, price, mileage, customerName, driversLicense, paymentStatus, status });
    res.status(201).send({ message: "Trip recorded successfully", trip: { carID, customerName, startDate, finishDate } });
  });
  
  app.get("/trips", (req, res) => {
    res.status(200).send(trips);
  });
  
  // Accessory Sales
  app.post("/accessories", (req, res) => {
    const { customerName, price, accessoryName, salespersonID, paymentStatus } = req.body;
    accessories.push({ customerName, price, accessoryName, salespersonID, paymentStatus });
    res.status(201).send({ message: "Accessory sale recorded successfully", sale: { customerName, accessoryName, price } });
  });
  
  app.get("/accessories", (req, res) => {
    res.status(200).send(accessories);
  });
  
  // Middleware
  app.use(cors());
  app.use(bodyParser.json());
  
  // In-memory data storagenpm start
  const data = {
    cars: [],
    carSales: [],
    trips: [],
    accessories: [],
  };
  
  // Helper function to generate unique IDs
  const generateId = () => Math.random().toString(36).substr(2, 9);
  
  // Routes
  
  // Fetch all listings
  app.get("/:category", (req, res) => {
    const { category } = req.params;
    if (!data[category]) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(data[category]);
  });
  
  // Add a new listing
  app.post("/:category", (req, res) => {
    const { category } = req.params;
    if (!data[category]) {
      return res.status(404).json({ message: "Category not found" });
    }
    const newItem = { id: generateId(), ...req.body };
    data[category].push(newItem);
    res.status(201).json(newItem);
  });
  
  // Delete a listing
  app.delete("/:category/:id", (req, res) => {
    const { category, id } = req.params;
    if (!data[category]) {
      return res.status(404).json({ message: "Category not found" });
    }
    const index = data[category].findIndex((item) => item.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Item not found" });
    }
    data[category].splice(index, 1);
    res.status(204).send();
  });
  

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
