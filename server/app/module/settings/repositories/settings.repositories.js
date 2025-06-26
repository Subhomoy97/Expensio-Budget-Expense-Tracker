const UserSettings = require('../model/settings.model');

class UserSettingsRepository {
  async findByUserId(userId) {
    return await UserSettings.findOne({ userId });
  }

  async updateOrCreateSettings(userId, data) {
    return await UserSettings.findOneAndUpdate(
      { userId },
      data,
      { new: true, upsert: true }
    );
  }
}

module.exports = new UserSettingsRepository();
