const router= require('express').Router();
const userImageUpload = require('../../helper/profileUpload');
const AdminCheck = require('../../middleware/adminCheck.middleware');
const adminController= require('../../module/admin/controller/admin.controller');

router.get('/login',adminController.loginPage)
router.post('/login',adminController.login)
router.get('/dashboard',AdminCheck,adminController.showDashboard)
router.get('/profile',AdminCheck,adminController.getProfile)
router.post('/update-profile',AdminCheck,userImageUpload.single("profilePic"),adminController.updateProfile)
router.post('/logout',adminController.logout)

module.exports=router