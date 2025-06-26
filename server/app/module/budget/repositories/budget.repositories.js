const mongoose = require("mongoose");
const Budget = require("../model/budget.model");

class BudgetRepository {
  async setBudget(userId, categoryId, amount, frequency) {
    return Budget.findOneAndUpdate(
      { userId, categoryId },
      { amount, frequency },
      { upsert: true, new: true }
    );
  }

  async getBudgets(userId) {
    return Budget.find({ userId }).populate('categoryId');
  }

  async updateBudget(budgetId, userId, updateData) {
    return Budget.findOneAndUpdate(
      { _id: budgetId, userId },
      updateData,
      { new: true }
    );
  }

  async deleteBudget(budgetId, userId) {
    return Budget.findOneAndDelete({ _id: budgetId, userId });
  }

  async getBudgetDetails(userId) {
    return Budget.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },

      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $addFields: {
          currentDate: {
            $dateAdd: {
              startDate: new Date(),
              unit: "minute",
              amount: 330, // Add 330 minutes (5 hours 30 minutes for IST)
            },
          },
        }
      },

      {
        $addFields: {
          startDate: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$frequency", "weekly"] },
                  then: {
                    $dateFromParts: {
                      isoWeekYear: { $isoWeekYear: "$currentDate" },
                      isoWeek: { $isoWeek: "$currentDate" },
                      isoDayOfWeek: 1,
                    },
                  },
                },
                {
                  case: { $eq: ["$frequency", "monthly"] },
                  then: {
                    $dateFromParts: {
                      year: { $year: "$currentDate" },
                      month: { $month: "$currentDate" },
                      day: 1,
                    },
                  },
                },
                {
                  case: { $eq: ["$frequency", "daily"] },
                  then: {
                    $dateFromParts: {
                      year: { $year: "$currentDate" },
                      month: { $month: "$currentDate" },
                      day: { $dayOfMonth: "$currentDate" },
                    },
                  },
                },
              ],
              default: "$currentDate",
            },
          },
        },
      },

      {
        $addFields: {
          endDate: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$frequency", "weekly"] },
                  then: {
                    $dateAdd: {
                      startDate: "$startDate",
                      unit: "day",
                      amount: 6,
                    },
                  },
                },
                {
                  case: { $eq: ["$frequency", "monthly"] },
                  then: {
                    $dateSubtract: {
                      startDate: {
                        $dateAdd: {
                          startDate: "$startDate",
                          unit: "month",
                          amount: 1,
                        },
                      },
                      unit: "day",
                      amount: 1,
                    },
                  },
                },
                {
                  case: { $eq: ["$frequency", "daily"] },
                  then: "$startDate",
                },
              ],
              default: "$startDate",
            },
          },
        },
      },

      {
        $lookup: {
          from: "expenses",
          let: {
            catId: "$categoryId",
            uid: "$userId",
            start: "$startDate",
            end: "$endDate",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", "$$uid"] },
                    { $eq: ["$categoryId", "$$catId"] },
                    { $gte: ["$date", "$$start"] },
                    { $lte: ["$date", "$$end"] },
                  ],
                },
                isDeleted: { $ne: true },
              },
            },
            {
              $group: {
                _id: null,
                totalSpent: { $sum: "$amount" },
              },
            },
          ],
          as: "expenses",
        },
      },

      {
        $addFields: {
          totalSpent: {
            $ifNull: [{ $arrayElemAt: ["$expenses.totalSpent", 0] }, 0],
          },
          remaining: {
            $subtract: [
              "$amount",
              { $ifNull: [{ $arrayElemAt: ["$expenses.totalSpent", 0] }, 0] },
            ],
          },
          isExceeded: {
            $gt: [
              { $ifNull: [{ $arrayElemAt: ["$expenses.totalSpent", 0] }, 0] },
              "$amount",
            ],
          },
        },
      },
      {
        $sort: {
          startDate: -1,
        },
      },
      {
        $project: {
          _id: 1,
          categoryName: "$category.name",
          categoryId: "$category._id",
          amount: 1,
          frequency: 1,
          totalSpent: 1,
          remaining: 1,
          isExceeded: 1,
        },
      },
    ]);
  }
}

module.exports = new BudgetRepository();
