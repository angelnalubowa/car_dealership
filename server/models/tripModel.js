const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    carId: { type: String, required: true },
    startDate: { type: Date, required: true },
    finishDate: { type: Date, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },
    customerName: { type: String, required: true},
    license: { type: String, required: true},
    paymentStatus: { type: String, enum: ["paid", "pending"], default: "pending" },
    tripStatus: { type: String, enum: ["ongoing", "finished"], default: "ongoing" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
