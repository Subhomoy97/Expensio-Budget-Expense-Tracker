const reviewModel = require('../model/review.model');

class ReviewRepository {
  async findByUserId(userId, includeDeleted = false) {
    const query = { userId };
    if (!includeDeleted) query.isDeleted = false;
    return await reviewModel.findOne(query);
  }

  async createReview(data) {
    const review = new reviewModel(data);
    return await review.save();
  }

  async updateReviewByUserId(userId, data) {
    return await reviewModel.findOneAndUpdate(
      { userId, isDeleted: false },
      data,
      { new: true, runValidators: true }
    );
  }

  async findAllReviews(includeDeleted = false) {
    const filter = includeDeleted ? {} : { isDeleted: false };
    return await reviewModel.find(filter).sort({ createdAt: -1 });
  }

  async softDeleteById(id, userId) {
    return await reviewModel.findOneAndUpdate(
      { _id: id, userId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
  }

  async restoreById(id, userId) {
    return await reviewModel.findOneAndUpdate(
      { _id: id, userId, isDeleted: true },
      { isDeleted: false },
      { new: true }
    );
  }

  async findReviewByIdAndUserId(id, userId) {
    return await reviewModel.findOne({ _id: id, userId, isDeleted: false });
  }
}

module.exports = new ReviewRepository();
