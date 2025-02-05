const express = require("express");
const CarSales = require("../models/salesModel");

const router = express.Router();

// Create a new car sale
router.post("/", async (req, res) => {
  try {
    const sale = new CarSales(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    console.error("Error creating car sale:", error);
    res.status(500).json({ error: "An error occurred while creating the car sale" });
  }
});

// Get all car sales
router.get("/", async (req, res) => {
  try {
    const sales = await CarSales.find();
    res.json(sales);
  } catch (error) {
    console.error("Error fetching car sales:", error);
    res.status(500).json({ error: "An error occurred while fetching car sales" });
  }
});

// Update a car sale
router.put("/:id", async (req, res) => {
  try {
    const sale = await CarSales.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!sale) return res.status(404).json({ message: "Car sale not found" });
    res.json(sale);
  } catch (error) {
    console.error("Error updating car sale:", error);
    res.status(500).json({ error: "An error occurred while updating the car sale" });
  }
});

// Delete a car sale
router.delete("/:id", async (req, res) => {
  try {
    const sale = await CarSales.findByIdAndDelete(req.params.id);
    if (!sale) return res.status(404).json({ message: "Car sale not found" });
    res.json({ message: "Car sale deleted successfully" });
  } catch (error) {
    console.error("Error deleting car sale:", error);
    res.status(500).json({ error: "An error occurred while deleting the car sale" });
  }
});

module.exports = router;
