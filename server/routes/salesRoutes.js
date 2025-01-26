const express = require('express');
const router = express.Router();
const { getSales, addSale } = require('../controllers/salesController');

router.route('/').get(getSales).post(addSale);

module.exports = router;