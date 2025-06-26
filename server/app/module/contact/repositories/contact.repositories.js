const contactModel = require("../model/contact.model");

class ContactRepository {
  async saveContact(data) {
    const contact = new contactModel(data);
    return await contact.save();
  }

  // async saveReply(contactId, replyText) {
  //   return await contactModel.findByIdAndUpdate(
  //     contactId,
  //     {
  //       adminReply: replyText,
  //       repliedAt: new Date(),
  //     },
  //     { new: true }
  //   );
  // }

  async getAllContacts() {
    return await contactModel.find({}).sort({ createdAt: -1 });
  }
  async getContactById(contactId) {
    return await contactModel.findById(contactId);
  }
}

module.exports = new ContactRepository();
