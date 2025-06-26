const Expense = require('../model/expense.model');
const mongoose = require('mongoose');

class ExpenseRepository {
  async createExpense(data) {
    const expense = new Expense(data);
    return await expense.save();
  }

  async calculateTotalExpense(userId, categoryId, startDate, endDate) {
    const [{ total = 0 } = {}] = await Expense.aggregate([
      {
        $match: {
          userId,
          categoryId: new mongoose.Types.ObjectId(categoryId),
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);
    return total;
  }

  async getFilteredExpenses(filters) {
  return await Expense.find(filters)
    .populate('categoryId')
    .sort({ date: -1 }); 
}


  async updateExpenseById(id, userId, data) {
    return await Expense.findOneAndUpdate({ _id: id, userId }, data, { new: true });
  }

  async softDeleteById(id, userId) {
    return await Expense.findOneAndUpdate({ _id: id, userId }, { isDeleted: true }, { new: true });
  }
  async restoreById(id, userId) {
    return await Expense.findOneAndUpdate({ _id: id, userId, isDeleted: true }, { isDeleted: false }, { new: true });
  }
}

module.exports = new ExpenseRepository();
