const mongoose = require('mongoose');

const accessoriesSchema = mongoose.Schema({
  customerName: String,
  price: Number,
  accessoryName: String,
  salespersonID: String,
  paymentDetails: {
    method: String,
    status: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Accessory', accessoriesSchema);