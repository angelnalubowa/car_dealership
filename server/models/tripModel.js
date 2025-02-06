const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    carId: { type: String, required: true },
    startDate: { 
      type: Date, 
      required: true,
      set: (value) => parseDate(value) 
    },
    finishDate: { 
      type: Date, 
      required: true,
      set: (value) => parseDate(value) 
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

// Function to properly parse dd-mm-yyyy format into a Date object
const parseDate = (value) => {
  if (typeof value === "string" && value.includes("-")) {
    const [day, month, year] = value.split("-").map(Number);
    return new Date(year, month - 1, day); // Month is zero-based in JS Date
  }
  return value;
};

module.exports = mongoose.model("Trip", tripSchema);
