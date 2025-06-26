const reviewModel = require("../../review/model/review.model");

class reviewRepository{
    async findValidReviews(includeDeleted = false) {
        const filter = includeDeleted ? {} : { isDeleted: false };
        return await reviewModel.find(filter).sort({ createdAt: -1 });
    }
    async findInvalidReviews(includeDeleted = false) {
        const filter = includeDeleted ? {} : { isDeleted: true };
        return await reviewModel.find(filter).sort({ createdAt: -1 });
    }
    async findReviewByIdAndUserId(id, userId) {
        return await reviewModel.findOne({ _id: id, userId, isDeleted: false });
    }
    async restoreById(id) {
        return await reviewModel.findOneAndUpdate(
          { _id: id,isDeleted: true },
          { isDeleted: false },
          { new: true }
        );
      }
      async softDeleteById(id) {
        return await reviewModel.findOneAndUpdate(
          { _id: id, isDeleted: false },
          { isDeleted: true },
          { new: true }
        );
      }
      async findAllReviews(){
        return await reviewModel.find().sort({ createdAt: -1 });
      }
}

module.exports = new reviewRepository();