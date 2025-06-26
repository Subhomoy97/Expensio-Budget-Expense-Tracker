const  transporter  = require("../config/email.config")
const otpVerifyModel=require('../module/user/model/otp.model')

const sendEmailVerificationOTP=async( user)=>{
    if (!user || !user.email) {
        
        throw new Error("Recipient email not found");
      }
    // Generate a random 4-digit number
  const otp = Math.floor(1000 + Math.random() * 9000);

  // create OTP in Database
  const otpRecord=await otpVerifyModel.create({ userId: user._id, otp: otp })
  console.log(otpRecord,"Otp Record")


  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "OTP - Verify your account",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
      <h2 style="color: #4CAF50;">🔐 Email Verification Required</h2>
      <p><strong>Hi ${user.firstName},</strong></p>

      <p>Thank you for signing up with our website. To complete your registration, please verify your email address using the following one-time password (OTP):</p>

      <div style="background-color: #f9f9f9; padding: 15px; text-align: center; border-left: 4px solid #4CAF50; margin: 20px 0;">
        <h1 style="margin: 0; font-size: 32px; color: #333;">${otp}</h1>
        <p style="margin: 5px 0 0;">This OTP is valid for 15 minutes.</p>
      </div>

      <p>If you did not request this OTP, please ignore this email.</p>

      <p style="margin-top: 20px;">Best regards,<br><strong>The Expensio Team</strong></p>

      <hr style="margin-top: 40px;">
      <small style="color: #888;">This is an automated message from Expensio. Do not reply to this email.</small>
    </div>
  `
  })

  return otp
}




module.exports = sendEmailVerificationOTP