const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();

// Import route files
const accessoriesRoutes = require('./controllers/accessoriesController');
const salesRoutes = require('./controllers/salesController');
const tripsRoutes = require('./controllers/tripsController');
const carRoutes = require('./controllers/carController');

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


  app.use(bodyParser.json());
  

// Use routes
app.use('/accessories', accessoriesRoutes);
app.use('/carSales', salesRoutes);
app.use('/trips', tripsRoutes);
app.use('/cars', carRoutes);

// Start the server
app.listen(5000, () => { 
  console.log("App is running on port 5000"); 
});
