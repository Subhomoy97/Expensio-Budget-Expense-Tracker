const reviewRepository = require('../repositories/review.repositories');

class ReviewController {
  async addReview(req, res) {
    try {
      const { rating, comment } = req.body;

      if (!rating || !comment) {
        return res.status(400).json({ message: 'Rating and comment are required.' });
      }

      const existingReview = await reviewRepository.findByUserId(req.user._id, false);
      if (existingReview) {
        return res.status(400).json({ message: 'You have already submitted a review.', review: existingReview });
      }

      const review = await reviewRepository.createReview({
        userId: req.user._id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        rating,
        comment,
      });

      res.status(201).json({ message: 'Review submitted successfully', review });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateReview(req, res) {
    try {
      const { rating, comment } = req.body;

      const updated = await reviewRepository.updateReviewByUserId(req.user._id, {
        rating,
        comment,
      });

      if (!updated) {
        return res.status(404).json({ message: 'You have not submitted a review yet.' });
      }

      res.status(200).json({ message: 'Review updated successfully.', review: updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserReview(req, res) {
    try {
      const review = await reviewRepository.findByUserId(req.user._id, false); // only non-deleted
      if (!review) {
        return res.status(404).json({ message: 'No review found for this user' });
      }

      res.status(200).json(review);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getAllReviews(req, res) {
    try {
      const reviews = await reviewRepository.findAllReviews(false); // only non-deleted
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteReview(req, res) {
    try {
      const review = await reviewRepository.softDeleteById(req.params.id, req.user._id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found or already deleted' });
      }

      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async restoreReview(req, res) {
    try {
      const review = await reviewRepository.restoreById(req.params.id, req.user._id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found or not deleted' });
      }

      res.status(200).json({ message: 'Review restored successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new ReviewController();
