const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    trim: true,
  },
  panId: {
    type: String,
    required: [true, 'PAN ID is required'],
    unique: true,
    trim: true,
    uppercase: true,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN ID format (e.g. ABCDE1234F)'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  platform: {
    type: String,
    required: [true, 'Platform is required'],
    enum: ['Blinkit', 'Swiggy', 'Zomato', 'Zepto', 'Other'],
  },
  vehicle: {
    type: String,
    required: [true, 'Vehicle type is required'],
    enum: ['Bike', 'Scooter', 'Cycle', 'Other'],
  },
  upi: {
    type: String,
    required: [true, 'UPI ID is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

// Use existing DB: user_data, collection: user
module.exports = mongoose.model('user', riderSchema, 'user');
