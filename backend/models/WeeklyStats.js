const mongoose = require('mongoose');

const weeklyStatsSchema = new mongoose.Schema({
  riderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true,
  },
  // Weekly aggregates
  trips: { type: Number, default: 0 },
  hours: { type: Number, default: 0 },        // decimal hours e.g. 18.5
  income: { type: Number, default: 0 },        // ₹ earned this week
  onTimeRate: { type: Number, default: 0 },    // percentage 0-100
  tripsTowardsPremium: { type: Number, default: 0 }, // trips done today toward premium goal

  // Daily breakdown for the mini bar-chart [Mon–Fri]
  dailyTrips: {
    type: [Number],
    default: [0, 0, 0, 0, 0],
  },

  // Last payout (shown in the dashboard banner)
  lastPayoutAmount: { type: Number, default: 0 },
  lastPayoutReason: { type: String, default: '' },

  weekStartDate: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

weeklyStatsSchema.index({ riderId: 1 });

module.exports = mongoose.model('WeeklyStats', weeklyStatsSchema, 'weekly_stats');
