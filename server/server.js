const express = require('express');
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser =require("body-parser");
 
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Base route
app.get('/', async (req, res) => {
  console.log(req);
  return res.status(234).send('welcome');
});

// Database connection
const url = process.env.MONGO_URI;
mongoose
  .connect(url)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use(express.urlencoded({extended:true})); 

// Start the server
app.listen(5000, () => { 
  console.log("app is running on port 5000"); 
});


