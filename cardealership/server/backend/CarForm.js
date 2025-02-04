const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

// Middleware
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

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
