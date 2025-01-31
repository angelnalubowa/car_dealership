const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  model: { 
    type: String, 
    required: true, 
    trim: true },
  price: { 
    type: Number, 
    required: true, 
    min: 0 },
  status: { 
    type: String, 
    enum: ["Available", "Sold", "Reserved"], 
    default: "Available",
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("Car", carSchema);
