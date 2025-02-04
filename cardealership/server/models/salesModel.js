const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
  customerName: String,
  phoneNumber: String,
  email: String,
  address: String,
  driversLicense: String,
  carID: String,
  model: String,
  price: Number,
  paymentMethod: String,
  paymentStatus: String,
  salespersonID: String,
}, { timestamps: true });

module.exports = mongoose.model('Sale', salesSchema);