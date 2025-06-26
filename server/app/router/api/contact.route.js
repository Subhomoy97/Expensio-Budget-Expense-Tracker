const router= require('express').Router();
const contactController= require('../../module/contact/controller/contact.controller');
const authCheck= require('../../middleware/auth.middleware')();

router.post('/submit-contact-form',contactController.submitContactForm)
// router.post('/reply-to-contact/:id',contactController.replyToContact)
router.get('/get-all-contacts',contactController.getAllContacts)
router.get('/get-contact/:id',contactController.getContactById)

module.exports=router