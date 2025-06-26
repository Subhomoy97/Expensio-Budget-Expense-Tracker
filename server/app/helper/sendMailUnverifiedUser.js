const userModel = require('../module/user/model/user.model');
const dbConnect = require('../config/db');
const verificationReminder = require('../helper/verificationReminder');

const sendMailUnverifiedUsers = async () => {
  try {
    await dbConnect();

     const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);


    const unverifiedUsers = await userModel.find({
      isVerified: false,
      createdAt: { $lte: twelveHoursAgo }
    });

    for (const user of unverifiedUsers) {

      await verificationReminder(user);

      console.log(`📧 Sent reminder to: ${user.email}`);
    }

  } catch (error) {
    console.error('❌ Error sending reminder emails:', error);
  }
};


module.exports = sendMailUnverifiedUsers;
