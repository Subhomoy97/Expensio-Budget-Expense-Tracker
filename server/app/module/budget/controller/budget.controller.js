const BudgetRepository = require("../repositories/budget.repositories");
const {setBudgetSchema}=require('../../../validations/budget.validation')

class BudgetController {
  async setBudget(req, res) {
    try {
        const { error, value } = setBudgetSchema.validate(req.body, { abortEarly: false });
            if (error) {
                const messages = error.details.map(detail => detail.message);
                return res.status(400).send({
                    status: 400,
                    data: {},
                    message: messages
                });
            }
      const { categoryId, amount, frequency } = value;

      const validFrequencies = ['monthly', 'weekly', 'daily'];
      if (!validFrequencies.includes(frequency)) {
        return res.status(400).json({ message: 'Invalid frequency' });
      }

      const budget = await BudgetRepository.setBudget(req.user._id, categoryId, amount, frequency);
      res.status(200).json({ message: 'Budget saved', budget });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getBudgets(req, res) {
    try {
      const budgets = await BudgetRepository.getBudgets(req.user._id);
      const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
      res.status(200).json({ message: 'Budgets fetched successfully', budgets, totalBudget });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateBudgets(req, res) {
    try {
      const updated = await BudgetRepository.updateBudget(req.params.id, req.user._id, req.body);
      if (!updated) return res.status(404).json({ message: 'Budget not found' });
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteBudget(req, res) {
    try {
      const deleted = await BudgetRepository.deleteBudget(req.params.id, req.user._id);
      if (!deleted) return res.status(404).json({ message: 'Budget not found' });
      res.status(200).json({ message: 'Budget deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getBudgetDetails(req, res) {
    try {
      const budgets = await BudgetRepository.getBudgetDetails(req.user._id);
      res.status(200).json({ budgetDetails: budgets });
    } catch (err) {
      console.error("Budget detail error:", err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new BudgetController();
