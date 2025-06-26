const userModel = require("../../user/model/user.model");

class AdminRepository {
  // Find admin user by email
  async findAdminByEmail(email) {
    return userModel.findOne({ email});
  }

  // Fetch all users (for admin dashboard)
  async getAllUsers() {
    return userModel.find({ isAdmin: false });
  }

  // Activate or deactivate a user
  async toggleUserStatus(userId, status) {
    return userModel.findByIdAndUpdate(userId, { status }, { new: true });
  }

  // Delete a user by ID
  async deleteUserById(userId) {
    return userModel.findByIdAndDelete(userId);
  }

  // Count total users
  async countUsers() {
    return userModel.countDocuments({ isAdmin: false });
  }

  // Get admin profile by ID
  async findAdminById(id) {
    return userModel.findOne({ _id: id, isAdmin: true });
  }
}

module.exports = new AdminRepository();
