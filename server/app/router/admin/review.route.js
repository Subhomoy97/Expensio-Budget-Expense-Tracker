const router= require('express').Router();
const reviewController = require('../../module/admin/controller/review.controller');
const AdminCheck = require('../../middleware/adminCheck.middleware');

router.get('/reviews',AdminCheck,reviewController.reviewPage)
router.get('/deleted-reviews',AdminCheck,reviewController.deletedReviewPage)
router.get('/valid-reviews',AdminCheck,reviewController.getValidReviews)
router.put('/restore-review/:id',AdminCheck,reviewController.restoreReview)
router.put('/delete-review/:id',AdminCheck,reviewController.deleteReview)

module.exports=router