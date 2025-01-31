const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
  customerName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  accessoryName: { 
    type: String, 
    required: true, 
    trim: true },
  price: { 
    type: Number, 
    required: true, 
    min: 0 },
  salespersonID: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, ref: 'Salesperson', 
    index: true },
  paymentDetails: {
    method: { 
      type: String, 
      enum: ['Cash', 'Credit Card', 'Mobile Money', 'Bank Transfer'], 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['Pending', 'Completed', 'Failed'], 
      default: 'Pending' 
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Accessory', accessoriesSchema);
