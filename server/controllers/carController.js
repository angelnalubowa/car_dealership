const express = require("express");
const mongoose = require("mongoose");
const Car = require("../models/carModel");

const router = express.Router();

// Create a new car
router.post("/", async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ error: "An error occurred while creating the car" });
  }
});

// Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "An error occurred while fetching cars" });
  }
});

// Update a car
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid car ID" });
    }

    const car = await Car.findByIdAndUpdate(id, req.body, { new: true });
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ error: "An error occurred while updating the car" });
  }
});

// Delete a car
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid car ID" });
//     }

//     const car = await Car.findByIdAndDelete(id);
//     if (!car) return res.status(404).json({ message: "Car not found" });
//     res.json({ message: "Car deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting car:", error);
//     res.status(500).json({ error: "An error occurred while deleting the car" });
//   }
// });

// new version
// DELETE: Remove a document by ID
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const result = await collection.deleteOne({ _id: ObjectId(id) });
      if (result.deletedCount === 1) {
        res.status(200).send('car deleted');
      } else {
        res.status(404).send('car not found');
      }
    } catch (err) {
      res.status(500).send('Error deleting car');
    }
  });

module.exports = router;