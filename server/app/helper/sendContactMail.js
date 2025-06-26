const transporter = require("../config/email.config");

const sendContactMail = async (name, email, subject, message) => {
  try {
    // 1. Notify Admin
    const adminMailOptions = {
      from: `"${name}" <${email}>`,
      to: `"Expensio Website" <${process.env.EMAIL_USER}>`,
      subject: subject || 'New Contact Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #2196F3;">📩 New Contact Request Received</h2>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>

          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          </div>

          <div style="background-color: #f1f1f1; padding: 15px; border-left: 4px solid #2196F3; margin: 20px 0;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 0;">${message}</p>
          </div>

          <p style="margin-top: 20px;">Please respond to this inquiry if necessary.</p>

          <hr style="margin-top: 40px;">
          <small style="color: #888;">This message was generated from the Expensio Contact Form.</small>
        </div>
      `,
    };
    await transporter.sendMail(adminMailOptions);

    // 2. Confirmation Email to User
    const confirmationMailOptions = {
      from: `"Expensio Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We've received your message`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #4CAF50;">Thank you for contacting Expensio!</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>We’ve received your message and our team will review it shortly.</p>

          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0;">
            <p style="margin: 0;"><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <p style="margin: 0;"><strong>Your Message:</strong></p>
            <p style="margin: 0;">${message}</p>
          </div>

          <p>If needed, we’ll reach out to you at <strong>${email}</strong>.</p>
          <p>Thanks again for reaching out.</p>

          <p style="margin-top: 30px;">Warm regards,<br><strong>The Expensio Team</strong></p>
          <hr style="margin-top: 40px;">
          <small style="color: #888;">This is an automated message. Please do not reply to this email.</small>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    return { success: true };
  } catch (error) {
    console.error('Error sending emails:', error);
    return { success: false, error };
  }
};

const sendAdminReplyMail = async (name, email, subject, replyText) => {
  try {
    const mailOptions = {
      from: `"Expensio Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Re: ${subject || 'your message to Expensio'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #2196F3;">📨 Response from Expensio Support</h2>
          <p>Hi <strong>${name}</strong>,</p>
          <p>Thanks for contacting us. Here's our reply to your message:</p>

          <div style="background-color: #eef; padding: 15px; border-left: 4px solid #2196F3; margin: 20px 0;">
            <p>${replyText}</p>
          </div>

          <p>If you have more questions, feel free to reply to this email.</p>

          <p style="margin-top: 30px;">Best regards,<br><strong>The Expensio Team</strong></p>
          <hr style="margin-top: 40px;">
          <small style="color: #888;">This is a response to your contact form submission.</small>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending reply email:', error);
    return { success: false, error };
  }
};

module.exports = {
  sendContactMail,
  sendAdminReplyMail
};
