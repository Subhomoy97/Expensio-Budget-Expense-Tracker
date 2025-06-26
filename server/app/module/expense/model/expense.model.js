const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  note: { type: String },
  date: { type: Date, required: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
