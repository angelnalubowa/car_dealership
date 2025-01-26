const express = require('express');
const router = express.Router();
const { getAccessories, addAccessory } = require('../controllers/accessoriesController');

router.route('/').get(getAccessories).post(addAccessory);

module.exports = router;