const { sendContactMail, sendAdminReplyMail } = require("../../../helper/sendContactMail");
const contactRepository = require("../repositories/contact.repositories");
const { contactSchema } = require('../../../validations/contact.validation');

class ContactController {
  async submitContactForm(req, res) {
    try {
      const { error, value } = contactSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map(detail => detail.message);
        return res.status(400).send({ status: 400, data: {}, message: messages });
      }

      const { name, email, subject, message } = value;

      // Save to DB using repository
      await contactRepository.saveContact({ name, email, subject, message });

      // Send email
      const mailResult = await sendContactMail(name, email, subject, message);

      if (!mailResult.success) {
        return res.status(500).json({ message: 'Message saved, but email sending failed.' });
      }

      res.status(201).json({ message: 'Message sent successfully!' });
    } catch (err) {
      console.error('Contact form error:', err);
      res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
  }
  // async replyToContact(req, res) {
  //   try {
  //     const { reply } = req.body;
  //     const contactId = req.params.id;

  //     if (!reply) {
  //       req.flash('error', 'Reply text is required.');
  //       return res.redirect(`/admin/contact/${contactId}`);
  //     }

  //     // Find and update contact
  //     const updatedContact = await contactRepository.saveReply(contactId, reply);
  //     if (!updatedContact) {
  //       req.flash('error', 'Contact message not found.');
  //       return res.redirect(`/admin/contact`);
  //     }

  //     // Send reply email
  //     const mailResult = await sendAdminReplyMail(updatedContact.name, updatedContact.email, updatedContact.subject, reply);
      
  //     if (!mailResult.success) {
  //       req.flash('error', 'Reply saved, but email sending failed.');
  //       return req.redirect(`/admin/contact`);
  //     }
  //     req.flash('success', 'Reply sent successfully!');
  //     return res.redirect(`/admin/contact`);
  //   } catch (err) {
  //     console.error('Reply error:', err);
  //     res.status(500).json({ message: 'Failed to send reply.' });
  //   }
  // }
  async getAllContacts(req, res) {
    try {
      const contacts = await contactRepository.getAllContacts();
      res.status(200).json({ contacts });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async getContactById(req, res) {
    try {
      const contact = await contactRepository.getContactById(req.params.id);
      res.status(200).json({ contact });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new ContactController();
