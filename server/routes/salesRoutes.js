const express = require('express');
const router = express.Router();
const { 
  getSales, 
  getSaleById, 
  addSale, 
  updateSale, 
  deleteSale 
} = require('../controllers/salesController');

// GET all sales & POST new sale
router.route('/')
  .get(getSales)
  .post(addSale);

// GET, UPDATE, and DELETE a single sale by ID
router.route('/:id')
  .get(getSaleById)
  .put(updateSale)
  .delete(deleteSale);

module.exports = router;
