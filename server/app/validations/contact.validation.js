
const Joi = require("joi");

const contactSchema = Joi.object({
   name: Joi.string().trim().required().messages({
       "string.base": " Name must be text",
       "any.required": "Name is required",
     }),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),
      message: Joi.string().required().messages({
       "any.required": "Message is required",
     }),
      subject: Joi.string().optional(),

});

module.exports = {
  contactSchema
};
