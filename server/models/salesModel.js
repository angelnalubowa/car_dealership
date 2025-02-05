const mongoose = require("mongoose");

const carSalesSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    license: { type: String, required: true },
    carId: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["Cash", "Credit Card", "Mobile Money", "Bank Transfer"], required: true },
    paymentStatus: { type: String, enum: ["paid", "pending"] },
    salespersonId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarSales", carSalesSchema);
