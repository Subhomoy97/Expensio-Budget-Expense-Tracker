const router= require('express').Router();
const reviewController = require('../../module/review/controller/review.controller');
const authCheck= require('../../middleware/auth.middleware')();

router.post('/add-review',authCheck.authenticateAPI,reviewController.addReview)
router.put('/update-review',authCheck.authenticateAPI,reviewController.updateReview)
router.get('/get-user-review',authCheck.authenticateAPI,reviewController.getUserReview)
router.get('/get-reviews',reviewController.getAllReviews)
router.delete('/delete-review/:id',authCheck.authenticateAPI,reviewController.deleteReview)
router.put('/restore-review/:id',authCheck.authenticateAPI,reviewController.restoreReview)

module.exports=router