const mongoose = require('mongoose');

const activePlanSchema = new mongoose.Schema({
  riderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  planType: {
    type: String,
    required: true,
    enum: ['safe', 'protected', 'shield'],
  },
  // Dynamic — set by risk model, not hardcoded
  premiumAmount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Index for quick active plan lookup per rider
activePlanSchema.index({ riderId: 1, isActive: 1 });

module.exports = mongoose.model('ActivePlan', activePlanSchema, 'active_plans');
