const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    carId: { type: String, required: true},
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["Available", "Sold", "Reserved"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
