const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'GBP', 'INR', 'AUD'],
    default: 'USD',
  },
  dailyLimit: {
    type: Number,
    default: 0,
  },
  weeklyLimit: {
    type: Number,
    default: 0,
  },
  monthlyLimit: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('UserSettings', userSettingsSchema);
