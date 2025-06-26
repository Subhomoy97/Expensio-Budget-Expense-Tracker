const contactModel = require("../../contact/model/contact.model");

class contactRepository {
    async getAllContacts() {
        return await contactModel.find({}).sort({ createdAt: -1 });
    }
    async getUnrepliedContact() {
        return await contactModel.find( {isReplied: false} ).sort({ createdAt: -1 });
    }
    async saveReply(contactId, replyText) {
        return await contactModel.findByIdAndUpdate(
            contactId,
            {
                adminReply: replyText,
                repliedAt: new Date(),
            },
            { new: true }
        );
    }
}

module.exports = new contactRepository();