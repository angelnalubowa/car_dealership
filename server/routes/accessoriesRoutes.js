const express = require('express');
const router = express.Router();
const { 
  getAccessories, 
  getAccessoryById, 
  addAccessory, 
  updateAccessory, 
  deleteAccessory 
} = require('../controllers/accessoriesController');

// GET all accessories & POST new accessory
router.route('/')
  .get(getAccessories)
  .post(addAccessory);

// GET single accessory, UPDATE, and DELETE
router.route('/:id')
  .get(getAccessoryById)
  .put(updateAccessory)
  .delete(deleteAccessory);

module.exports = router;
