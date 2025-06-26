const router= require('express').Router();
const settingsController= require('../../module/settings/controller/settings.controller');
const authCheck= require('../../middleware/auth.middleware')();

router.get('/get-settings',authCheck.authenticateAPI,settingsController.getSettings)
router.post('/update-settings',authCheck.authenticateAPI,settingsController.updateSettings)

module.exports=router