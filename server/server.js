const express = require('express');
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Import route files
const accessoriesRoutes = require('./routes/accessoriesRoutes');
const salesRoutes = require('./routes/salesRoutes');
const tripsRoutes = require('./routes/tripsRoutes');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Base route
app.get('/', async (req, res) => {
  return res.status(200).send('Welcome to the server!');
});

// Database connection
const url = process.env.MONGO_URI;
mongoose
  .connect(url)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

// Use routes
app.use('/api/accessories', accessoriesRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/trips', tripsRoutes);

// Start the server
app.listen(5000, () => { 
  console.log("App is running on port 5000"); 
});
