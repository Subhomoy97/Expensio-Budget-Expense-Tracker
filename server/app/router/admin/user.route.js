const router= require('express').Router();
const userController= require('../../module/admin/controller/user.controller');
const AdminCheck = require('../../middleware/adminCheck.middleware');

router.get('/users',AdminCheck,userController.userPage)
router.get('/user/:id',AdminCheck,userController.userDetailsPage)
router.get('/deactivated-users',AdminCheck,userController.DeactivatedUsers)
router.put('/delete-user/:id',AdminCheck,userController.userDelete)
router.put('/restore-user/:id',AdminCheck,userController.userRestore)

module.exports=router