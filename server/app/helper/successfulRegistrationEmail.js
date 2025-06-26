
const transporter = require("../config/email.config");


const sendWelcomeEmail = async (user) => {
    console.log("Sending welcome email to:", user.email); 
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "🎉 Registration Successful",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #4CAF50;">🎉 Welcome to Expensio!</h2>
        <p><strong>Hi ${user.firstName},</strong></p>

        <p>Your email has been successfully verified and your account is now fully active.</p>
        <p>You can now log in and start using our services right away.</p>

        <div style="background-color: #f1f1f1; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0;">
          <p style="margin: 0;"><strong>Need Help?</strong> Visit our support page or contact us anytime.</p>
        </div>

        <p style="margin-top: 20px;">Thank you for joining us. We're excited to have you on board!</p>

        <p style="margin-top: 30px;">Best regards,<br><strong>The Expensio Team</strong></p>

        <hr style="margin-top: 40px;">
        <small style="color: #888;">This is an automated message from Expensio. Please do not reply to this email.</small>
      </div>
    `,
  });
};

module.exports = sendWelcomeEmail;
