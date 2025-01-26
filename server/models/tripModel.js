const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
  carID: String,
  startDate: Date,
  endDate: Date,
  price: Number,
  mileage: Number,
  customerDetails: {
    name: String,
    phoneNumber: String,
    driversLicense: String,
  },
  paymentDetails: {
    method: String,
    status: String,
  },
  status: String,
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);