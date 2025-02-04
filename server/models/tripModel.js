const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  carID: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'Car', 
    index: true },
  startDate: { 
    type: Date, 
    required: true },
  endDate: { 
    type: Date, 
    required: true, 
    validate: {
      validator: function (value) {
        return this.startDate ? value > this.startDate : true;
      },
      message: "End date must be after the start date"
    }
  },
  price: { 
    type: Number, 
    required: true, min: 0 },
  mileage: { 
    type: Number, 
    required: true, 
    min: 0 },

  customerDetails: {
    name: { 
      type: String, 
      required: true, 
      trim: true },
    phoneNumber: { 
      type: String, 
      required: true, 
      trim: true, 
      match: [/^\+?\d{10,15}$/, "Invalid phone number format"] 
    },
    driversLicense: { type: String, required: true, trim: true }
  },

  paymentDetails: {
    method: { 
      type: String, 
      enum: ["Cash", "Credit Card", "Mobile Money", "Bank Transfer"], 
      required: true 
    },
    status: { 
      type: String, 
      enum: ["Pending", "Completed", "Failed"], 
      default: "Pending" 
    }
  },

  status: { 
    type: String, 
    enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"], 
    default: "Upcoming",
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
