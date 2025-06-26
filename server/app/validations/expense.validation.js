const Joi = require('joi');

const addExpenseSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      'number.base': 'Amount must be a number.',
      'number.positive': 'Amount must be a positive number.',
      'any.required': 'Amount is required.'
    }),

  categoryId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'categoryId must be a valid MongoDB ObjectId.',
      'any.required': 'categoryId is required.'
    }),

  note: Joi.string()
    .max(255)
    .allow('', null)
    .messages({
      'string.max': 'Note must be at most 255 characters.'
    }),

  date: Joi.date()
    .iso()
    .messages({
      'date.base': 'Date must be a valid date.',
      'date.format': 'Date must be in ISO format.'
    })
});

module.exports={addExpenseSchema}