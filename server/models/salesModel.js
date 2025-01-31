const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  customerName: { 
    type: String, 
    required: true, 
    trim: true },
  phoneNumber: { 
    type: String, 
    required: true, 
    trim: true, 
    match: [/^\+?\d{10,15}$/, "Invalid phone number format"] 
  },
  email: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"] 
  },
  address: { 
    type: String, 
    required: true, 
    trim: true },
  driversLicense: { 
    type: String, 
    required: true, 
    trim: true },
  carID: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'Car', 
    index: true },
  model: { 
    type: String, 
    required: true, 
    trim: true },
  price: { 
    type: Number, 
    required: true, 
    min: 0 },
  paymentMethod: { 
    type: String, 
    enum: ["Cash", "Credit Card", "Mobile Money", "Bank Transfer"], 
    required: true 
  },
  paymentStatus: { 
    type: String, 
    enum: ["Pending", "Completed", "Failed"], 
    default: "Pending" 
  },
  salespersonID: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'Salesperson', 
    index: true }
}, { timestamps: true });

module.exports = mongoose.model('Sale', salesSchema);
