const budgetModel = require('../../budget/model/budget.model');
const expenseRepository = require('../repositories/expense.repositories');
const{addExpenseSchema}=require('../../../validations/expense.validation')

class ExpenseController {
  async addExpense(req, res) {
    try {
        const { error, value } = addExpenseSchema.validate(req.body, { abortEarly: false });
            if (error) {
                const messages = error.details.map(detail => detail.message);
                return res.status(400).send({
                    status: 400,
                    data: {},
                    message: messages
                });
            }
      const { amount, categoryId, note, date } = value;
      const parsedAmount = Number(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
      }

      const budget = await budgetModel.findOne({ userId: req.user._id, categoryId });
      const frequency = budget?.frequency || 'monthly';
      const limit = budget?.amount || 0;

      const now = new Date();
      let startDate, endDate;

      if (frequency === 'weekly') {
        const day = now.getUTCDay();
        const diff = now.getUTCDate() - day + (day === 0 ? -6 : 1);
        startDate = new Date(now);
        startDate.setUTCDate(diff);
        startDate.setUTCHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setUTCDate(startDate.getUTCDate() + 6);
        endDate.setUTCHours(23, 59, 59, 999);
      } else if (frequency === 'monthly') {
        startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
        endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999));
      } else {
        startDate = new Date(now.setUTCHours(0, 0, 0, 0));
        endDate = new Date(now.setUTCHours(23, 59, 59, 999));
      }

      const total = await expenseRepository.calculateTotalExpense(
        req.user._id,
        categoryId,
        startDate,
        endDate
      );

      const willExceed = total + parsedAmount > limit;

      const expense = await expenseRepository.createExpense({
        userId: req.user._id,
        amount: parsedAmount,
        categoryId,
        note,
        date: new Date(date),
      });

      res.status(201).json({
        message: 'Expense added',
        expense,
        budgetExceeded: willExceed,
        currentTotal: total + parsedAmount,
        budgetLimit: limit,
        frequency,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  async getExpenses(req, res) {
    try {
      const { start, end, category, min, max } = req.query;
      const filters = { userId: req.user._id };

      if (start && end) filters.date = { $gte: new Date(start), $lte: new Date(end) };
      if (category) filters.categoryId = category;
      if (min || max) {
        filters.amount = {
          ...(min && { $gte: Number(min) }),
          ...(max && { $lte: Number(max) }),
        };
      }

      const expenses = await expenseRepository.getFilteredExpenses(filters);
      const total = expenses.reduce((acc, item) => acc + item.amount, 0);

      res.status(200).json({ expenses, totalExpense: total });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateExpense(req, res) {
    try {
      const updated = await expenseRepository.updateExpenseById(
        req.params.id,
        req.user._id,
        req.body
      );

      if (!updated) return res.status(404).json({ message: 'Expense not found' });

      res.status(200).json({ message: 'Expense updated', expense: updated });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteExpense(req, res) {
    try {
      const deleted = await expenseRepository.softDeleteById(req.params.id, req.user._id);

      if (!deleted) return res.status(404).json({ message: 'Expense not found' });
      
      res.status(200).json({ message: 'Expense deleted', expense: deleted });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async restoreExpense(req, res) {
    try {
      const restored = await expenseRepository.restoreById(req.params.id, req.user._id);
      if (!restored) return res.status(404).json({ message: 'Expense not found' });
      res.status(200).json({ message: 'Expense restored', expense: restored });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new ExpenseController();
