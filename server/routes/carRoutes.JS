const express = require('express');
const router = express.Router();
const { 
  getCars, 
  getCarById, 
  addCar, 
  updateCar, 
  deleteCar 
} = require('../controllers/carController');

// GET all cars & POST new car
router.route('/')
  .get(getCars)
  .post(addCar);

// GET single car, UPDATE, and DELETE
router.route('/:id')
  .get(getCarById)
  .put(updateCar)
  .delete(deleteCar);

module.exports = router;
