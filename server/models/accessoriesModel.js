const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    accessoryName: { type: String, required: true },
    price: { type: Number, required: true },
    salespersonId: { type: String, required: true },
    paymentMethod: { type: String, enum: ["Cash", "Credit Card", "Mobile Money", "Bank Transfer"], required: true,},
    paymentStatus: { type: String, enum: ["paid", "pending"] },
  }
);

module.exports = mongoose.model("Accessory", accessorySchema);
