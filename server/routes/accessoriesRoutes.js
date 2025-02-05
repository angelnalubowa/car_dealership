const express = require("express");
const router = express.Router();
const accessoryController = require("../controllers/accessoriesController");

// Define routes
router.post("/", accessoryController.createAccessory); // Create an accessory
router.get("/", accessoryController.getAccessories); // Get all accessories
router.get("/:id", accessoryController.getAccessoryById); // Get one accessory by ID
router.put("/:id", accessoryController.updateAccessory); // Update an accessory
router.delete("/:id", accessoryController.deleteAccessory); // Delete an accessory

module.exports = router;
