const express = require("express");
const Accessory = require("../models/accessoriesModel");

const router = express.Router();

// Create a new accessory
router.post("/", async (req, res) => {
  try {
    const accessory = new Accessory(req.body);
    await accessory.save();
    res.status(201).json(accessory);
  } catch (error) {
    console.error("Error creating accessory:", error);
    res.status(500).json({ error: "An error occurred while creating the accessory" });
  }
});

// Get all accessories
router.get("/", async (req, res) => {
  try {
    const accessories = await Accessory.find();
    res.json(accessories);
  } catch (error) {
    console.error("Error fetching accessories:", error);
    res.status(500).json({ error: "An error occurred while fetching accessories" });
  }
});

// Update an accessory
router.put("/:id", async (req, res) => {
  try {
    const accessory = await Accessory.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!accessory) return res.status(404).json({ message: "Accessory not found" });
    res.json(accessory);
  } catch (error) {
    console.error("Error updating accessory:", error);
    res.status(500).json({ error: "An error occurred while updating the accessory" });
  }
});

// Delete an accessory
router.delete("/:id", async (req, res) => {
  try {
    const accessory = await Accessory.findByIdAndDelete(req.params.id);
    if (!accessory) return res.status(404).json({ message: "Accessory not found" });
    res.json({ message: "Accessory deleted successfully" });
  } catch (error) {
    console.error("Error deleting accessory:", error);
    res.status(500).json({ error: "An error occurred while deleting the accessory" });
  }
});

module.exports = router;
