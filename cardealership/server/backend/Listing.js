const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data storage
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
