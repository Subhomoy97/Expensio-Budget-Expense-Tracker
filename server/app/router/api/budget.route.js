const router= require('express').Router();
const budgetController= require('../../module/budget/controller/budget.controller');
const authCheck= require('../../middleware/auth.middleware')();

router.post('/set-budget',authCheck.authenticateAPI,budgetController.setBudget)
router.get('/get-budgets',authCheck.authenticateAPI,budgetController.getBudgets)
router.put('/update-budget/:id',authCheck.authenticateAPI,budgetController.updateBudgets)
router.delete('/delete-budget/:id',authCheck.authenticateAPI,budgetController.deleteBudget)
router.get('/get-budget-details',authCheck.authenticateAPI,budgetController.getBudgetDetails)

module.exports=router
