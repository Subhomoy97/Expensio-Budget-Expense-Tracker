const router= require('express').Router();
const contactController= require('../../module/admin/controller/contact.controller');
const AdminCheck = require('../../middleware/adminCheck.middleware');

router.get('/contacts',AdminCheck,contactController.contactPage)
router.get('/contacts-not-replied',AdminCheck,contactController.getUnrepliedContact)
router.put('/reply-to-contact/:id',AdminCheck,contactController.replyToContact)

module.exports=router