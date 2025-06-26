const Joi = require("joi");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
class JoiValidator {
  registerValidation = Joi.object({
    firstName: Joi.string().required().messages({
      "string.base": "First name must be text",
      "any.required": "First name is required",
    }),

    lastName: Joi.string().required().messages({
      "string.base": "Last name must be text",
      "any.required": "Last name is required",
    }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.email': 'Email must be a valid email address.',
            'any.required': 'Email is required.'
        }), 
      password: Joi.string()
        .pattern(passwordRegex)
        .message('Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.')
        .required()
        .messages({
            'any.required': 'Password is required.'
        }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords must match",
        "any.required": "Confirm password is required",
      }),
  });

  loginValidation = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
    }),
  });

  verifyOtpValidation = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    otp: Joi.string().required().messages({
      "any.required": "OTP is required",
    }),
  });
  resendOtpValidation = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
  });
  forgetPasswordValidation = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
  });
  resetPasswordValidation = Joi.object({
    password: Joi.string().min(8).required().messages({
      "string.min": "Password must be at least 8 characters",
      "any.required": "Password is required",
    }),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords must match",
        "any.required": "Confirm password is required",
      }),
  });

  updatePasswordValidation = Joi.object({
    currentPassword: Joi.string().required().messages({
      "any.required": "current password is required",
    }),
    newPassword: Joi.string().min(8).required().messages({
      "string.min": "New password must be at least 8 characters",
      "any.required": "New password is required",
    }),
    confirmNewPassword: Joi.string()
    .required()
      .valid(Joi.ref("newPassword"))
      
      .messages({
        'any.only': 'Confirm password must match new password',
        'any.required': 'Confirm new password is required',
      }),
  });
}
module.exports = new JoiValidator();
