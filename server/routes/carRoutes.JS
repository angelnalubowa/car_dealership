const express = require("express");
const carController = require("../controllers/carController");

const router = express.Router();

router.post("/", carController.createCar);
router.get("/", carController.getCars);
router.get("/:id", carController.getCarById);
router.put("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;
