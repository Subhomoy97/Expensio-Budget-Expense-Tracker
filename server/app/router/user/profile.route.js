const router = require("express").Router();
const profileController = require('../../module/profile/controller/profile.controller');
const authCheck = require('../../middleware/auth.middleware')();
const userImageUpload = require("../../helper/profileUpload");
const validate = require('../../middleware/validate.request');
const { createProfileSchema, updateProfileSchema } = require('../../validations/profile.validator');

  
  router.get('/profile',authCheck.authenticateAPI,profileController.showProfile)
// Create Profile Route
router.post(
  "/profile/create",
  authCheck.authenticateAPI,
  userImageUpload.single("profilePic"),
  validate(createProfileSchema),  // 🔥 Validate create request
  profileController.createProfile
);

// Update Profile Route
router.post(
  "/profile/update",
  authCheck.authenticateAPI,
  userImageUpload.single("profilePic"),
  validate(updateProfileSchema),  // 🔥 Validate update request
  profileController.updateProfile
);


module.exports = router;
