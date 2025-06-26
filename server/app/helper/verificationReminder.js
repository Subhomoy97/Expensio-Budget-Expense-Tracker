const transporter = require("../config/email.config");

const sendEmailVerificationReminder = async (user) => {
  console.log("Sending email verification reminder to:", user.email);
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "⚠️ Please Verify Your Email Address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="color: #f39c12;">⚠️ Action Required: Verify Your Email</h2>
        <p><strong>Hi ${user.firstName},</strong></p>

        <p>We noticed that you haven't verified your email address yet. Please take a moment to verify your email to activate your account and start using all the features of Expensio.</p>


        <p>If you did not create an account with us, you can safely ignore this email.</p>

        <div style="background-color: #fef8e7; padding: 15px; border-left: 4px solid #f39c12; margin: 20px 0;">
          <p style="margin: 0;"><strong>Need Help?</strong> If you're having trouble, please contact our support team.</p>
        </div>

        <p style="margin-top: 20px;">Thanks for choosing Expensio!</p>

        <p style="margin-top: 30px;">Best regards,<br><strong>The Expensio Team</strong></p>

        <hr style="margin-top: 40px;">
        <small style="color: #888;">This is an automated message from Expensio. Please do not reply to this email.</small>
      </div>
    `,
  });
};

module.exports = sendEmailVerificationReminder;
