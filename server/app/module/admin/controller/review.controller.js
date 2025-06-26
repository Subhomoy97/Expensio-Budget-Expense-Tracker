const profileModel = require('../../profile/model/profile.model');
const reviewRepository = require('../repositories/review.repositories');
class ReviewController {
    async reviewPage(req, res) {
        try {
            const user=req.user;
            const profile=await profileModel.findOne({userId:user.userId});
            const reviews = await reviewRepository.findAllReviews(); 
            res.render('admin/review/reviews', { title: 'Reviews', reviews, user, profile, profilePic: profile ? profile.profilePic : null });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async deletedReviewPage(req, res) {
        try {
            const user=req.user;
            const profile=await profileModel.findOne({userId:user.userId});
            const reviews = await reviewRepository.findInvalidReviews(false); 
            res.render('admin/review/deletedReviews', { title: 'Deleted Reviews', reviews, user, profile, profilePic: profile ? profile.profilePic : null });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async getValidReviews(req, res) {
        try {
            const reviews = await reviewRepository.findValidReviews(false); 
            res.status(200).json(reviews);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async restoreReview(req, res) {
        try {
            const review = await reviewRepository.restoreById(req.params.id); 
            if (!review) {
                return res.status(404).json({ message: 'Review not found or not deleted' });
            }
            req.flash('success', 'Review shown successfully');
            return res.redirect('/admin/reviews');
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    async deleteReview(req, res) {
        try {
            const review = await reviewRepository.softDeleteById(req.params.id); 
            console.log(req.params.id,"review");
            if (!review) {
                return res.status(404).json({ message: 'Review not found or already deleted' });
            }
            req.flash('success', 'Review hidden successfully');
            return res.redirect('/admin/reviews');
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new ReviewController();