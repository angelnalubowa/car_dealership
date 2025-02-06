const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    carId: { type: String, required: true },
    startDate: { 
      type: Date, 
      required: true,
      set: (value) => formatDate(value) 
    },
    finishDate: { 
      type: Date, 
      required: true,
      set: (value) => formatDate(value) 
    },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },
    customerName: { type: String, required: true},
    license: { type: String, required: true},
    paymentStatus: { type: String, enum: ["paid", "pending"], default: "pending" },
    tripStatus: { type: String, enum: ["ongoing", "finished"], default: "ongoing" },
  },
  { timestamps: true }
);

// Function to format date
const formatDate = (value) => {
  if (typeof value === "string" && value.includes("-")) {
    const [day, month, year] = value.split("-");
    return new Date(`${year}-${month}-${day}`); // Convert "27-01-2025" → "2025-01-27"
  }
  return value;
};

module.exports = mongoose.model("Trip", tripSchema);
