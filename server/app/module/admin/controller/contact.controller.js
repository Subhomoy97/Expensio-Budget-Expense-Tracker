const { sendAdminReplyMail } = require("../../../helper/sendContactMail");
const profileModel = require("../../profile/model/profile.model");
const contactRepository = require("../repositories/contact.repositories");
class ContactController {
  async contactPage(req, res) {
    try {
      const user = req.user;
      const profile = await profileModel.findOne({ userId: user.userId });
      const contacts = await contactRepository.getAllContacts();
      res.render('admin/contactUs/contacts', { contacts, user, profile, profilePic: profile ? profile.profilePic : null });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async getUnrepliedContact(req, res) {
    try {
      const user = req.user;
      const profile = await profileModel.findOne({ userId: user.userId });
      const contact = await contactRepository.getUnrepliedContact();
      res.render('admin/contactUs/contactNotReplied', { contact, user, profile, profilePic: profile ? profile.profilePic : null });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async replyToContact(req, res) {
    try {
      const { reply } = req.body;
      const contactId = req.params.id;

      if (!reply) {
        req.flash('error', 'Reply text is required.');
        return res.redirect(`/admin/contact/${contactId}`);
      }
      // Find and update contact
      const updatedContact = await contactRepository.saveReply(contactId, reply);
      if (!updatedContact) {
        req.flash('error', 'Contact message not found.');
        return res.redirect(`/admin/contact`);
      }
      // Send reply email
      const mailResult = await sendAdminReplyMail(updatedContact.name, updatedContact.email, updatedContact.subject, reply);

      if (!mailResult.success) {
        req.flash('error', 'Reply saved, but email sending failed.');
        return req.redirect(`/admin/contacts`);
      }
      updatedContact.isReplied = true;
      await updatedContact.save();
      req.flash('success', 'Reply sent successfully!');
      return res.redirect(`/admin/contacts`);
    } catch (err) {
      console.error('Reply error:', err);
      res.status(500).json({ message: 'Failed to send reply.' });
    }
  }
}

module.exports = new ContactController();