const settingsRepository = require('../repositories/settings.repositories');

class UserSettingsController {
  async getSettings(req, res) {
    try {
      const settings = await settingsRepository.findByUserId(req.user._id);
      res.status(200).json(settings || {});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateSettings(req, res) {
    try {
      const { currency, dailyLimit, weeklyLimit, monthlyLimit } = req.body;

      const updated = await settingsRepository.updateOrCreateSettings(req.user._id, {
        currency,
        dailyLimit,
        weeklyLimit,
        monthlyLimit
      });

      res.status(200).json({ message: 'Settings updated', settings: updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UserSettingsController();
