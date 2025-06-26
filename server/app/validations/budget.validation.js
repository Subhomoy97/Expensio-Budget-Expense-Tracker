// validators/user.validator.js
const Joi = require("joi");

const setBudgetSchema = Joi.object({
  categoryId: Joi.string().required().messages({
    "any.required": "categoryId is required.",
  }),
  amount: Joi.number().positive().precision(2).required().messages({
    "number.base": "Amount must be a number.",
    "number.positive": "Amount must be a positive number.",
    "any.required": "Amount is required.",
  }),

  frequency: Joi.string()
    .valid('monthly', 'weekly', 'daily')
    .required()
    .messages({
      "any.only": "Frequency must be one of daily, weekly, monthly, or yearly.",
      "any.required": "Frequency is required.",
    }),
});

module.exports = {
  setBudgetSchema,
};
